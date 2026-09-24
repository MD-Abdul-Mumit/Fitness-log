import Image from "next/image";
import logoImg from "@/assets/logo.png";
import Link from "next/link";

export default function Footer(): React.JSX.Element {
  return (
    <footer className="bg-[#0b0b0b] border-t border-white/10 py-10 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoImg}
            alt="FitLog"
            width={22}
            height={22}
            className="opacity-80"
          />
          <span className="font-black text-sm tracking-widest text-white uppercase">
            FITLOG
          </span>
        </Link>
        <p className="text-center sm:text-right text-gray-400 font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
