import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 bg-[#0f0f0f] text-white space-y-4">
      <span className="text-7xl font-black text-[#ccff00] font-sans">404</span>
      <h2 className="text-2xl font-black uppercase tracking-tight">
        WORKOUT ROUTE NOT FOUND
      </h2>
      <p className="text-xs text-gray-400 max-w-sm">
        The lift, routine log, or page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#ccff00] text-black font-black uppercase text-xs rounded-xl shadow-lg"
      >
        Return to Home
      </Link>
    </div>
  );
}
