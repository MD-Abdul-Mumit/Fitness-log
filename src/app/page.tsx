import Link from "next/link";
import Image from "next/image";
import bannerImg from "@/assets/banner.png";
import WorkoutCard from "@/components/shared/BookCard";
import { WorkoutItem } from "@/types/book";

async function getWorkouts(): Promise<WorkoutItem[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch API");
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch {
    // Fallback if network fails
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "public", "workouts.json");
    if (fs.existsSync(filePath)) {
      const local = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(local);
    }
    return [];
  }
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white ">
      {/* Hero / Banner */}
      <section className="max-w-7xl bg-[#222630] mx-auto px-4 sm:px-6 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center rounded-3xl overflow-hidden">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">
            WORKOUT LIBRARY
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none font-sans">
            TRAIN WITH INTENT. <br />
            LOG EVERY SET.
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="pt-2">
            <Link
              href="#library"
              className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black uppercase text-sm tracking-wider px-7 py-4 rounded-xl shadow-lg transition-all"
            >
              BROWSE WORKOUTS
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md h-[340px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={bannerImg}
              alt="FitLog Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* The Library Section */}
      <section
        id="library"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10"
      >
        <div className="mb-10 text-left">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-white font-sans">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((item, idx) => (
            <WorkoutCard
              key={item.id || item._id || item.bookId || idx}
              item={item}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
