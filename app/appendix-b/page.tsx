import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";

const pageCount = 24;

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

          <div className="mt-8 flex flex-col gap-6">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <Image
                key={page}
                src={`/appendix-b/page-${page}.png`}
                alt={`ภาคผนวก ข วิธีการดำเนินงาน หน้า ${page}`}
                width={1414}
                height={2000}
                className="w-full h-auto rounded-lg border border-black/10"
              />
            ))}
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
