// components/event-card.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Music, Trophy, Palette, Utensils, Star } from "lucide-react";

interface Event {
  name: string;
  date: string;
  venue: string;
  description: string;
  ticketPrice: string;
  category: string;
  bookingUrl?: string;
}

interface HiddenGem {
  name: string;
  category: string;
  description: string;
  location: string;
  bestTime: string;
  localSecret: string;
}

export function EventCard({ event, index }: { event: Event; index: number }) {
  const categoryIcons: Record<string, React.ReactNode> = {
    music: <Music className="w-4 h-4" />,
    sports: <Trophy className="w-4 h-4" />,
    cultural: <Palette className="w-4 h-4" />,
    food: <Utensils className="w-4 h-4" />,
  };

  const icon = categoryIcons[event.category?.toLowerCase()] ?? <Star className="w-4 h-4" />;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/40 border border-zinc-800 hover:border-zinc-700 transition-colors group"
    >
      <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-white text-sm font-semibold leading-tight line-clamp-1">
            {event.name}
          </h4>
          {event.ticketPrice && (
            <span className="text-teal-400 text-xs font-semibold whitespace-nowrap flex-shrink-0">
              {event.ticketPrice}
            </span>
          )}
        </div>
        <p className="text-zinc-400 text-xs mt-1 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
        <div className="flex items-center gap-4 mt-2 text-zinc-500 text-xs">
          {event.date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {event.date}
            </span>
          )}
          {event.venue && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[120px]">{event.venue}</span>
            </span>
          )}
        </div>
      </div>
      {event.bookingUrl && (
        <a
          href={event.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-zinc-500 hover:text-teal-400 transition-colors mt-0.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </motion.div>
  );
}

export function HiddenGemCard({
  gem,
  index,
}: {
  gem: HiddenGem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 rounded-xl bg-gradient-to-br from-amber-400/5 to-teal-400/5 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-lg flex-shrink-0">
          💎
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-white text-sm font-semibold">{gem.name}</h4>
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-xs capitalize">
              {gem.category}
            </span>
          </div>
          <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">
            {gem.description}
          </p>
          {gem.localSecret && (
            <div className="mt-2 p-2.5 rounded-lg bg-amber-400/5 border border-amber-400/10">
              <p className="text-amber-400/80 text-xs flex items-start gap-1.5">
                <span className="text-sm flex-shrink-0">🤫</span>
                <span>{gem.localSecret}</span>
              </p>
            </div>
          )}
          <div className="flex items-center gap-3 mt-2 text-zinc-500 text-xs">
            {gem.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {gem.location}
              </span>
            )}
            {gem.bestTime && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {gem.bestTime}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
