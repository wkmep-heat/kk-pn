import Link from "next/link";
import { Suspense } from "react";
import SiteHeader from "./_components/SiteHeader";
import SubmittedNotice from "./_components/SubmittedNotice";

const appendices = [
  {
    code: "ก",
    title: "ภาคผนวก ก",
    subtitle: "แบบสอบถาม",
    href: "/appendix-a",
  },
  {
    code: "ข",
    title: "ภาคผนวก ข",
    subtitle: "วิธีการดำเนินงาน",
    href: null,
  },
  {
    code: "ค",
    title: "ภาคผนวก ค",
    subtitle: "ภาพถ่ายดาวเทียม",
    href: null,
  },
  {
    code: "ง",
    title: "ภาคผนวก ง",
    subtitle: "อินโฟกราฟิกสรุปเนื้อหา",
    href: "/appendix-d",
  },
];

const tools = [
  { label: "SMART MAP", href: "/smart-map" },
  { label: "Line OA HEATSAFE", href: "https://line.me/R/ti/p/@034rqfnj" },
  { label: "WebApp HEATSAFE", href: "/webapp-heatsafe" },
  { label: "GEO TRAVEL", href: "/geo-travel" },
  { label: "เช็คสภาพอากาศ", href: "/weather-check" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <Suspense fallback={null}>
        <SubmittedNotice />
      </Suspense>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">ภาคผนวก</h1>
          <p className="mt-4 text-black/60">
            รวบรวมเอกสารและข้อมูลประกอบ เนื้อหาจะทยอยเพิ่มเติมภายหลัง
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {appendices.map((item) => {
              const card = (
                <div className="rounded-[2rem] bg-white border-2 border-green-700 text-green-800 p-6 text-center h-full flex flex-col items-center justify-center gap-1 transition-colors hover:bg-green-50">
                  <div className="font-bold">{item.title}</div>
                  <div className="text-sm text-green-700/80">{item.subtitle}</div>
                </div>
              );

              return item.href ? (
                <Link key={item.code} href={item.href} className="rounded-[2rem]">
                  {card}
                </Link>
              ) : (
                <div key={item.code}>{card}</div>
              );
            })}
          </div>

          <p className="mt-3 text-center text-xs text-black/40">
            เนื้อหาจะเพิ่มเติมภายหลัง
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-6 pt-10 pb-20">
          <p className="text-center text-sm font-medium text-black/60 mb-4">
            เครื่องมือและข้อมูลเพิ่มเติม
          </p>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-5">
            {tools.map((tool) => (
              <Link
                key={tool.label}
                href={tool.href}
                className="rounded-full border-2 border-green-700 text-green-800 px-4 py-3 text-center text-sm font-medium hover:bg-green-50 transition-colors"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-xs text-black/40">
          © {new Date().getFullYear()} ภาคผนวก
        </div>
      </footer>
    </>
  );
}
