import Link from "next/link";
import PageNav from "../_components/PageNav";
import SiteHeader from "../../_components/SiteHeader";

const generalInfoFields = [
  "ชื่อ-สกุล",
  "ตำแหน่ง",
  "หน่วยงาน",
  "วันที่สัมภาษณ์",
  "สถานที่สัมภาษณ์",
  "ผู้สัมภาษณ์",
];

const section2Questions = [
  "การใช้ข้อมูลดาวเทียม Landsat เพื่อวิเคราะห์อุณหภูมิพื้นผิวเมือง มีความเหมาะสมต่อพื้นที่เทศบาลนครขอนแก่นหรือไม่ เพราะเหตุใด",
  "ค่า LST สามารถใช้สะท้อนปัญหาความร้อนเมืองในระดับพื้นที่ได้อย่างไร",
  "การใช้ค่า NDVI และ NDBI ร่วมกับ LST มีประโยชน์ต่อการวิเคราะห์พื้นที่ร้อนเมืองอย่างไร",
  "การประมวลผลผ่าน Google Earth Engine มีข้อดีและข้อจำกัดอย่างไร",
  "การใช้ QGIS เพื่อซ้อนทับข้อมูล LST, NDVI, NDBI และข้อมูลภาคสนามควรดำเนินการอย่างไรจึงจะน่าเชื่อถือ",
  "ข้อเสนอแนะต่อการจัดทำ Smart Map สำหรับประชาชน",
];

const section3Questions = [
  "พื้นที่ใดในเขตเทศบาลนครขอนแก่นที่พบปัญหาความร้อน พื้นที่ไม่มีร่มเงา หรือพื้นดาดแข็งมากเป็นพิเศษ",
  "พื้นที่ใดมีปัญหาเสี่ยงซ้ำซ้อน เช่น ร้อนร่วมกับน้ำท่วม ฝุ่น รถติด หรือประชาชนใช้งานหนาแน่น",
  "หน่วยงานมีข้อมูลด้านพื้นที่สีเขียว จุดน้ำท่วม จุดระบายน้ำ หรือจุดเสี่ยงเมืองที่สามารถใช้ร่วมกับข้อมูล GIS หรือไม่",
  "Smart Map ความร้อนเมืองสามารถนำไปใช้สนับสนุนการทำงานของเทศบาลได้อย่างไร",
  "ข้อเสนอเชิงนโยบายในการลดความร้อนเมืองควรเป็นอย่างไร",
];

const section4Questions = [
  "แนวโน้มอุณหภูมิในเขตเมืองขอนแก่นมีลักษณะอย่างไร",
  "ปัจจัยใดที่ทำให้พื้นที่เมืองมีความร้อนสูงกว่าพื้นที่อื่น",
  "ข้อมูลอุตุนิยมวิทยาใดควรใช้ประกอบการวิเคราะห์ความร้อนเมือง",
  "ความร้อนเมืองอาจเชื่อมโยงกับภัยพิบัติเมืองด้านใดบ้าง เช่น ฝนตกหนัก น้ำท่วมขัง หรือฝุ่นละออง",
  "ประชาชนควรได้รับข้อมูลแจ้งเตือนหรือคำแนะนำเกี่ยวกับความร้อนเมืองในลักษณะใด",
];

function OpenQuestions({ questions }: { questions: string[] }) {
  return (
    <ol className="mt-4 space-y-4 list-decimal list-inside">
      {questions.map((q) => (
        <li key={q}>
          {q}
          <textarea
            rows={2}
            className="mt-2 w-full resize-y border-b border-dotted border-black/40 bg-transparent px-1 focus:outline-none focus:border-solid focus:border-black/60"
          />
        </li>
      ))}
    </ol>
  );
}

export default function Interview() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-sm text-black/40">
            <Link href="/" className="hover:underline">
              ภาคผนวก
            </Link>{" "}
            /{" "}
            <Link href="/appendix-a" className="hover:underline">
              ก
            </Link>{" "}
            / แบบสัมภาษณ์
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
            2. แบบสัมภาษณ์ผู้รู้และผู้เกี่ยวข้อง
          </h1>

          <div className="mt-8 space-y-6 text-black/80 leading-relaxed">
            <h2 className="text-xl font-bold text-center">
              แบบสัมภาษณ์ผู้รู้และผู้เกี่ยวข้อง
            </h2>

            <div>
              <h3 className="font-semibold">คำชี้แจง</h3>
              <p className="mt-2">
                แบบสัมภาษณ์ฉบับนี้ใช้สำหรับเก็บข้อมูลจากผู้รู้และผู้เกี่ยวข้อง
                ได้แก่ ผู้เชี่ยวชาญด้านภูมิสารสนเทศ อุตุนิยมวิทยา ผังเมือง
                การป้องกันและบรรเทาสาธารณภัย สำนักการช่าง เทศบาลนครขอนแก่น
                และหน่วยงานที่เกี่ยวข้อง เพื่อประกอบการจัดทำโครงงาน GeoHeat
                Khon Kaen
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                ส่วนที่ 1 ข้อมูลทั่วไปของผู้ให้สัมภาษณ์
              </h3>

              <div className="mt-4 space-y-4">
                {generalInfoFields.map((field) => (
                  <div key={field}>
                    <p>{field}</p>
                    <input
                      type="text"
                      className="mt-1 w-full border-b border-dotted border-black/40 bg-transparent px-1 focus:outline-none focus:border-solid focus:border-black/60"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold">
                ส่วนที่ 2 ประเด็นคำถามสำหรับผู้เชี่ยวชาญด้านภูมิสารสนเทศ/GIS
              </h3>

              <OpenQuestions questions={section2Questions} />
            </div>

            <div>
              <h3 className="font-bold">
                ส่วนที่ 3 ประเด็นคำถามสำหรับผู้เกี่ยวข้องด้านผังเมือง/เทศบาล/สำนักการช่าง
              </h3>

              <OpenQuestions questions={section3Questions} />
            </div>

            <div>
              <h3 className="font-bold">
                ส่วนที่ 4 ประเด็นคำถามสำหรับผู้เชี่ยวชาญด้านอุตุนิยมวิทยา/ภัยพิบัติ
              </h3>

              <OpenQuestions questions={section4Questions} />
            </div>

            <PageNav
              prev={{ href: "/appendix-a/questionnaire", label: "แบบสอบถามประชาชน" }}
              next={{ href: "/appendix-a/field-survey", label: "แบบบันทึกการสำรวจภาคสนาม" }}
            />
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
