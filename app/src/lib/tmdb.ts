export interface TmdbMovie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  genre_ids: number[]
  overview: string
}

const GENRE_MAP: Record<number, string> = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
  10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
}

export function getGenreNames(ids: number[]): string[] {
  return ids.map(id => GENRE_MAP[id] ?? 'Unknown').filter(Boolean)
}

export async function searchMovies(keyword: string): Promise<TmdbMovie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(keyword)}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: 'application/json',
      },
      next: { revalidate: 300 },
    }
  )

  if (!res.ok) throw new Error('TMDB search failed')

  const data = await res.json()
  return (data.results as TmdbMovie[]).slice(0, 12)
}

export function getPosterUrl(poster_path: string | null): string | null {
  if (!poster_path) return null
  return `https://image.tmdb.org/t/p/w500${poster_path}`
}
