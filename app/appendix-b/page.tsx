import Link from "next/link";

export default function AppendixB() {
  return (
    <div className="fixed inset-0">
      <iframe
        src="https://online.pubhtml5.com/jqacy/qoxv/"
        title="วิธีการดำเนินงาน E-Book"
        className="h-full w-full border-0"
        allowFullScreen
      />

      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border-2 border-green-700 bg-white px-4 py-1.5 text-sm font-medium text-green-800 shadow hover:bg-green-50 transition-colors"
      >
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}
