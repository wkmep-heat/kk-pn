import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";

const items = [
  {
    number: 1,
    title: "แบบสอบถามประชาชน",
    href: "/appendix-a/questionnaire",
  },
  {
    number: 2,
    title: "แบบสัมภาษณ์ผู้รู้และผู้เกี่ยวข้อง",
    href: "/appendix-a/interview",
  },
  {
    number: 3,
    title: "แบบบันทึกการสำรวจภาคสนาม",
    href: "/appendix-a/field-survey",
  },
];

export default function AppendixA() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-sm text-black/40">
            <Link href="/" className="hover:underline">
              ภาคผนวก
            </Link>{" "}
            / ก
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold">ภาคผนวก ก</h1>

          <div className="mt-8 flex flex-col gap-4">
            {items.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="rounded-lg border border-black/10 p-6 hover:border-black/30 transition-colors"
              >
                <span className="font-medium">
                  {item.number}. {item.title}
                </span>
              </Link>
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
