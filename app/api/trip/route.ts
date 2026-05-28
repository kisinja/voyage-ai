// app/api/trip/route.ts

import { NextRequest, NextResponse } from "next/server";
import { groqChat } from "@/lib/ai/groq";
import { buildItineraryPrompt } from "@/lib/prompts/itinerary-prompt";
import { fetchNearbyPlaces } from "@/lib/services/places";
import { fetchLocalEvents } from "@/lib/services/events";
import { fetchWeatherForecast } from "@/lib/services/weather";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { destination, startDate, endDate, budget, interests, travelStyle } =
      body;

    // Validate required fields
    if (!destination || !startDate || !endDate || !budget || !travelStyle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch external data in parallel
    const [weatherData, placesData, eventsData] = await Promise.allSettled([
      fetchWeatherForecast(destination, startDate),
      fetchNearbyPlaces(destination),
      fetchLocalEvents(destination, startDate, endDate),
    ]);

    const promptData = buildItineraryPrompt({
      destination,
      startDate,
      endDate,
      budget,
      interests: interests || [],
      travelStyle,
      weatherData:
        weatherData.status === "fulfilled" ? weatherData.value : undefined,
      placesData:
        placesData.status === "fulfilled" ? placesData.value : undefined,
      eventsData:
        eventsData.status === "fulfilled" ? eventsData.value : undefined,
    });

    const parsed = JSON.parse(promptData);

    // Call Groq AI
    const rawResponse = await groqChat(
      [
        { role: "system", content: parsed.system },
        { role: "user", content: parsed.user },
      ],
      { temperature: 0.7, max_tokens: 4096 }
    );

    console.log(rawResponse);

    // Parse the JSON response
    let itinerary;
    try {
      // Clean up the response in case of any markdown
      const cleaned = rawResponse
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      itinerary = JSON.parse(cleaned);
    } catch {
      // If parsing fails, return the raw response with an error flag
      return NextResponse.json(
        {
          error: "Failed to parse AI response",
          raw: rawResponse,
        },
        { status: 422 }
      );
    }

    // Save to database
    let savedTrip;
    try {
      savedTrip = await prisma.trip.create({
        data: {
          destination,
          startDate,
          endDate,
          budget,
          interests: interests || [],
          travelStyle,
          itinerary,
        },
      });
    } catch (dbError) {
      // DB save failure shouldn't block the response
      console.error("DB save error:", dbError);
    }

    return NextResponse.json({
      success: true,
      itinerary,
      tripId: savedTrip?.id,
      shareToken: savedTrip?.shareToken,
    });
  } catch (error) {
    console.error("Trip generation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shareToken = searchParams.get("share");
  const tripId = searchParams.get("id");

  try {
    if (shareToken) {
      const trip = await prisma.trip.findUnique({ where: { shareToken } });
      if (!trip) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
      }
      return NextResponse.json({ trip });
    }

    if (tripId) {
      const trip = await prisma.trip.findUnique({ where: { id: tripId } });
      if (!trip) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
      }
      return NextResponse.json({ trip });
    }

    // Get recent trips
    const trips = await prisma.trip.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        destination: true,
        startDate: true,
        endDate: true,
        budget: true,
        travelStyle: true,
        createdAt: true,
        shareToken: true,
      },
    });

    return NextResponse.json({ trips });
  } catch (error) {
    console.error("Trip fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 }
    );
  }
}
