// components/itinerary-card.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  DollarSign,
  Lightbulb,
  ChevronDown,
  UtensilsCrossed,
  Moon,
  Sun,
  Sunset,
} from "lucide-react";

interface DayActivity {
  time: string;
  activity: string;
  description: string;
  location: string;
  duration: string;
  cost: string;
  tips: string;
}

interface DayDining {
  breakfast?: { name: string; cuisine: string; priceRange: string; mustTry: string; address: string };
  lunch?: { name: string; cuisine: string; priceRange: string; mustTry: string; address: string };
  dinner?: { name: string; cuisine: string; priceRange: string; mustTry: string; address: string };
}

interface DayNightlife {
  venue: string;
  type: string;
  vibe: string;
  address: string;
  bestTime: string;
  cost: string;
}

interface DayPlan {
  day: number;
  date: string;
  title: string;
  theme: string;
  morning: DayActivity;
  afternoon: DayActivity;
  evening: DayActivity;
  dining: DayDining;
  nightlife?: DayNightlife;
}

interface ItineraryCardProps {
  day: DayPlan;
  index: number;
}

export default function ItineraryCard({ day, index }: ItineraryCardProps) {
  const [expanded, setExpanded] = useState(index === 0);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="rounded-2xl border border-zinc-800 overflow-hidden bg-[#111827]"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-zinc-800/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400/20 to-sky-400/20 border border-teal-400/20 flex items-center justify-center">
            <span className="text-teal-400 font-bold text-sm">{day.day}</span>
          </div>
          <div className="text-left">
            <p className="text-white font-semibold text-sm sm:text-base">
              {day.title}
            </p>
            <p className="text-zinc-500 text-xs mt-0.5">
              {formatDate(day.date)} · {day.theme}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-zinc-800/60">
              {/* Activities Timeline */}
              <div className="mt-5 space-y-4">
                {[
                  { data: day.morning, label: "Morning", icon: <Sun className="w-3.5 h-3.5" />, color: "amber" },
                  { data: day.afternoon, label: "Afternoon", icon: <Sunset className="w-3.5 h-3.5" />, color: "sky" },
                  { data: day.evening, label: "Evening", icon: <Moon className="w-3.5 h-3.5" />, color: "teal" },
                ].map(({ data, label, icon, color }) =>
                  data ? (
                    <ActivityBlock
                      key={label}
                      activity={data}
                      label={label}
                      icon={icon}
                      color={color}
                    />
                  ) : null
                )}
              </div>

              {/* Dining */}
              {day.dining && (
                <div className="mt-5">
                  <h4 className="flex items-center gap-2 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
                    Where to Eat
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(["breakfast", "lunch", "dinner"] as const).map(
                      (meal) =>
                        day.dining[meal] && (
                          <div
                            key={meal}
                            className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800"
                          >
                            <p className="text-zinc-500 text-xs capitalize font-medium mb-1">
                              {meal}
                            </p>
                            <p className="text-white text-xs font-semibold">
                              {day.dining[meal]!.name}
                            </p>
                            <p className="text-zinc-500 text-xs">
                              {day.dining[meal]!.cuisine} ·{" "}
                              {day.dining[meal]!.priceRange}
                            </p>
                            <p className="text-amber-400/80 text-xs mt-1 italic">
                              Try: {day.dining[meal]!.mustTry}
                            </p>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}

              {/* Nightlife */}
              {day.nightlife && (
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-violet-500/5 to-sky-500/5 border border-zinc-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-3.5 h-3.5 text-sky-400" />
                    <span className="text-sky-400 text-xs font-semibold uppercase tracking-wider">
                      Nightlife
                    </span>
                  </div>
                  <p className="text-white text-sm font-semibold">
                    {day.nightlife.venue}
                  </p>
                  <p className="text-zinc-400 text-xs mt-1">
                    {day.nightlife.type} · {day.nightlife.vibe}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {day.nightlife.bestTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {day.nightlife.cost}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {day.nightlife.address}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ActivityBlock({
  activity,
  label,
  icon,
  color,
}: {
  activity: DayActivity;
  label: string;
  icon: React.ReactNode;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    amber: "text-amber-400",
    sky: "text-sky-400",
    teal: "text-teal-400",
  };

  return (
    <div className="flex gap-3">
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div
          className={`w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}
        >
          {icon}
        </div>
        <div className="w-px flex-1 bg-zinc-800 mt-1" />
      </div>

      {/* Content */}
      <div className="pb-4 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-semibold ${colorMap[color]}`}>
            {label}
          </span>
          <span className="text-zinc-600 text-xs">{activity.time}</span>
        </div>
        <h4 className="text-white text-sm font-semibold">{activity.activity}</h4>
        <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
          {activity.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-zinc-500">
          {activity.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {activity.location}
            </span>
          )}
          {activity.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {activity.duration}
            </span>
          )}
          {activity.cost && (
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {activity.cost}
            </span>
          )}
        </div>
        {activity.tips && (
          <div className="flex items-start gap-1.5 mt-2 p-2.5 rounded-lg bg-amber-400/5 border border-amber-400/10">
            <Lightbulb className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-400/80 text-xs">{activity.tips}</p>
          </div>
        )}
      </div>
    </div>
  );
}
