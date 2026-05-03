'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/NavBar'
import type { MediaItem } from '@/app/api/search/route'

const MOOD_CHIPS = ['All Music', 'Serenity', 'Energy', 'Melancholy', 'Focus', 'Adventure']

const FEATURED_PLAYLISTS = [
  {
    id: 'fp1',
    mood: 'Serene Forest',
    title: 'Morning Meditation',
    description: 'Let soft ambient sounds and acoustic guitar accompany your new journey.',
    image: 'https://picsum.photos/seed/forest-dawn/600/400',
  },
  {
    id: 'fp2',
    mood: 'Urban Rhythm',
    title: 'Late Night Electronica',
    description: 'Deep bass and synthesizer melodies, perfect for navigating through city neon.',
    image: 'https://picsum.photos/seed/neon-city/600/400',
  },
  {
    id: 'fp3',
    mood: 'Nostalgic Echoes',
    title: 'Classic Vinyl Session',
    description: 'A collection of 70s soul, revisiting those warm and authentic musical moments.',
    image: 'https://picsum.photos/seed/vinyl-record/600/400',
  },
]

const p = (seed: string) => `https://picsum.photos/seed/${seed}/400/400`

const FEATURED_ITEMS: MediaItem[] = [
  { id: 'm1', type: 'music', title: 'Clair de Lune', subtitle: 'Claude Debussy', coverUrl: p('debussy'), genres: ['Classical'], description: 'Suite bergamasque', year: '' },
  { id: 'm2', type: 'music', title: 'Bohemian Rhapsody', subtitle: 'Queen', coverUrl: p('queen'), genres: ['Rock', 'Classic Rock'], description: 'A Night at the Opera', year: '' },
  { id: 'm3', type: 'music', title: 'Shape of You', subtitle: 'Ed Sheeran', coverUrl: p('sheeran'), genres: ['Pop'], description: '÷ (Divide)', year: '' },
  { id: 'm4', type: 'music', title: 'Blinding Lights', subtitle: 'The Weeknd', coverUrl: p('weeknd'), genres: ['Synth-pop'], description: 'After Hours', year: '' },
  { id: 'm5', type: 'music', title: 'Hotel California', subtitle: 'Eagles', coverUrl: p('eagles'), genres: ['Rock'], description: 'Hotel California', year: '' },
  { id: 'm6', type: 'music', title: 'Stairway to Heaven', subtitle: 'Led Zeppelin', coverUrl: p('zeppelin'), genres: ['Hard Rock'], description: 'Led Zeppelin IV', year: '' },
]

export default function Home() {
  const router = useRouter()
  const [activeChip, setActiveChip] = useState('All Music')
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<MediaItem[]>([])
  const [searched, setSearched] = useState(false)
  const [selected, setSelected] = useState<MediaItem | null>(null)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  function toggleSelect(item: MediaItem) {
    setSelected(prev => prev?.id === item.id ? null : item)
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!keyword.trim()) return
    setSearching(true)
    setError(null)
    setSelected(null)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(keyword)}&type=music`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Search failed')
      setResults(data.items)
      setSearched(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Search failed')
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  function handleProceed() {
    if (!selected) return
    localStorage.setItem('moodtravel_media', JSON.stringify(selected))
    router.push('/mood')
  }

  const displayItems = searched ? results : FEATURED_ITEMS

  return (
    <>
      {/* Background blobs */}
      <div className="bg-blob bg-[#1DB954] w-[400px] h-[400px] -top-20 -left-20" />
      <div className="bg-blob bg-[#53e076] w-[300px] h-[300px] top-1/2 -right-20" />
      <div className="bg-blob bg-[#e2e2e7] w-[500px] h-[500px] -bottom-40 left-1/4" />

      <NavBar />

      <main className="pt-24 px-6 max-w-7xl mx-auto pb-16">
        {/* Hero search */}
        <section className="mb-10">
          <h1 className="text-[32px] font-bold leading-tight text-[#1c1b1b] mb-6">
            Explore Your Emotional Melody
          </h1>
          <form onSubmit={handleSearch} className="relative max-w-3xl">
            <div className="neo-glass rounded-full flex items-center px-6 py-4 shadow-2xl shadow-[#1DB954]/5">
              <span className="material-symbols-outlined text-gray-400 mr-4">search</span>
              <input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                className="bg-transparent border-none focus:outline-none w-full text-[18px] font-medium placeholder-gray-400"
                placeholder="Search Spotify songs, artists or moods..."
              />
              {searching && (
                <span className="material-symbols-outlined text-[#1DB954] animate-spin">progress_activity</span>
              )}
            </div>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </section>

        {/* Mood chips */}
        <section className="mb-10 overflow-x-auto no-scrollbar flex gap-3 pb-2">
          {MOOD_CHIPS.map(chip => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={`px-6 py-2 rounded-full font-semibold text-[13px] tracking-wide whitespace-nowrap transition-colors ${
                activeChip === chip
                  ? 'bg-[#1DB954] text-white shadow-lg shadow-[#1DB954]/20'
                  : 'neo-glass text-[#3d4a3d] hover:bg-white/60'
              }`}
            >
              {chip}
            </button>
          ))}
        </section>

        {/* Featured playlists (only when not searched) */}
        {!searched && (
          <section className="mb-10">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-semibold text-[#1c1b1b]">Recommended Mood Playlists</h2>
              <a href="#" className="text-[#1DB954] text-[13px] font-semibold flex items-center gap-1">
                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURED_PLAYLISTS.map(pl => (
                <div
                  key={pl.id}
                  className="neo-glass rounded-2xl overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={pl.image}
                      alt={pl.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <span
                        className="material-symbols-outlined text-white text-4xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_circle
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-[#1DB954] text-[13px] font-semibold mb-2">{pl.mood}</div>
                    <h3 className="text-xl font-semibold mb-2">{pl.title}</h3>
                    <p className="text-[#5d5e63] text-[16px] line-clamp-2">{pl.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured tracks / search results — selectable grid */}
        <section className="mb-10">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-semibold text-[#1c1b1b]">
              {searched ? 'Search Results' : 'Featured Tracks & Films'}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displayItems.map(item => (
              <button
                key={item.id}
                onClick={() => toggleSelect(item)}
                className={`neo-glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 text-left ${
                  selected?.id === item.id
                    ? 'ring-2 ring-[#1DB954] scale-[1.02]'
                    : 'hover:scale-[1.02]'
                }`}
              >
                <div className="relative aspect-square">
                  {item.coverUrl ? (
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/30 flex items-center justify-center text-3xl">
                      {item.type === 'music' ? '🎵' : '🎬'}
                    </div>
                  )}
                  {selected?.id === item.id && (
                    <div className="absolute inset-0 bg-[#1DB954]/20 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-white text-3xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm truncate text-[#1c1b1b]">{item.title}</p>
                  <p className="text-[#5d5e63] text-xs truncate">{item.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

      </main>

      {/* Fixed CTA when item selected */}
      {selected && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={handleProceed}
            className="flex items-center gap-3 bg-[#1DB954] hover:bg-[#19a34a] text-white font-bold px-8 py-4 rounded-full shadow-2xl shadow-[#1DB954]/40 transition-all text-base active:scale-95"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_fix_high
            </span>
            Plan trip for &ldquo;{selected.title}&rdquo;
          </button>
        </div>
      )}
    </>
  )
}
