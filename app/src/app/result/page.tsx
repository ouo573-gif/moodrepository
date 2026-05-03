'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ColorThief = require('colorthief')
import NavBar from '@/components/NavBar'
import ItineraryView from '@/components/ItineraryView'
import type { Itinerary, ItineraryDay } from '@/lib/claude'
import type { MediaItem } from '@/app/api/search/route'

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
}

export default function ResultPage() {
  const router = useRouter()
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [media, setMedia] = useState<MediaItem | null>(null)
  const [days, setDays] = useState<ItineraryDay[]>([])
  const [accentColor, setAccentColor] = useState('#1DB954')
  const sensors = useSensors(useSensor(PointerSensor))

  useEffect(() => {
    const rawItinerary = localStorage.getItem('moodtravel_itinerary')
    const rawMedia = localStorage.getItem('moodtravel_media')
    if (!rawItinerary || !rawMedia) { router.push('/'); return }
    const it = JSON.parse(rawItinerary) as Itinerary
    const med = JSON.parse(rawMedia) as MediaItem
    setItinerary(it)
    setDays(it.days)
    setMedia(med)
  }, [router])

  const extractColor = useCallback((imgEl: HTMLImageElement) => {
    try {
      const ct = new ColorThief()
      const [r, g, b] = ct.getColor(imgEl)
      setAccentColor(rgbToHex(r, g, b))
    } catch {
      // keep default green
    }
  }, [])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setDays(prev => {
      const oldIdx = prev.findIndex(d => String(d.day) === active.id)
      const newIdx = prev.findIndex(d => String(d.day) === over.id)
      return arrayMove(prev, oldIdx, newIdx)
    })
  }

  if (!itinerary || !media) return null

  const dest = itinerary.destination
  const gallerySeeds = [dest + '-hero', dest + '-1', dest + '-2']

  return (
    <>
      <div
        className="fixed inset-0 z-[-1]"
        style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #fcf9f8 50%, #f1f8e9 100%)' }}
      />
      <div
        className="fixed rounded-full z-[-1] opacity-25 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: `${accentColor}`,
          filter: 'blur(120px)',
          top: -100,
          right: -100,
        }}
      />

      <NavBar />

      <main className="pb-32 px-5 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-24">
        {/* Left: itinerary list */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            {media.coverUrl && (
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <img
                  src={media.coverUrl}
                  alt={media.title}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  onLoad={e => extractColor(e.currentTarget as HTMLImageElement)}
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-[#1c1b1b]">{dest}, {itinerary.country}</h1>
              <p className="text-[13px] text-[#5d5f5f]">
                {itinerary.duration.days} days · {itinerary.mood}
              </p>
            </div>
          </div>

          {/* Drag-and-drop itinerary */}
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <ItineraryView days={days} accentColor={accentColor} onDaysReorder={setDays} />
          </DndContext>

          <button className="mt-2 w-full py-4 rounded-2xl border-2 border-dashed border-white/40 text-[#3d4a3d] text-[13px] font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">add</span>
            Add Stop
          </button>
        </section>

        {/* Right: gallery */}
        <section className="lg:col-span-7 relative hidden lg:block">
          <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[600px]">
            {/* Hero image */}
            <div className="col-span-12 row-span-4 rounded-2xl overflow-hidden relative shadow-2xl group">
              <img
                src={`https://picsum.photos/seed/${gallerySeeds[0]}/800/500`}
                alt={dest}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h2 className="text-white text-[32px] font-bold drop-shadow-md">
                  {dest}, {itinerary.country}
                </h2>
                <p className="text-white/90 text-[16px]">{itinerary.mood}</p>
              </div>
            </div>

            {/* Sub images */}
            <div className="col-span-6 row-span-2 rounded-2xl overflow-hidden relative shadow-xl group">
              <img
                src={`https://picsum.photos/seed/${gallerySeeds[1]}/400/300`}
                alt="scene"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 glass-card px-3 py-1 rounded-full text-[12px] font-bold text-[#1c1b1b]">
                {days[0]?.activities[0]?.place ?? 'Day 1'}
              </div>
            </div>

            <div className="col-span-6 row-span-2 rounded-2xl overflow-hidden relative shadow-xl group">
              <img
                src={`https://picsum.photos/seed/${gallerySeeds[2]}/400/300`}
                alt="scene"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-3 left-3 glass-card p-2 rounded-xl max-w-[80%]">
                <p className="text-[12px] font-semibold text-[#1c1b1b] leading-tight">
                  {days[1]?.activities[0]?.place ?? 'Day 2'}
                </p>
              </div>
            </div>
          </div>

          {/* Floating mood card */}
          <div className="absolute top-6 right-6 glass-card p-4 rounded-2xl w-48 shadow-2xl animate-bounce-slow pointer-events-none hidden xl:block">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#1DB954] text-sm">wb_sunny</span>
              <span className="text-[12px] font-bold text-[#1c1b1b] uppercase tracking-tight">Current Mood</span>
            </div>
            <p className="text-sm font-medium text-[#5d5e63] italic">&ldquo;{itinerary.mood}&rdquo;</p>
          </div>

          {/* Travel buddy status */}
          <div className="absolute bottom-4 right-4 glass-card p-4 rounded-2xl flex items-center gap-3 shadow-lg">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(n => (
                <div
                  key={n}
                  className="w-8 h-8 rounded-full border-2 border-white/60 bg-[#1DB954]/20 flex items-center justify-center text-[#1DB954] font-bold text-xs"
                >
                  {n}
                </div>
              ))}
            </div>
            <span className="text-[#1c1b1b] text-[13px] font-semibold">3 Travel Buddies Online</span>
          </div>
        </section>
      </main>

      {/* FAB */}
      <button
        onClick={() => router.push('/')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#1DB954] text-white rounded-full shadow-lg shadow-[#1DB954]/40 flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <span className="material-symbols-outlined">edit_calendar</span>
      </button>
    </>
  )
}
