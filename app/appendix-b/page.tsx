import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";

export default function AppendixB() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1 flex flex-col">
        <div className="px-6 pt-6">
          <p className="text-sm text-black/40">
            <Link href="/" className="hover:underline">
              ภาคผนวก
            </Link>{" "}
            / ข
          </p>
          <Link
            href="/"
            className="mt-3 inline-flex items-center gap-1 rounded-full border-2 border-green-700 px-4 py-1.5 text-sm font-medium text-green-800 hover:bg-green-50 transition-colors"
          >
            ← กลับหน้าหลัก
          </Link>
        </div>

        <div className="mt-4 flex-1 min-h-[85vh]">
          <iframe
            src="https://online.pubhtml5.com/jqacy/qoxv/"
            title="วิธีการดำเนินงาน E-Book"
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      </main>
    </>
  );
}
