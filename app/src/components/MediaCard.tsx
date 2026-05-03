'use client'

import Image from 'next/image'
import type { MediaItem } from '@/app/api/search/route'

interface Props {
  item: MediaItem
  selected: boolean
  onClick: () => void
}

export default function MediaCard({ item, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer text-left ${
        selected ? 'ring-2 ring-green-500 bg-white/15' : ''
      }`}
    >
      <div className="relative aspect-square w-full bg-white/5">
        {item.coverUrl ? (
          <Image
            src={item.coverUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 200px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-5xl">
            {item.type === 'music' ? '🎵' : '🎬'}
          </div>
        )}
        {selected && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-lg">✓</div>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-white text-sm font-semibold line-clamp-1">{item.title}</p>
        <p className="text-white/50 text-xs mt-0.5 line-clamp-1">{item.subtitle}</p>
      </div>
    </button>
  )
}
