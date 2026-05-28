// app/trip/page.tsx
"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import TripForm, { TripFormData } from "@/components/trip-form";
import ItineraryCard from "@/components/itinerary-card";
import { EventCard, HiddenGemCard } from "@/components/event-card";
import { FullPageLoader } from "@/components/loading-skeleton";
import ChatSidebar from "@/components/chat-sidebar";
import {
  MapPin,
  Calendar,
  DollarSign,
  Share2,
  RefreshCw,
  Download,
  Star,
  Cloud,
  Lightbulb,
  Sparkles,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

interface Itinerary {
  destination: string;
  summary: string;
  weather?: {
    overview: string;
    temperature: string;
    recommendation: string;
  };
  dailyPlan: any[];
  events: any[];
  hiddenGems: any[];
  restaurants: any[];
  travelTips: any[];
  budgetBreakdown: any;
  essentials?: any;
}

function TripPageContent() {
  const searchParams = useSearchParams();
  const initialDestination = searchParams.get("destination") || "";

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tripId, setTripId] = useState<string | null>(null);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"itinerary" | "events" | "gems" | "budget" | "tips">("itinerary");
  const [copied, setCopied] = useState(false);

  const generateTrip = async (formData: TripFormData) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const res = await fetch("/api/trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate itinerary");
      }

      setItinerary(data.itinerary);
      setTripId(data.tripId);
      setShareToken(data.shareToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    const url = shareToken
      ? `${window.location.origin}/api/trip?share=${shareToken}`
      : window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TABS = [
    { id: "itinerary", label: "Daily Plan", count: itinerary?.dailyPlan?.length },
    { id: "events", label: "Events", count: itinerary?.events?.length },
    { id: "gems", label: "Hidden Gems", count: itinerary?.hiddenGems?.length },
    { id: "budget", label: "Budget" },
    { id: "tips", label: "Tips", count: itinerary?.travelTips?.length },
  ] as const;

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">

          {/* LEFT — Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">
                Plan Your Trip
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Tell us about your dream trip and our AI will craft a personalized itinerary.
              </p>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
              <TripForm
                onSubmit={generateTrip}
                isLoading={isLoading}
                initialDestination={initialDestination}
              />
            </div>
          </motion.div>

          {/* RIGHT — Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="min-h-[600px]"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FullPageLoader />
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    Something went wrong
                  </h3>
                  <p className="text-zinc-400 text-sm text-center max-w-sm mb-4">
                    {error}
                  </p>
                  <button
                    onClick={() => setError(null)}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors"
                  >
                    Try again
                  </button>
                </motion.div>
              ) : itinerary ? (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Itinerary Header */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-[#111827] border border-zinc-800">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-teal-400" />
                          <span className="text-teal-400 text-sm font-medium">
                            AI-Generated Itinerary
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">
                          {itinerary.destination}
                        </h2>
                        {itinerary.dailyPlan?.length > 0 && (
                          <p className="text-zinc-500 text-sm mt-1">
                            {itinerary.dailyPlan.length} days planned
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={handleShare}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs transition-colors"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          {copied ? "Copied!" : "Share"}
                        </button>
                      </div>
                    </div>

                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {itinerary.summary}
                    </p>

                    {/* Weather */}
                    {itinerary.weather && (
                      <div className="mt-4 flex items-start gap-3 p-3 rounded-xl bg-sky-400/5 border border-sky-400/10">
                        <Cloud className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sky-400 text-xs font-semibold mb-0.5">
                            Weather · {itinerary.weather.temperature}
                          </p>
                          <p className="text-zinc-400 text-xs">
                            {itinerary.weather.overview}
                          </p>
                          {itinerary.weather.recommendation && (
                            <p className="text-zinc-500 text-xs mt-1 italic">
                              {itinerary.weather.recommendation}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-zinc-800 text-white shadow-sm"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {tab.label}
                        {"count" in tab && tab.count ? (
                          <span className="px-1.5 py-0.5 rounded-full bg-teal-400/10 text-teal-400 text-xs">
                            {tab.count}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    {activeTab === "itinerary" && (
                      <motion.div
                        key="itinerary-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        {itinerary.dailyPlan?.length > 0 ? (
                          itinerary.dailyPlan.map((day: any, i: number) => (
                            <ItineraryCard key={i} day={day} index={i} />
                          ))
                        ) : (
                          <EmptyState message="No daily plan generated" />
                        )}
                      </motion.div>
                    )}

                    {activeTab === "events" && (
                      <motion.div
                        key="events-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <SectionHeader
                          icon="🎭"
                          title="Events & Experiences"
                          subtitle="Don't miss these during your stay"
                        />
                        {itinerary.events?.length > 0 ? (
                          itinerary.events.map((event: any, i: number) => (
                            <EventCard key={i} event={event} index={i} />
                          ))
                        ) : (
                          <EmptyState message="No events found for your dates" />
                        )}
                      </motion.div>
                    )}

                    {activeTab === "gems" && (
                      <motion.div
                        key="gems-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <SectionHeader
                          icon="💎"
                          title="Hidden Gems"
                          subtitle="The spots most tourists miss"
                        />
                        {itinerary.hiddenGems?.length > 0 ? (
                          itinerary.hiddenGems.map((gem: any, i: number) => (
                            <HiddenGemCard key={i} gem={gem} index={i} />
                          ))
                        ) : (
                          <EmptyState message="No hidden gems listed" />
                        )}
                      </motion.div>
                    )}

                    {activeTab === "budget" && (
                      <motion.div
                        key="budget-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <BudgetBreakdown budget={itinerary.budgetBreakdown} />
                      </motion.div>
                    )}

                    {activeTab === "tips" && (
                      <motion.div
                        key="tips-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <SectionHeader
                          icon="💡"
                          title="Travel Tips"
                          subtitle="Insider knowledge for a smoother trip"
                        />
                        {itinerary.travelTips?.length > 0 ? (
                          <div className="space-y-3">
                            {itinerary.travelTips.map((tip: any, i: number) => (
                              <TipCard key={i} tip={tip} index={i} />
                            ))}
                          </div>
                        ) : (
                          <EmptyState message="No tips available" />
                        )}

                        {/* Essentials */}
                        {itinerary.essentials && (
                          <EssentialsCard essentials={itinerary.essentials} />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <EmptyState
                  message=""
                  isInitial
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* AI Chat Sidebar */}
      <ChatSidebar tripContext={itinerary || undefined} />
    </div>
  );
}

export default function TripPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
      <TripPageContent />
    </Suspense>
  );
}

// Sub-components

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-4">
      <h3 className="text-white font-semibold text-base flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h3>
      <p className="text-zinc-500 text-xs mt-0.5">{subtitle}</p>
    </div>
  );
}

function BudgetBreakdown({ budget }: { budget: any }) {
  if (!budget) return <EmptyState message="No budget breakdown available" />;

  const categories = [
    { key: "accommodation", label: "Accommodation", icon: "🏨" },
    { key: "food", label: "Food & Dining", icon: "🍽️" },
    { key: "activities", label: "Activities", icon: "🎯" },
    { key: "transport", label: "Transport", icon: "🚌" },
    { key: "nightlife", label: "Nightlife", icon: "🌃" },
    { key: "shopping", label: "Shopping", icon: "🛍️" },
  ];

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-400/5 to-sky-400/5 border border-teal-400/20">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-bold text-lg">Estimated Total</h3>
          <DollarSign className="w-5 h-5 text-teal-400" />
        </div>
        <p className="text-teal-400 text-2xl font-bold">
          {budget.totalEstimate}
        </p>
        <p className="text-zinc-500 text-xs mt-1">
          {budget.currency} · Based on your budget preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {categories.map(({ key, label, icon }) =>
          budget[key] ? (
            <div
              key={key}
              className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/60 border border-zinc-800"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="text-white text-sm font-medium">{label}</p>
                  {budget[key].notes && (
                    <p className="text-zinc-500 text-xs">
                      {budget[key].notes}
                    </p>
                  )}
                  {budget[key].breakdown && (
                    <p className="text-zinc-500 text-xs">
                      {budget[key].breakdown}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-teal-400 text-sm font-semibold">
                  {budget[key].total || budget[key].estimated}
                </p>
                {budget[key].estimated && budget[key].total && (
                  <p className="text-zinc-600 text-xs">
                    {budget[key].estimated}/day
                  </p>
                )}
              </div>
            </div>
          ) : null
        )}
      </div>

      {budget.moneyTips && (
        <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/10 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-400/80 text-sm">{budget.moneyTips}</p>
        </div>
      )}
    </div>
  );
}

function TipCard({ tip, index }: { tip: any; index: number }) {
  const importanceColor: Record<string, string> = {
    high: "text-red-400 bg-red-400/10 border-red-400/20",
    medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    low: "text-teal-400 bg-teal-400/10 border-teal-400/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 flex-shrink-0">
        <span className="text-sm">
          {tip.category === "transport"
            ? "🚌"
            : tip.category === "safety"
              ? "🛡️"
              : tip.category === "culture"
                ? "🏛️"
                : tip.category === "money"
                  ? "💳"
                  : "💬"}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-zinc-400 text-xs capitalize font-medium">
            {tip.category}
          </span>
          {tip.importance && (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                importanceColor[tip.importance] || importanceColor.medium
              }`}
            >
              {tip.importance}
            </span>
          )}
        </div>
        <p className="text-white text-sm leading-relaxed">{tip.tip}</p>
      </div>
    </motion.div>
  );
}

function EssentialsCard({ essentials }: { essentials: any }) {
  return (
    <div className="mt-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
      <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
        📋 Trip Essentials
      </h4>
      <div className="space-y-3">
        {[
          { key: "visa", label: "Visa Requirements", icon: "🛂" },
          { key: "currency", label: "Currency", icon: "💱" },
          { key: "language", label: "Language", icon: "🗣️" },
          { key: "emergency", label: "Emergency", icon: "🚨" },
          { key: "bestTransport", label: "Getting Around", icon: "🚆" },
        ].map(({ key, label, icon }) =>
          essentials[key] ? (
            <div key={key} className="flex items-start gap-3">
              <span className="text-base flex-shrink-0">{icon}</span>
              <div>
                <p className="text-zinc-500 text-xs font-medium">{label}</p>
                <p className="text-zinc-300 text-sm">{essentials[key]}</p>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

function EmptyState({
  message,
  isInitial = false,
}: {
  message: string;
  isInitial?: boolean;
}) {
  if (isInitial) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl mb-6"
        >
          🌍
        </motion.div>
        <h3 className="text-white font-semibold text-lg mb-2">
          Where to next?
        </h3>
        <p className="text-zinc-500 text-sm max-w-xs">
          Fill in your trip details on the left and let our AI craft your
          perfect personalized itinerary.
        </p>
        <div className="mt-6 flex items-center gap-2 text-teal-400 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Groq AI</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 text-center text-zinc-600 text-sm">{message}</div>
  );
}
