import { NextRequest, NextResponse } from 'next/server'
import { searchTracks } from '@/lib/spotify'

export interface MediaItem {
  id: string
  type: 'music' | 'movie'
  title: string
  subtitle: string
  coverUrl: string | null
  genres: string[]
  description: string
  year: string
}

const MOCK_MUSIC: MediaItem[] = [
  { id: 'm1', type: 'music', title: 'Clair de Lune', subtitle: 'Claude Debussy', coverUrl: 'https://picsum.photos/seed/debussy/400/400', genres: ['Classical'], description: 'Suite bergamasque', year: '' },
  { id: 'm2', type: 'music', title: 'Bohemian Rhapsody', subtitle: 'Queen', coverUrl: 'https://picsum.photos/seed/queen/400/400', genres: ['Rock', 'Classic Rock'], description: 'A Night at the Opera', year: '' },
  { id: 'm3', type: 'music', title: 'Shape of You', subtitle: 'Ed Sheeran', coverUrl: 'https://picsum.photos/seed/sheeran/400/400', genres: ['Pop'], description: '÷ (Divide)', year: '' },
  { id: 'm4', type: 'music', title: 'Blinding Lights', subtitle: 'The Weeknd', coverUrl: 'https://picsum.photos/seed/weeknd/400/400', genres: ['Synth-pop'], description: 'After Hours', year: '' },
  { id: 'm5', type: 'music', title: 'Hotel California', subtitle: 'Eagles', coverUrl: 'https://picsum.photos/seed/eagles/400/400', genres: ['Rock'], description: 'Hotel California', year: '' },
  { id: 'm6', type: 'music', title: 'Stairway to Heaven', subtitle: 'Led Zeppelin', coverUrl: 'https://picsum.photos/seed/zeppelin/400/400', genres: ['Hard Rock'], description: 'Led Zeppelin IV', year: '' },
]

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')

  if (!q) {
    return NextResponse.json({ error: 'Missing q' }, { status: 400 })
  }

  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    const lower = q.toLowerCase()
    const items = MOCK_MUSIC.filter(
      item => item.title.toLowerCase().includes(lower) || item.subtitle.toLowerCase().includes(lower)
    )
    return NextResponse.json({ items: items.length > 0 ? items : MOCK_MUSIC, source: 'mock' })
  }

  try {
    const tracks = await searchTracks(q)
    const items: MediaItem[] = tracks.map(track => ({
      id: track.id,
      type: 'music',
      title: track.name,
      subtitle: track.artists[0]?.name ?? '',
      coverUrl: track.album.images[0]?.url ?? null,
      genres: [],
      description: track.album.name,
      year: '',
    }))
    return NextResponse.json({ items })
  } catch {
    const lower = q.toLowerCase()
    const items = MOCK_MUSIC.filter(
      item => item.title.toLowerCase().includes(lower) || item.subtitle.toLowerCase().includes(lower)
    )
    return NextResponse.json({ items: items.length > 0 ? items : MOCK_MUSIC, source: 'mock' })
  }
}
