import Link from "next/link";

export default function GeoTravel() {
  return (
    <main className="relative flex-1 flex flex-col">
      <Link
        href="/"
        className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full border-2 border-green-700 bg-white px-4 py-1.5 text-sm font-medium text-green-800 shadow hover:bg-green-50 transition-colors"
      >
        ← กลับหน้าหลัก
      </Link>

      <iframe
        src="https://heat-safe-cyan.vercel.app/?traveltime"
        title="GEO TRAVEL"
        className="w-full flex-1 border-0"
      />
    </main>
  );
}
