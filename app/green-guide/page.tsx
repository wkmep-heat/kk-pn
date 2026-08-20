import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";

const pageCount = 34;

export default function GreenGuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-sm text-black/40">
            <Link href="/" className="hover:underline">
              หน้าหลัก
            </Link>{" "}
            / คู่มือการเพิ่มพื้นที่สีเขียว
          </p>
          <h1 className="mt-4 text-3xl font-bold">คู่มือการเพิ่มพื้นที่สีเขียว เทศบาลนครขอนแก่น</h1>
          <p className="mt-2 text-sm text-black/60">
            พัฒนาต่อยอดจากผลการศึกษาโครงงาน GeoHeat Khon Kaen
          </p>

          <div className="mt-8 flex flex-col gap-6">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <Image
                key={page}
                src={`/green-guide/page-${page}.jpg`}
                alt={`คู่มือการเพิ่มพื้นที่สีเขียว เทศบาลนครขอนแก่น หน้า ${page}`}
                width={1241}
                height={1755}
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
