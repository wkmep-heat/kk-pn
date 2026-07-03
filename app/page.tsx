import Link from "next/link";
import { Suspense } from "react";
import SiteHeader from "./_components/SiteHeader";
import SubmittedNotice from "./_components/SubmittedNotice";

const appendices = [
  { code: "ก", title: "ภาคผนวก ก", href: "/appendix-a" },
  { code: "ข", title: "ภาคผนวก ข", href: null },
  { code: "ค", title: "ภาคผนวก ค", href: null },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <Suspense fallback={null}>
        <SubmittedNotice />
      </Suspense>

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">ภาคผนวก</h1>
          <p className="mt-4 text-black/60">
            รวบรวมเอกสารและข้อมูลประกอบ เนื้อหาจะทยอยเพิ่มเติมภายหลัง
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-6 pb-20">
          <div className="grid gap-4 sm:grid-cols-3">
            {appendices.map((item) => {
              const card = (
                <div className="rounded-lg border border-black/10 p-6 text-center h-full">
                  <div className="text-2xl font-bold">{item.code}</div>
                  <div className="mt-1 text-sm text-black/60">{item.title}</div>
                  <div className="mt-4 text-xs text-black/40">
                    {item.href ? "ดูเนื้อหา" : "เนื้อหาจะเพิ่มเติมภายหลัง"}
                  </div>
                </div>
              );

              return item.href ? (
                <Link key={item.code} href={item.href} className="hover:border-black/30 rounded-lg">
                  {card}
                </Link>
              ) : (
                <div key={item.code}>{card}</div>
              );
            })}
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
