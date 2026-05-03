'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/NavBar'
import type { Itinerary } from '@/lib/claude'
import type { MediaItem } from '@/app/api/search/route'

const TABS = ['All Trips', 'Upcoming', 'Completed', 'Drafts']

const DEMO_TRIPS = [
  {
    id: 'demo1',
    title: 'Yosemite Meditation',
    mood: 'Forest Serenity',
    moodIcon: 'eco',
    dates: 'Oct 15, 2024 - Oct 20, 2024',
    status: 'Leaving Soon',
    statusColor: 'text-[#1DB954]',
    image: 'https://picsum.photos/seed/yosemite/600/400',
    companions: 2,
  },
  {
    id: 'demo2',
    title: 'Shibuya Light Exploration',
    mood: 'Urban Rhythm',
    moodIcon: 'bolt',
    dates: 'Aug 2, 2024 - Aug 8, 2024',
    status: 'Trip Completed',
    statusColor: 'text-[#5d5f5f]',
    image: 'https://picsum.photos/seed/shibuya/600/400',
    companions: 1,
    moodScore: 8.5,
  },
  {
    id: 'demo3',
    title: 'Ubud Wellness Retreat',
    mood: 'Mind & Body',
    moodIcon: 'spa',
    dates: 'Dec 20, 2024 - Dec 27, 2024',
    status: 'Planning',
    statusColor: 'text-[#5d5f5f]',
    image: 'https://picsum.photos/seed/ubud-bali/600/400',
    companions: 3,
  },
]

export default function TripsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('All Trips')
  const [savedTrip, setSavedTrip] = useState<{ itinerary: Itinerary; media: MediaItem } | null>(null)

  useEffect(() => {
    const rawIt = localStorage.getItem('moodtravel_itinerary')
    const rawMed = localStorage.getItem('moodtravel_media')
    if (rawIt && rawMed) {
      setSavedTrip({
        itinerary: JSON.parse(rawIt) as Itinerary,
        media: JSON.parse(rawMed) as MediaItem,
      })
    }
  }, [])

  return (
    <>
      <div
        className="fixed inset-0 z-[-1]"
        style={{ background: 'radial-gradient(circle at top left, #fcf9f8 0%, #e2f2e7 50%, #fcf9f8 100%)' }}
      />

      <NavBar />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <header className="mb-6">
          <h1 className="text-[32px] font-bold text-[#1c1b1b] mb-1">My Trips</h1>
          <p className="text-[#5d5e63] text-[16px]">
            Explore your emotional map across past and future journeys
          </p>
        </header>

        {/* Filter tabs */}
        <section className="mb-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-3 pb-2">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'bg-[#1DB954] text-white shadow-lg shadow-[#1DB954]/20'
                    : 'glass-card text-[#3d4a3d] hover:bg-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Trip grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Saved real trip (if exists) */}
          {savedTrip && (
            <div
              className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1DB954]/5 group cursor-pointer"
              onClick={() => router.push('/result')}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${savedTrip.itinerary.destination}-trip/600/400`}
                  alt={savedTrip.itinerary.destination}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/20 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#006e2d]">music_note</span>
                  <span className="text-[13px] font-semibold text-[#004118]">
                    {savedTrip.media.title}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-2xl font-semibold text-[#1c1b1b]">
                    {savedTrip.itinerary.destination}
                  </h3>
                  <span className="material-symbols-outlined text-[#5d5e63] cursor-pointer hover:text-[#006e2d] transition-colors">
                    more_vert
                  </span>
                </div>
                <p className="text-[#5d5e63] text-[13px] mb-3">{savedTrip.itinerary.mood}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[13px] text-[#1DB954] font-semibold">
                    {savedTrip.itinerary.duration.days} days · {savedTrip.itinerary.country}
                  </span>
                  <button className="px-4 py-1.5 rounded-full bg-white/50 border border-white/20 text-[#1DB954] text-[13px] font-semibold hover:bg-white transition-colors">
                    View Trip
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Demo trip cards */}
          {DEMO_TRIPS.map(trip => (
            <div
              key={trip.id}
              className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1DB954]/5 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/20 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#006e2d]">{trip.moodIcon}</span>
                  <span className="text-[13px] font-semibold text-[#004118]">{trip.mood}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-2xl font-semibold text-[#1c1b1b]">{trip.title}</h3>
                  <span className="material-symbols-outlined text-[#5d5e63] cursor-pointer hover:text-[#006e2d] transition-colors">
                    more_vert
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#5d5e63] mb-3">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  <span className="text-[13px]">{trip.dates}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  {trip.moodScore ? (
                    <>
                      <div className="flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[#1DB954] text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span className="text-[13px] text-[#5d5e63]">{trip.status}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#1DB954]/10 px-2 py-0.5 rounded text-[#1DB954]">
                        <span className="material-symbols-outlined text-xs">mood</span>
                        <span className="text-[13px]">Mood {trip.moodScore}</span>
                      </div>
                    </>
                  ) : trip.status === 'Planning' ? (
                    <>
                      <span className="text-[13px] text-[#5d5e63]">{trip.status}</span>
                      <button className="px-4 py-1.5 rounded-full bg-white/50 border border-white/20 text-[#1DB954] text-[13px] font-semibold hover:bg-white transition-colors">
                        Resume Editing
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex -space-x-2">
                        {Array.from({ length: trip.companions }).map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white bg-[#1DB954]/20 flex items-center justify-center text-[#006e2d] font-bold text-xs"
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                      <span className={`text-[13px] font-semibold ${trip.statusColor}`}>{trip.status}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add new journey */}
          <div
            onClick={() => router.push('/')}
            className="glass-card rounded-2xl border-dashed border-2 border-white/40 flex flex-col items-center justify-center min-h-[400px] cursor-pointer hover:bg-white/30 transition-all duration-300 group"
          >
            <div className="w-16 h-16 rounded-full bg-[#1DB954]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-[#1DB954]">add</span>
            </div>
            <h4 className="text-2xl font-semibold text-[#1c1b1b]">Start a New Journey</h4>
            <p className="text-[#5d5e63] text-[16px] mt-2">
              Plan your exploration based on your current mood
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
