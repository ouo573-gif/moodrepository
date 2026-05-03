'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/', icon: 'explore', label: 'Explore' },
  { href: '/trips', icon: 'map', label: 'My Trips' },
  { href: '#', icon: 'library_music', label: 'Moods' },
  { href: '#', icon: 'person', label: 'Profile' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-3 glass-nav">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#1DB954]">
          MoodVoyage
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-1.5 font-medium transition-colors ${
                  active ? 'text-[#1DB954]' : 'text-gray-600 hover:text-[#1DB954]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-white/20 transition-all active:scale-95 duration-200">
          <span className="material-symbols-outlined text-gray-600">notifications</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/40 flex items-center justify-center text-[#1DB954] font-bold text-sm select-none">
          M
        </div>
      </div>
    </header>
  )
}
