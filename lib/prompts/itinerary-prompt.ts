// lib/prompts/itinerary-prompt.ts

export interface ItineraryPromptParams {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  interests: string[];
  travelStyle: string;
  weatherData?: string;
  placesData?: string;
  eventsData?: string;
}

export function buildItineraryPrompt(params: ItineraryPromptParams): string {
  const {
    destination,
    startDate,
    endDate,
    budget,
    interests,
    travelStyle,
    weatherData,
    placesData,
    eventsData,
  } = params;

  const systemPrompt = `You are an elite AI travel concierge with encyclopedic knowledge of global destinations, local culture, hidden gems, and travel logistics. You create hyper-personalized travel itineraries that feel crafted by a knowledgeable local friend who has lived in the destination for years.

Your itineraries are:
- Deeply personalized to the traveler's interests and style
- Realistic in timing and logistics
- A perfect mix of iconic spots and local secrets
- Sensitive to budget constraints
- Rich with insider tips that guidebooks don't have

You MUST respond with ONLY valid JSON — no preamble, no markdown, no explanation. Just pure JSON.`;

  const userPrompt = `Create a comprehensive travel itinerary for:

DESTINATION: ${destination}
DATES: ${startDate} to ${endDate}
BUDGET: ${budget}
INTERESTS: ${interests.join(", ")}
TRAVEL STYLE: ${travelStyle}

${weatherData ? `WEATHER DATA:\n${weatherData}\n` : ""}
${placesData ? `NOTABLE PLACES:\n${placesData}\n` : ""}
${eventsData ? `LOCAL EVENTS:\n${eventsData}\n` : ""}

Generate a rich, detailed itinerary. Return ONLY this JSON structure with NO additional text:

{
  "destination": "Full destination name with country",
  "summary": "2-3 sentence compelling overview of the trip experience",
  "heroImage": "Descriptive alt text for the destination hero image",
  "weather": {
    "overview": "Brief weather summary for the trip dates",
    "temperature": "Expected temperature range",
    "recommendation": "What to pack/wear"
  },
  "dailyPlan": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "title": "Engaging day title",
      "theme": "morning adventure / cultural immersion / etc",
      "morning": {
        "time": "8:00 AM",
        "activity": "Activity name",
        "description": "Detailed description with insider tips",
        "location": "Specific location/address",
        "duration": "2 hours",
        "cost": "$15",
        "tips": "Insider tip about this activity"
      },
      "afternoon": {
        "time": "1:00 PM",
        "activity": "Activity name",
        "description": "Detailed description",
        "location": "Specific location",
        "duration": "3 hours",
        "cost": "$25",
        "tips": "Pro tip"
      },
      "evening": {
        "time": "7:00 PM",
        "activity": "Activity name",
        "description": "Detailed description",
        "location": "Specific location",
        "duration": "2 hours",
        "cost": "$40",
        "tips": "Evening tip"
      },
      "dining": {
        "breakfast": { "name": "Restaurant name", "cuisine": "Type", "priceRange": "$", "mustTry": "Dish name", "address": "Location" },
        "lunch": { "name": "Restaurant name", "cuisine": "Type", "priceRange": "$$", "mustTry": "Dish name", "address": "Location" },
        "dinner": { "name": "Restaurant name", "cuisine": "Type", "priceRange": "$$$", "mustTry": "Dish name", "address": "Location" }
      },
      "nightlife": {
        "venue": "Venue name",
        "type": "rooftop bar / jazz club / beach club / etc",
        "vibe": "Description of atmosphere",
        "address": "Location",
        "bestTime": "10 PM - 2 AM",
        "cost": "$20 cover"
      }
    }
  ],
  "events": [
    {
      "name": "Event name",
      "date": "Date/time",
      "venue": "Venue name",
      "description": "What makes this event special",
      "ticketPrice": "$30",
      "category": "music / sports / cultural / food",
      "bookingUrl": "https://example.com"
    }
  ],
  "hiddenGems": [
    {
      "name": "Hidden gem name",
      "category": "viewpoint / cafe / neighborhood / market / etc",
      "description": "Why this is special and how to find it",
      "location": "Specific location",
      "bestTime": "When to visit",
      "localSecret": "The insider tip most tourists miss"
    }
  ],
  "restaurants": [
    {
      "name": "Restaurant name",
      "cuisine": "Cuisine type",
      "priceRange": "$ to $$$$",
      "mustTry": "Signature dish",
      "vibe": "Atmosphere description",
      "address": "Location",
      "reservationNeeded": true,
      "localFavorite": true
    }
  ],
  "travelTips": [
    {
      "category": "transport / safety / culture / money / communication",
      "tip": "Specific actionable tip",
      "importance": "high / medium / low"
    }
  ],
  "budgetBreakdown": {
    "accommodation": { "estimated": "$120/night", "recommendation": "Specific hotel/area recommendation", "total": "$480" },
    "food": { "estimated": "$60/day", "breakdown": "Breakfast $10, Lunch $20, Dinner $30", "total": "$240" },
    "activities": { "estimated": "$40/day", "notes": "Museum passes save money", "total": "$160" },
    "transport": { "estimated": "$20/day", "tips": "Metro pass recommended", "total": "$80" },
    "nightlife": { "estimated": "$50/night", "notes": "3 nights planned", "total": "$150" },
    "shopping": { "estimated": "$100 total", "notes": "Budget for souvenirs" },
    "totalEstimate": "$1,110 - $1,400",
    "currency": "USD",
    "moneyTips": "Tip about local payment methods"
  },
  "essentials": {
    "visa": "Visa requirements",
    "currency": "Local currency and exchange tips",
    "language": "Local language and useful phrases",
    "emergency": "Emergency numbers",
    "bestTransport": "How to get around"
  }
}`;

  return JSON.stringify({ system: systemPrompt, user: userPrompt });
}

export function buildChatPrompt(
  tripContext: string,
  conversationHistory: { role: string; content: string }[]
): { system: string; messages: { role: string; content: string }[] } {
  const system = `You are a knowledgeable local travel concierge for this specific trip. You have deep knowledge of the destination and the traveler's preferences. Be conversational, helpful, and specific. Give actionable recommendations with real names, addresses, and insider tips.

TRIP CONTEXT:
${tripContext}

Keep responses concise but rich with detail. Use bullet points for lists. Always be specific — never vague.`;

  return {
    system,
    messages: conversationHistory,
  };
}
