// components/hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Star,
  MapPin,
  Zap,
} from "lucide-react";
import { FEATURED_DESTINATIONS } from "@/lib/utils/format";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-zinc-950 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-teal-400/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[-15%] w-[600px] h-[600px] rounded-full bg-sky-400/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] rounded-full bg-amber-400/3 blur-[100px]" />
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(45, 212, 191, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 212, 191, 0.5) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-400 text-sm font-medium mb-8">
              <Zap className="w-3.5 h-3.5" />
              Powered by Groq AI · Ultra-fast itineraries
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            Your AI travel
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-sky-400 to-teal-300 bg-clip-text text-transparent">
              concierge
            </span>
            , redefined.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10"
          >
            Tell us your dream destination, dates, and vibe. Our AI builds a
            hyper-personalized itinerary with insider tips, hidden gems, and
            real-time event data — in seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Link
              href="/trip"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-teal-400 hover:bg-teal-300 text-zinc-950 font-bold text-base transition-all duration-200 shadow-lg shadow-teal-400/25 hover:shadow-teal-400/40"
            >
              <Sparkles className="w-4 h-4" />
              Plan My Trip
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white font-medium text-base transition-all duration-200">
              <Star className="w-4 h-4 text-amber-400" />
              View Sample Itinerary
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-6 mt-12 text-zinc-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-teal-400/60 to-sky-400/60"
                  />
                ))}
              </div>
              <span>12,000+ trips planned</span>
            </div>
            <div className="w-px h-4 bg-zinc-800" />
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>4.9/5 rating</span>
            </div>
            <div className="w-px h-4 bg-zinc-800" />
            <span>150+ countries</span>
          </motion.div>
        </motion.div>

        {/* Featured Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-24"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-1">
                Popular Right Now
              </p>
              <h2 className="text-2xl font-bold text-white">
                Featured Destinations
              </h2>
            </div>
            <Link
              href="/trip"
              className="hidden sm:flex items-center gap-1.5 text-teal-400 text-sm font-medium hover:text-teal-300 transition-colors"
            >
              Explore all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_DESTINATIONS.map((dest, i) => (
              <DestinationCard key={dest.city} dest={dest} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: "⚡",
              title: "Instant Itineraries",
              desc: "Generate full multi-day plans in under 10 seconds with Groq's ultra-fast AI inference.",
            },
            {
              icon: "🗺️",
              title: "Real Data, Real Places",
              desc: "Integrated with Google Places, Ticketmaster events, and live weather — no hallucinations.",
            },
            {
              icon: "🤝",
              title: "AI Chat Concierge",
              desc: "Ask anything. 'What should we do tonight?' 'Find cheaper restaurants.' Your local expert, always on.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function DestinationCard({
  dest,
  index,
}: {
  dest: (typeof FEATURED_DESTINATIONS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
    >
      <Image
        src={dest.image}
        alt={dest.city}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="flex items-center gap-1.5 mb-2">
          {dest.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-white font-bold text-xl leading-tight">
          {dest.city}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-zinc-300 text-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {dest.country}
          </p>
          <p className="text-zinc-400 text-xs italic">{dest.tagline}</p>
        </div>
      </div>

      {/* Hover CTA */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link
          href={`/trip?destination=${encodeURIComponent(dest.city + ", " + dest.country)}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-400 text-zinc-950 font-semibold text-sm shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Plan this trip
        </Link>
      </div>
    </motion.div>
  );
}
