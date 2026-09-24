"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { WorkoutItem } from "@/types/book";
import { useWorkout } from "@/context/WorkoutContext";

export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const resolved = use(params);
  const [workout, setWorkout] = useState<WorkoutItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToTodayPlan, addToSavedList, isPlanFull } = useWorkout();

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/fitlog/${resolved.bookId}`,
        );
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        setWorkout(json.data || json);
      } catch {
        const allRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fitlog`);
        const list = await allRes.json();
        const dataArr: WorkoutItem[] = Array.isArray(list)
          ? list
          : list.data || [];
        const found = dataArr.find(
          (w) => String(w.id || w.bookId || w._id) === resolved.bookId,
        );
        setWorkout(found || null);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [resolved.bookId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-[#ccff00] font-black uppercase tracking-widest text-sm">
        Loading workout details…
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white space-y-4">
        <h2 className="text-2xl font-black uppercase">Workout Not Found</h2>
        <Link
          href="/"
          className="px-5 py-2 bg-[#ccff00] text-black font-bold text-xs rounded uppercase"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  const name = (
    workout.name ||
    workout.workoutName ||
    workout.title ||
    "WORKOUT"
  ).toUpperCase();
  const subtitle =
    workout.description ||
    workout.subtitle ||
    "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.";
  const tags =
    workout.tags || (workout.category ? [workout.category] : ["Chest", "Arms"]);
  const instructions =
    workout.instructions && workout.instructions.length > 0
      ? workout.instructions
      : [
          "Lie flat on the bench with eyes directly under the bar.",
          "Grip with wrists stacked and pull shoulder blades tightly together.",
          "Lower the weight smoothly to your mid-sternum.",
          "Press up explosively to lockout without shrugging shoulders.",
        ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase font-bold text-gray-400 hover:text-white mb-8"
        >
          ← Back to Library
        </Link>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#161616] border border-white/10 rounded-3xl p-6 sm:p-10">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden bg-[#202020]">
            <Image
              src={workout.image}
              alt={name}
              fill
              unoptimized
              referrerPolicy="no-referrer"
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column: Information */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-sans uppercase text-white mb-2">
                  {name}
                </h1>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {subtitle}
                </p>
              </div>

              {/* Category Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-[#242424] text-[#ccff00] text-xs font-black uppercase tracking-wider px-3 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Key Specs Table Panel */}
              <div className="bg-[#1c1c1c] border border-white/5 rounded-xl p-4 sm:p-6 divide-y divide-white/5 text-xs sm:text-sm">
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-400 uppercase font-bold">
                    Equipment
                  </span>
                  <span className="text-white font-semibold">
                    {workout.equipment || "Barbell, Bench"}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-400 uppercase font-bold">
                    Difficulty
                  </span>
                  <span className="text-white font-semibold">
                    {workout.difficulty || "Intermediate"}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-400 uppercase font-bold">
                    Sets
                  </span>
                  <span className="text-white font-semibold">
                    {workout.sets || "4"}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-400 uppercase font-bold">
                    Reps
                  </span>
                  <span className="text-white font-semibold">
                    {workout.reps || "6-8"}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-400 uppercase font-bold">
                    Duration
                  </span>
                  <span className="text-white font-semibold">
                    {workout.duration || 25} min
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-400 uppercase font-bold">
                    Calories
                  </span>
                  <span className="text-white font-semibold">
                    {workout.caloriesBurned || workout.calories || 180} kcal
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-400 uppercase font-bold">
                    Rating
                  </span>
                  <span className="text-amber-400 font-bold">
                    ★ {workout.rating || 4.8}
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-[#ccff00] mb-3">
                  INSTRUCTIONS
                </h4>
                <ol className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                  {instructions.slice(0, 4).map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => addToTodayPlan(workout)}
                disabled={isPlanFull}
                className={`flex-1 py-3.5 px-6 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isPlanFull
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-lg"
                }`}
              >
                <span>➕ Add to today&apos;s plan</span>
              </button>

              <button
                onClick={() => addToSavedList(workout)}
                className="py-3.5 px-6 rounded-xl border border-white/30 hover:border-white text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>🔖 Save for later</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
