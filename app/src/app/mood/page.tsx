'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/NavBar'
import type { MediaItem } from '@/app/api/search/route'

const GENRE_MOOD_MAP: Record<string, { label: string; icon: string }> = {
  Classical: { label: 'Dreamy Blue', icon: 'cloud' },
  Rock: { label: 'Energetic Dawn', icon: 'wb_sunny' },
  'Classic Rock': { label: 'Energetic Dawn', icon: 'wb_sunny' },
  Pop: { label: 'Free-Spirited', icon: 'air' },
  Drama: { label: 'Midnight Wanderer', icon: 'auto_awesome' },
  Romance: { label: 'Tender Glow', icon: 'favorite' },
  Animation: { label: 'Wonder & Whimsy', icon: 'toys' },
  Fantasy: { label: 'Dreamscapes', icon: 'bubble_chart' },
  Comedy: { label: 'Bright Spark', icon: 'wb_incandescent' },
}

const DEFAULT_MOOD = { label: 'Soul Journey', icon: 'explore' }

export default function MoodPage() {
  const router = useRouter()
  const [media, setMedia] = useState<MediaItem | null>(null)
  const [destination, setDestination] = useState('Tokyo, Japan')
  const [days, setDays] = useState(5)
  const [travelers, setTravelers] = useState(2)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem('moodtravel_media')
    if (!raw) { router.push('/'); return }
    setMedia(JSON.parse(raw) as MediaItem)
  }, [router])

  const moodTags = media
    ? [...new Map(
        media.genres
          .map(g => GENRE_MOOD_MAP[g] ?? DEFAULT_MOOD)
          .map(m => [m.label, m])
      ).values()].slice(0, 4)
    : [DEFAULT_MOOD]

  async function handleGenerate() {
    if (!media) return
    setGenerating(true)
    setError(null)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ media, destination, days, travelers }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Generation failed')
      localStorage.setItem('moodtravel_itinerary', JSON.stringify(data.itinerary))
      router.push('/result')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Generation failed')
      setGenerating(false)
    }
  }

  if (!media) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[-1]"
        style={{ background: 'radial-gradient(circle at top right, #e8f5e9, #fcf9f8)' }}
      />

      <NavBar />

      <main className="pt-24 px-5 max-w-2xl mx-auto space-y-6 pb-40">
        {/* Header */}
        <header className="text-center space-y-1 pt-4">
          <h1 className="text-[32px] font-bold text-[#1c1b1b]">Analysis Complete</h1>
          <p className="text-[#5d5f5f] text-[16px]">
            Based on your melody, we&apos;ve captured these inspirations
          </p>
        </header>

        {/* Selected media card */}
        <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden shadow-lg">
            {media.coverUrl ? (
              <img src={media.coverUrl} alt={media.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-white/30 flex items-center justify-center text-2xl">
                {media.type === 'music' ? '🎵' : '🎬'}
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
              <span
                className="material-symbols-outlined text-white text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_circle
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[18px] font-bold text-[#1c1b1b] truncate">{media.title}</h3>
            <p className="text-[13px] text-[#5d5f5f]">{media.subtitle}</p>
            <div className="mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[#1DB954] text-sm">graphic_eq</span>
              <span className="text-[13px] text-[#1DB954]">
                Mood: {media.genres.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* AI Mood Tags */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold px-1">AI-Extracted Mood Tags</h2>
          <div className="flex flex-wrap gap-3">
            {moodTags.map(tag => (
              <div
                key={tag.label}
                className="glass-panel px-6 py-3 rounded-full flex items-center gap-2 shadow-sm hover:scale-105 transition-transform cursor-default"
              >
                <span className="material-symbols-outlined text-[#1DB954]">{tag.icon}</span>
                <span className="text-[13px] font-semibold text-[#1c1b1b]">{tag.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Travel parameters */}
        <section className="grid grid-cols-2 gap-4">
          {/* Destination */}
          <div className="col-span-2 glass-card rounded-2xl p-4 space-y-3">
            <label className="text-[13px] font-semibold text-[#5d5f5f] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">location_on</span>
              Destination City
            </label>
            <div className="relative">
              <input
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full bg-white/30 border border-white/40 rounded-xl px-4 py-3 text-[16px] focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none backdrop-blur-md text-[#1c1b1b]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#5d5f5f] text-sm">
                edit
              </span>
            </div>
          </div>

          {/* Duration */}
          <div className="glass-card rounded-2xl p-4 space-y-3">
            <label className="text-[13px] font-semibold text-[#5d5f5f] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              Duration
            </label>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setDays(d => Math.max(1, d - 1))}
                className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/60 text-lg font-bold text-[#1c1b1b]"
              >
                -
              </button>
              <span className="text-[18px] font-semibold text-[#1c1b1b]">{days} Days</span>
              <button
                onClick={() => setDays(d => d + 1)}
                className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/60 text-lg font-bold text-[#1c1b1b]"
              >
                +
              </button>
            </div>
          </div>

          {/* Travelers */}
          <div className="glass-card rounded-2xl p-4 space-y-3">
            <label className="text-[13px] font-semibold text-[#5d5f5f] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">group</span>
              Travelers
            </label>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setTravelers(t => Math.max(1, t - 1))}
                className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/60 text-lg font-bold text-[#1c1b1b]"
              >
                -
              </button>
              <span className="text-[18px] font-semibold text-[#1c1b1b]">{travelers} People</span>
              <button
                onClick={() => setTravelers(t => t + 1)}
                className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/60 text-lg font-bold text-[#1c1b1b]"
              >
                +
              </button>
            </div>
          </div>
        </section>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </main>

      {/* Generate button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-5 z-50">
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full bg-[#1DB954] text-white py-5 rounded-full text-xl font-bold shadow-2xl shadow-[#1DB954]/40 flex items-center justify-center gap-3 hover:bg-[#19a34a] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {generating ? 'progress_activity' : 'auto_fix_high'}
          </span>
          {generating ? 'Generating...' : 'Generate Itinerary'}
        </button>
      </div>
    </>
  )
}
