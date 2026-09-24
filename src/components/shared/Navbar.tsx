"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import { useWorkout } from "@/context/WorkoutContext";
import React from "react";

export default function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  const { todayPlan, savedList } = useWorkout();

  return (
    <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src={logoImg}
            alt="FitLog Logo"
            width={36}
            height={36}
            className="object-contain"
            priority
          />
          <span className="text-2xl font-black tracking-wider text-white uppercase font-sans">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Middle Links */}
        <nav className="flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
          <Link
            href="/#library"
            className={`transition-colors duration-200 ${
              pathname === "/"
                ? "text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`transition-colors duration-200 ${
              pathname === "/my-plan"
                ? "text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00] text-black font-extrabold text-xs tracking-wider uppercase shadow-sm hover:brightness-105 transition-all"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] px-1.5 py-0.5 rounded-full text-[11px] font-black">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/30 text-white font-extrabold text-xs tracking-wider uppercase hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
          >
            <span>Saved</span>
            <span className="border border-white/40 text-white px-1.5 py-0.5 rounded-full text-[11px]">
              {savedList.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
