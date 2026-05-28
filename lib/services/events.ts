// lib/services/events.ts

export interface Event {
  name: string;
  date: string;
  venue: string;
  url: string;
  priceMin?: number;
  priceMax?: number;
}

export async function fetchLocalEvents(
  destination: string,
  startDate: string,
  endDate: string
): Promise<string> {
  const apiKey = process.env.TICKETMASTER_API_KEY;

  if (!apiKey) {
    return `Various events and festivals happening in ${destination} during your visit.`;
  }

  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?city=${encodeURIComponent(destination)}&startDateTime=${startDate}T00:00:00Z&endDateTime=${endDate}T23:59:59Z&size=5&apikey=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data._embedded?.events?.length) {
      return `Check local event listings for ${destination} during your stay.`;
    }

    const events: Event[] = data._embedded.events.map((e: any) => ({
      name: e.name,
      date: e.dates?.start?.localDate || "TBD",
      venue: e._embedded?.venues?.[0]?.name || "Venue TBD",
      url: e.url,
      priceMin: e.priceRanges?.[0]?.min,
      priceMax: e.priceRanges?.[0]?.max,
    }));

    return events
      .map(
        (e) =>
          `- ${e.name} | ${e.date} | ${e.venue}${e.priceMin ? ` | $${e.priceMin}-$${e.priceMax}` : ""}`
      )
      .join("\n");
  } catch (error) {
    console.error("Ticketmaster API error:", error);
    return `Local events and experiences await in ${destination}.`;
  }
}
