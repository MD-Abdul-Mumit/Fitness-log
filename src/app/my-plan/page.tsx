"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";
import { SortCriteria, WorkoutItem } from "@/types/book";

export default function MyPlanPage() {
  const {
    todayPlan,
    savedList,
    removeFromTodayPlan,
    removeFromSavedList,
    markAsDone,
  } = useWorkout();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<SortCriteria>("duration");

  const getItemId = (item: WorkoutItem) =>
    String(item.id || item._id || item.bookId || "");

  // Live Metrics Summary
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce(
    (acc, curr) => acc + (curr.duration || 0),
    0,
  );
  const totalCalories = todayPlan.reduce(
    (acc, curr) => acc + (curr.caloriesBurned || curr.calories || 0),
    0,
  );

  // Sorting
  const sortedToday = useMemo(() => {
    return [...todayPlan].sort((a, b) => {
      if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
      if (sortBy === "calories")
        return (
          (b.caloriesBurned || b.calories || 0) -
          (a.caloriesBurned || a.calories || 0)
        );
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [todayPlan, sortBy]);

  const sortedSaved = useMemo(() => {
    return [...savedList].sort((a, b) => {
      if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
      if (sortBy === "calories")
        return (
          (b.caloriesBurned || b.calories || 0) -
          (a.caloriesBurned || a.calories || 0)
        );
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [savedList, sortBy]);

  const currentList = activeTab === "today" ? sortedToday : sortedSaved;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Title & Subtitle */}
        <div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
            MY PLAN
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#181818] border border-white/10 rounded-2xl p-6">
            <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold block mb-1">
              Exercises
            </span>
            <span className="text-3xl sm:text-4xl font-black text-white font-sans">
              {totalExercises}
            </span>
          </div>

          <div className="bg-[#181818] border border-white/10 rounded-2xl p-6">
            <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold block mb-1">
              Minutes
            </span>
            <span className="text-3xl sm:text-4xl font-black text-[#ccff00] font-sans">
              {totalMinutes}
            </span>
          </div>

          <div className="bg-[#181818] border border-white/10 rounded-2xl p-6">
            <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold block mb-1">
              Calories
            </span>
            <span className="text-3xl sm:text-4xl font-black text-white font-sans">
              {totalCalories}
            </span>
          </div>
        </div>

        {/* Tabs & Sort By */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === "today"
                  ? "bg-[#ccff00] text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({todayPlan.length})
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved ({savedList.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-bold uppercase">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortCriteria)}
              className="bg-[#181818] border border-white/20 text-white rounded-lg px-3 py-1.5 text-xs font-bold uppercase focus:outline-none focus:border-[#ccff00]"
            >
              <option value="duration">Duration ⌄</option>
              <option value="calories">Calories ⌄</option>
              <option value="rating">Rating ⌄</option>
            </select>
          </div>
        </div>

        {/* List / Empty State */}
        {currentList.length === 0 ? (
          <div className="text-center py-24 bg-[#141414] border border-dashed border-white/10 rounded-3xl space-y-4">
            <h3 className="text-xl font-black uppercase tracking-wider text-white">
              NOTHING HERE YET
            </h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Browse the library and add a lift to get today moving.
            </p>
            <div className="pt-2">
              <Link
                href="/#library"
                className="inline-block px-6 py-3 bg-[#ccff00] text-black font-black uppercase text-xs rounded-xl shadow"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {currentList.map((item) => {
              const id = getItemId(item);
              const name = (
                item.name ||
                item.workoutName ||
                item.title ||
                "WORKOUT"
              ).toUpperCase();
              const isCompleted = Boolean(item.completed);

              return (
                <div
                  key={id}
                  className={`bg-[#181818] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all ${
                    isCompleted ? "opacity-50 bg-[#121212]" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#242424] shrink-0">
                      <Image
                        src={item.image}
                        alt={name}
                        fill
                        unoptimized
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4
                        className={`text-base sm:text-lg font-black uppercase font-sans ${isCompleted ? "line-through text-gray-500" : "text-white"}`}
                      >
                        {name}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium">
                        {item.equipment || "Medicine Ball"}
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-gray-400 font-semibold mt-2">
                        <span>⏱ {item.duration || 25} min</span>
                        <span>
                          🔥 {item.caloriesBurned || item.calories || 180} kcal
                        </span>
                        <span className="text-amber-400">
                          ★ {item.rating || 4.8}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <Link
                      href={`/book/${id}`}
                      className="px-3.5 py-1.5 rounded-lg border border-white/20 hover:border-white text-xs font-bold uppercase text-white"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        onClick={() => markAsDone(id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5 transition-all ${
                          isCompleted
                            ? "bg-green-600 text-white"
                            : "bg-[#ccff00]/10 border border-[#ccff00]/40 text-[#ccff00] hover:bg-[#ccff00] hover:text-black"
                        }`}
                      >
                        ✓ Mark as Done
                      </button>
                    )}

                    <button
                      onClick={() =>
                        activeTab === "today"
                          ? removeFromTodayPlan(id)
                          : removeFromSavedList(id)
                      }
                      title="Remove"
                      className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center text-xs font-black"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
