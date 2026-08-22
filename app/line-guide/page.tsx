import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";

const slides = [
  { width: 1493, height: 1007 },
  { width: 1500, height: 1005 },
  { width: 1498, height: 1006 },
  { width: 1498, height: 1008 },
  { width: 1495, height: 1007 },
  { width: 1496, height: 1006 },
  { width: 1494, height: 1009 },
];

export default function LineGuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-sm text-black/40">
            <Link href="/" className="hover:underline">
              หน้าหลัก
            </Link>{" "}
            / คู่มือการใช้งานไลน์
          </p>
          <h1 className="mt-4 text-3xl font-bold">
            คู่มือการใช้งาน LINE Official Account &quot;HeatSafe Khon Kaen&quot;
          </h1>
          <p className="mt-2 text-sm text-black/60">
            ครบทุกข้อมูล รู้ทันภัยร้อน เพื่อชาวขอนแก่น ปลอดภัยไว้ก่อน
          </p>

          <div className="mt-6">
            <Link
              href="https://line.me/R/ti/p/@034rqfnj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-green-700 bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-800"
            >
              เพิ่มเพื่อน Line OA HEATSAFE
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            {slides.map((slide, i) => (
              <Image
                key={i}
                src={`/line-guide/slide-${i + 1}-v2.png`}
                alt={`คู่มือการใช้งาน LINE Official Account HeatSafe Khon Kaen หน้า ${i + 1}`}
                width={slide.width}
                height={slide.height}
                className="w-full h-auto rounded-lg border border-black/10"
              />
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-green-700/20 bg-green-50/70 p-6 text-center">
            <p className="text-sm text-green-900">
              ใช้งาน LINE OA &quot;HeatSafe Khon Kaen&quot; แล้ว? ช่วยประเมินความพึงพอใจเพื่อพัฒนาต่อยอด
            </p>
            <Link
              href="/appendix-a/line-satisfaction"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-800"
            >
              ทำแบบประเมินความพึงพอใจ
            </Link>
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
