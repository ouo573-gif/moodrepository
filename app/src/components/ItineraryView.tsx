'use client'

import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ItineraryDay } from '@/lib/claude'

const ACTIVITY_ICONS = ['spa', 'restaurant', 'park', 'museum', 'camera_alt', 'local_cafe', 'nightlife', 'hiking']

interface SortableDayCardProps {
  day: ItineraryDay
  index: number
}

function SortableDayCard({ day, index }: SortableDayCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: String(day.day),
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="glass-card p-6 rounded-2xl flex gap-4 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex-none w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border border-white/40">
        <span
          className="material-symbols-outlined text-[#1DB954] text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {ACTIVITY_ICONS[index % ACTIVITY_ICONS.length]}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="flex justify-between items-start mb-1"
          {...attributes}
          {...listeners}
          style={{ cursor: 'grab' }}
        >
          <span className="text-[13px] font-semibold text-[#1DB954] uppercase tracking-widest">
            Day {day.day}
          </span>
          <span className="material-symbols-outlined text-[#3d4a3d] text-sm select-none">drag_indicator</span>
        </div>
        <h3 className="text-xl font-semibold text-[#1c1b1b] mb-2">{day.title}</h3>
        <div className="space-y-1">
          {day.activities.map(act => (
            <div key={act.place} className="flex gap-2 text-[14px]">
              <span className="text-[#1DB954] font-semibold text-xs shrink-0 pt-0.5">{act.time}</span>
              <div className="min-w-0">
                <p className="font-medium text-[#1c1b1b] truncate">{act.place}</p>
                <p className="text-[#5d5e63] text-xs line-clamp-1">{act.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-0 h-full w-1 bg-[#1DB954]/40 rounded-r-2xl" />
    </div>
  )
}

interface Props {
  days: ItineraryDay[]
  accentColor: string
  onDaysReorder: (days: ItineraryDay[]) => void
}

export default function ItineraryView({ days }: Props) {
  return (
    <SortableContext items={days.map(d => String(d.day))} strategy={verticalListSortingStrategy}>
      <div className="flex flex-col gap-4">
        {days.map((day, i) => (
          <SortableDayCard key={day.day} day={day} index={i} />
        ))}
      </div>
    </SortableContext>
  )
}
