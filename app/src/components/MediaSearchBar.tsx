'use client'

import { useState } from 'react'

type MediaType = 'music' | 'movie'

interface Props {
  onSearch: (keyword: string, type: MediaType) => void
  loading?: boolean
}

export default function MediaSearchBar({ onSearch, loading }: Props) {
  const [keyword, setKeyword] = useState('')
  const [type, setType] = useState<MediaType>('music')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (keyword.trim()) onSearch(keyword.trim(), type)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2 mb-3">
        {(['music', 'movie'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              type === t
                ? 'bg-green-500 text-black'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {t === 'music' ? '🎵 音樂' : '🎬 電影'}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder={type === 'music' ? '搜尋歌曲或藝人...' : '搜尋電影...'}
          className="flex-1 bg-white/10 text-white placeholder-white/40 rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          disabled={loading || !keyword.trim()}
          className="bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-bold px-6 py-3 rounded-full transition-colors"
        >
          {loading ? '搜尋中' : '搜尋'}
        </button>
      </div>
    </form>
  )
}
