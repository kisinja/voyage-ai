// components/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X, Sparkles, Map, BookOpen } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/60 shadow-2xl shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-sky-400 flex items-center justify-center shadow-lg shadow-teal-400/20 group-hover:shadow-teal-400/40 transition-shadow">
                <Compass className="w-4 h-4 text-zinc-950" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Voyage
                <span className="text-teal-400">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink href="/" icon={<Map className="w-3.5 h-3.5" />}>
                Explore
              </NavLink>
              <NavLink href="/trip" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Plan Trip
              </NavLink>
              <NavLink
                href="#"
                icon={<BookOpen className="w-3.5 h-3.5" />}
              >
                Saved Trips
              </NavLink>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/trip"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-400/10 hover:bg-teal-400/20 border border-teal-400/20 hover:border-teal-400/40 text-teal-400 text-sm font-medium transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Plan Your Trip
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 md:hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              <MobileNavLink href="/" onClick={() => setMobileOpen(false)}>
                <Map className="w-4 h-4" /> Explore
              </MobileNavLink>
              <MobileNavLink
                href="/trip"
                onClick={() => setMobileOpen(false)}
              >
                <Sparkles className="w-4 h-4" /> Plan Trip
              </MobileNavLink>
              <MobileNavLink href="#" onClick={() => setMobileOpen(false)}>
                <BookOpen className="w-4 h-4" /> Saved Trips
              </MobileNavLink>
              <Link
                href="/trip"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-teal-400 text-zinc-950 font-semibold text-sm transition-opacity hover:opacity-90"
              >
                <Sparkles className="w-4 h-4" />
                Start Planning
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200"
    >
      {icon}
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 text-zinc-300 hover:text-white text-base font-medium py-2 transition-colors"
    >
      {children}
    </Link>
  );
}
