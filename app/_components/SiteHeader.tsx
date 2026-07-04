import Link from "next/link";

const navItems = [
  { label: "หน้าหลัก", href: "/" },
  { label: "ก", href: "/appendix-a" },
  { label: "ข", href: null },
  { label: "ค", href: null },
  { label: "ง", href: "/appendix-d" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-black/10">
      <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          ภาคผนวก
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {navItems.map((item) =>
            item.href ? (
              <Link key={item.label} href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span key={item.label} className="text-black/30 cursor-not-allowed">
                {item.label}
              </span>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
