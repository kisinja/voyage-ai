// components/loading-skeleton.tsx
"use client";

import { motion } from "framer-motion";

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-zinc-800/60 ${className}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function ItinerarySkeleton() {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-zinc-800">
        <div className="flex items-center gap-4 mb-4">
          <Shimmer className="w-10 h-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-4 w-3/4" />
            <Shimmer className="h-3 w-1/2" />
          </div>
        </div>
        <Shimmer className="h-px w-full mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <Shimmer className="w-7 h-7 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2 pt-0.5">
                <Shimmer className="h-3.5 w-1/3" />
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More day skeletons */}
      {[1, 2].map((i) => (
        <div
          key={i}
          className="p-5 rounded-2xl bg-[#111827] border border-zinc-800"
        >
          <div className="flex items-center gap-4">
            <Shimmer className="w-10 h-10 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-4 w-2/3" />
              <Shimmer className="h-3 w-1/3" />
            </div>
            <Shimmer className="w-4 h-4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-[#111827] border border-zinc-800 space-y-4">
      <Shimmer className="h-48 w-full rounded-xl" />
      <Shimmer className="h-6 w-3/4" />
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-5/6" />
    </div>
  );
}

export function BudgetSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-[#111827] border border-zinc-800">
      <Shimmer className="h-5 w-1/3 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <Shimmer className="h-3.5 w-24" />
            <Shimmer className="h-3.5 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400/20 to-sky-400/20 border border-teal-400/20 flex items-center justify-center mb-6"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(45, 212, 191, 0)",
            "0 0 0 20px rgba(45, 212, 191, 0.05)",
            "0 0 0 0 rgba(45, 212, 191, 0)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.span
          className="text-2xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          🌍
        </motion.span>
      </motion.div>
      <h3 className="text-white font-semibold text-lg mb-2">
        Crafting your perfect trip
      </h3>
      <p className="text-zinc-500 text-sm text-center max-w-sm">
        Our AI is analyzing destination data, events, weather, and hidden gems to build your personalized itinerary...
      </p>
      <div className="mt-6 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-teal-400"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
