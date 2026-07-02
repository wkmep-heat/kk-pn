const appendices = [
  { code: "ก", title: "ภาคผนวก ก" },
  { code: "ข", title: "ภาคผนวก ข" },
  { code: "ค", title: "ภาคผนวก ค" },
];

export default function Home() {
  return (
    <>
      <header className="border-b border-black/10">
        <div className="mx-auto max-w-4xl px-6 py-5">
          <span className="text-lg font-semibold">ภาคผนวก</span>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">ภาคผนวก</h1>
          <p className="mt-4 text-black/60">
            รวบรวมเอกสารและข้อมูลประกอบ เนื้อหาจะทยอยเพิ่มเติมภายหลัง
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-6 pb-20">
          <div className="grid gap-4 sm:grid-cols-3">
            {appendices.map((item) => (
              <div
                key={item.code}
                className="rounded-lg border border-black/10 p-6 text-center"
              >
                <div className="text-2xl font-bold">{item.code}</div>
                <div className="mt-1 text-sm text-black/60">{item.title}</div>
                <div className="mt-4 text-xs text-black/40">
                  เนื้อหาจะเพิ่มเติมภายหลัง
                </div>
              </div>
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
