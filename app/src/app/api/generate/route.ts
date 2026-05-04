import { NextRequest, NextResponse } from 'next/server'
import type { MediaItem } from '@/app/api/search/route'
import { generateItinerary, type Itinerary } from '@/lib/claude'

const MOCK_ITINERARY: Itinerary = {
  destination: 'Kyoto',
  country: 'Japan',
  duration: { days: 3, nights: 2 },
  mood: 'Tranquil, nostalgic, and gently melancholic',
  days: [
    {
      day: 1,
      title: 'Arrival & Stillness',
      activities: [
        { time: 'Morning', place: 'Arashiyama Bamboo Grove', description: 'Walk through the towering bamboo in the quiet morning light' },
        { time: 'Afternoon', place: 'Tenryu-ji Temple', description: 'Sit by the koi pond and reflect in the Zen garden' },
        { time: 'Evening', place: 'Pontocho Alley', description: 'Wander the narrow lantern-lit alley and have a quiet dinner' },
      ],
    },
    {
      day: 2,
      title: 'Time & Memory',
      activities: [
        { time: 'Morning', place: 'Fushimi Inari Shrine', description: 'Hike through thousands of torii gates as the mist clears' },
        { time: 'Afternoon', place: 'Nishiki Market', description: 'Sample local flavors and browse the centuries-old food stalls' },
        { time: 'Evening', place: 'Gion District', description: 'Stroll through preserved machiya townhouses and spot geiko' },
      ],
    },
    {
      day: 3,
      title: 'Letting Go',
      activities: [
        { time: 'Morning', place: "Philosopher's Path", description: 'Walk the canal path lined with cherry trees in quiet contemplation' },
        { time: 'Afternoon', place: 'Nanzen-ji Temple', description: 'Explore the aqueduct and sub-temples before departure' },
        { time: 'Evening', place: 'Kyoto Station', description: 'One last matcha soft serve before boarding the Shinkansen' },
      ],
    },
  ],
}

export async function POST(req: NextRequest) {
  try {
    const { media, destination, days } = (await req.json()) as {
      media: MediaItem
      destination: string
      days: number
    }

    if (!media?.title) {
      return NextResponse.json({ error: 'Missing media data' }, { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ itinerary: MOCK_ITINERARY, source: 'mock' })
    }

    const itinerary = await generateItinerary(
      media,
      destination ?? 'Tokyo',
      typeof days === 'number' && days > 0 ? days : 3
    )
    return NextResponse.json({ itinerary })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Gemini error:', msg)
    return NextResponse.json({ itinerary: MOCK_ITINERARY, source: 'mock', error: msg })
  }
}
