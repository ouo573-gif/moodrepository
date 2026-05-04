import { GoogleGenerativeAI } from '@google/generative-ai'
import type { MediaItem } from '@/app/api/search/route'

export interface Activity {
  time: string
  place: string
  description: string
}

export interface ItineraryDay {
  day: number
  title: string
  activities: Activity[]
}

export interface Itinerary {
  destination: string
  country: string
  duration: { days: number; nights: number }
  mood: string
  days: ItineraryDay[]
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

function buildPrompt(media: MediaItem, destination: string, days: number): string {
  const mediaType = media.type === 'music' ? 'song' : 'movie'
  const genreStr = media.genres.length > 0 ? media.genres.join(', ') : 'unknown'
  const desc = media.description ? `\nDescription/Album: ${media.description}` : ''

  return `You are a travel planner who designs trips based on the emotional atmosphere of music and movies.

A user has selected this ${mediaType}:
- Title: ${media.title}
- Artist/Creator: ${media.subtitle}
- Genres: ${genreStr}${desc}

Destination: ${destination}
Number of days: ${days}

Based on the mood, atmosphere, and emotional essence of this ${mediaType}, design a travel itinerary for ${destination} lasting exactly ${days} days.

Rules:
1. Use the specified destination city exactly as provided
2. Generate exactly ${days} day entries — no more, no less
3. For each day, provide 3 activities: morning, afternoon, evening
4. The mood field should describe the emotional atmosphere in 5-10 words
5. Return ONLY valid JSON with no markdown, no explanation, no code fences

Required JSON schema:
{
  "destination": "city name",
  "country": "country name",
  "duration": { "days": ${days}, "nights": ${days - 1} },
  "mood": "brief mood description",
  "days": [
    {
      "day": 1,
      "title": "day theme title",
      "activities": [
        { "time": "Morning", "place": "place name", "description": "what to do" },
        { "time": "Afternoon", "place": "place name", "description": "what to do" },
        { "time": "Evening", "place": "place name", "description": "what to do" }
      ]
    }
  ]
}`
}

export async function generateItinerary(media: MediaItem, destination: string, days: number): Promise<Itinerary> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2-flash' })
  const result = await model.generateContent(buildPrompt(media, destination, days))
  const text = result.response.text()

  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('AI response did not contain valid JSON')

  const itinerary = JSON.parse(jsonMatch[0]) as Itinerary
  return itinerary
}
