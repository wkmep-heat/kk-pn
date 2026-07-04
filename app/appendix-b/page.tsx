import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";

export default function AppendixB() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16">
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
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold">
            ภาคผนวก ข วิธีการดำเนินงาน
          </h1>

          <div className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/10 sm:aspect-video">
            <iframe
              src="https://online.pubhtml5.com/jqacy/qoxv/"
              title="วิธีการดำเนินงาน E-Book"
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10">
        <div className="mx-auto max-w-4xl px-6 py-6 text-center text-xs text-black/40">
          © {new Date().getFullYear()} ภาคผนวก
        </div>
      </footer>
    </>
  );
}
