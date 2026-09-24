import Link from "next/link";
import Image from "next/image";
import { WorkoutItem } from "@/types/book";
import React from "react";

export default function WorkoutCard({
  item,
}: {
  item: WorkoutItem;
}): React.JSX.Element {
  const id = item.id || item._id || item.bookId || "1";
  const name = (
    item.name ||
    item.workoutName ||
    item.title ||
    "WORKOUT"
  ).toUpperCase();
  const equipment = item.equipment || "Barbell, Bench";
  const duration = item.duration || 25;
  const calories = item.caloriesBurned || item.calories || 180;
  const rating = item.rating || 4.8;
  const tags =
    item.tags || (item.category ? [item.category] : ["CHEST", "ARMS"]);

  return (
    <Link
      href={`/book/${id}`}
      className="group bg-[#181818] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#ccff00]/60 transition-all duration-300 hover:-translate-y-1"
    >
      <div>
        <div className="relative h-48 w-full bg-[#202020] overflow-hidden">
          <Image
            src={item.image}
            alt={name}
            fill
            unoptimized
            referrerPolicy="no-referrer"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-[#242424] text-[#ccff00] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-base font-black text-white uppercase font-sans tracking-wide line-clamp-1 mb-1 group-hover:text-[#ccff00] transition-colors">
            {name}
          </h3>
          <p className="text-xs text-gray-400 font-medium mb-4 line-clamp-1">
            {equipment}
          </p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-white/5 bg-[#141414] flex items-center justify-between text-xs text-gray-400 font-semibold">
        <span className="flex items-center gap-1">⏱ {duration} min</span>
        <span className="flex items-center gap-1">🔥 {calories} kcal</span>
        <span className="flex items-center gap-1 text-amber-400">
          ★ {rating}
        </span>
      </div>
    </Link>
  );
}
