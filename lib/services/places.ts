// lib/services/places.ts

export interface Place {
  name: string;
  rating: number;
  address: string;
  types: string[];
  photoReference?: string;
}

export async function fetchNearbyPlaces(destination: string): Promise<string> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return `Notable places in ${destination} include local landmarks, restaurants, and cultural sites.`;
  }

  try {
    // First, geocode the destination to get coordinates
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${apiKey}`;
    const geoRes = await fetch(geocodeUrl);
    const geoData = await geoRes.json();

    if (geoData.status !== "OK" || !geoData.results.length) {
      return `Notable travel destination: ${destination}`;
    }

    const { lat, lng } = geoData.results[0].geometry.location;

    // Fetch nearby tourist attractions
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=tourist_attraction&key=${apiKey}`;
    const placesRes = await fetch(placesUrl);
    const placesData = await placesRes.json();

    if (placesData.status !== "OK") {
      return `Top destination: ${destination}`;
    }

    const places: Place[] = placesData.results.slice(0, 10).map((p: any) => ({
      name: p.name,
      rating: p.rating || 0,
      address: p.vicinity || "",
      types: p.types || [],
    }));

    return places
      .map(
        (p) =>
          `- ${p.name} (Rating: ${p.rating}/5) - ${p.address} [${p.types.slice(0, 2).join(", ")}]`
      )
      .join("\n");
  } catch (error) {
    console.error("Places API error:", error);
    return `Exploring ${destination} - rich with culture, history, and local experiences.`;
  }
}
