import Link from "next/link";

export default function PageNav({
  prev,
  next,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6 text-sm">
      {prev ? (
        <Link
          href={prev.href}
          className="rounded-md border border-black/10 px-4 py-2 hover:border-black/30"
        >
          ← {prev.label}
        </Link>
      ) : (
        <span />
      )}

      <Link href="/appendix-a" className="text-black/50 hover:underline">
        กลับหน้ารวมภาคผนวก ก
      </Link>

      {next ? (
        <Link
          href={next.href}
          className="rounded-md border border-black/10 px-4 py-2 hover:border-black/30"
        >
          {next.label} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
