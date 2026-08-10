import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";

export default function GreenGuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <p className="text-sm text-black/40">
            <Link href="/" className="hover:underline">
              หน้าหลัก
            </Link>{" "}
            / คู่มือการเพิ่มพื้นที่สีเขียว
          </p>
          <h1 className="mt-4 text-3xl font-bold">คู่มือการเพิ่มพื้นที่สีเขียว</h1>

          <div className="mt-8 space-y-6 rounded-[2rem] border border-green-700/20 bg-green-50/70 p-6">
            <div>
              <h2 className="text-xl font-semibold text-green-900">1. เพิ่มพื้นที่สีเขียวในเขตเทศบาล</h2>
              <p className="mt-2 text-sm text-black/70">
                เริ่มจากวางแผนพื้นที่ว่างให้กลายเป็นสวนสาธารณะหรือสวนหย่อมขนาดเล็ก โดยเน้นพื้นที่ที่เข้าถึงได้ง่ายและมีคนใช้งานสูง
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-900">2. ปลูกต้นไม้ริมถนนและทางเท้า</h2>
              <p className="mt-2 text-sm text-black/70">
                ต้นไม้ริมถนนช่วยเพิ่มร่มเงา ลดอุณหภูมิ และปรับปรุงอากาศ ควรเลือกพันธุ์ไม้ทนร้อนและดูแลรักษาง่าย
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-900">3. สร้างชุมชนร่วมปลูกและดูแล</h2>
              <p className="mt-2 text-sm text-black/70">
                เชิญชวนประชาชนเข้าร่วมโครงการปลูกต้นไม้และดูแลสวนสาธารณะ เพื่อให้ผู้คนรู้สึกเป็นเจ้าของพื้นที่
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-900">4. ใช้วัสดุและระบบน้ำอย่างยั่งยืน</h2>
              <p className="mt-2 text-sm text-black/70">
                ออกแบบระบบรดน้ำด้วยน้ำรีไซเคิล และใช้วัสดุปูพื้นที่ซึมน้ำได้ เพื่อลดการใช้น้ำและป้องกันน้ำท่วม
              </p>
            </div>
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
