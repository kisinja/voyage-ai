// components/trip-form.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  DollarSign,
  Sparkles,
  X,
  ChevronDown,
  Loader2,
} from "lucide-react";
import {
  BUDGET_OPTIONS,
  TRAVEL_STYLES,
  INTEREST_OPTIONS,
} from "@/lib/utils/format";

interface TripFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
  initialDestination?: string;
}

export interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  interests: string[];
  travelStyle: string;
}

export default function TripForm({
  onSubmit,
  isLoading,
  initialDestination = "",
}: TripFormProps) {
  const [form, setForm] = useState<TripFormData>({
    destination: initialDestination,
    startDate: "",
    endDate: "",
    budget: "moderate",
    interests: [],
    travelStyle: "chill",
  });

  useEffect(() => {
    if (initialDestination) {
      setForm((prev) => ({ ...prev, destination: initialDestination }));
    }
  }, [initialDestination]);

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isValid =
    form.destination && form.startDate && form.endDate && form.travelStyle;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Destination */}
      <div>
        <label className="block text-zinc-300 text-sm font-medium mb-2">
          Where are you going?
        </label>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-400" />
          <input
            type="text"
            placeholder="e.g. Tokyo, Japan"
            value={form.destination}
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
            required
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-zinc-800/60 border border-zinc-700 hover:border-zinc-600 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/10 text-white placeholder:text-zinc-500 text-sm outline-none transition-all"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-zinc-300 text-sm font-medium mb-2">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-400" />
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full pl-10 pr-3 py-3.5 rounded-xl bg-zinc-800/60 border border-zinc-700 hover:border-zinc-600 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/10 text-white text-sm outline-none transition-all [color-scheme:dark]"
            />
          </div>
        </div>
        <div>
          <label className="block text-zinc-300 text-sm font-medium mb-2">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-400" />
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              required
              min={form.startDate || new Date().toISOString().split("T")[0]}
              className="w-full pl-10 pr-3 py-3.5 rounded-xl bg-zinc-800/60 border border-zinc-700 hover:border-zinc-600 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/10 text-white text-sm outline-none transition-all [color-scheme:dark]"
            />
          </div>
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-zinc-300 text-sm font-medium mb-2">
          <DollarSign className="inline w-3.5 h-3.5 mr-1 text-teal-400" />
          Budget
        </label>
        <div className="grid grid-cols-2 gap-2">
          {BUDGET_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setForm({ ...form, budget: option.value })}
              className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-200 ${
                form.budget === option.value
                  ? "bg-teal-400/10 border-teal-400/50 text-teal-400"
                  : "bg-zinc-800/40 border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <div>
                <p className="text-xs font-semibold">{option.label}</p>
                <p className="text-xs opacity-70">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Travel Style */}
      <div>
        <label className="block text-zinc-300 text-sm font-medium mb-2">
          Travel Style
        </label>
        <div className="flex flex-wrap gap-2">
          {TRAVEL_STYLES.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => setForm({ ...form, travelStyle: style.value })}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                form.travelStyle === style.value
                  ? "bg-teal-400/10 border-teal-400/50 text-teal-400"
                  : "bg-zinc-800/40 border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              <span>{style.icon}</span>
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-zinc-300 text-sm font-medium mb-2">
          Interests{" "}
          <span className="text-zinc-500 font-normal">(select all that apply)</span>
        </label>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-700">
          {INTEREST_OPTIONS.map((interest) => {
            const selected = form.interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                  selected
                    ? "bg-sky-400/10 border-sky-400/40 text-sky-400"
                    : "bg-zinc-800/40 border-zinc-700/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
                }`}
              >
                {selected && <X className="w-3 h-3" />}
                {interest}
              </button>
            );
          })}
        </div>
        {form.interests.length > 0 && (
          <p className="text-teal-400/70 text-xs mt-2">
            {form.interests.length} interest{form.interests.length > 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={!isValid || isLoading}
        whileHover={{ scale: isValid && !isLoading ? 1.01 : 1 }}
        whileTap={{ scale: isValid && !isLoading ? 0.98 : 1 }}
        className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base transition-all duration-200 ${
          isValid && !isLoading
            ? "bg-teal-400 hover:bg-teal-300 text-zinc-950 shadow-lg shadow-teal-400/20 hover:shadow-teal-400/30"
            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating your itinerary...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate My Itinerary
          </>
        )}
      </motion.button>

      {isLoading && (
        <p className="text-center text-zinc-500 text-xs">
          AI is crafting your personalized experience... ~10 seconds
        </p>
      )}
    </form>
  );
}
