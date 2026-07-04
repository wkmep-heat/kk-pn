"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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

function OpenQuestions({
  questions,
  namePrefix,
}: {
  questions: string[];
  namePrefix: string;
}) {
  return (
    <ol className="mt-4 space-y-4 list-decimal list-inside">
      {questions.map((q, index) => (
        <li key={q}>
          {q}
          <textarea
            rows={2}
            name={`${namePrefix}q${index}`}
            className="mt-2 w-full resize-y border-b border-dotted border-black/40 bg-transparent px-1 focus:outline-none focus:border-solid focus:border-black/60"
          />
        </li>
      ))}
    </ol>
  );
}

function FieldError() {
  return (
    <p className="mt-1 text-xs font-medium text-red-600">
      กรุณากรอกข้อมูลข้อนี้ก่อนส่งแบบสัมภาษณ์
    </p>
  );
}

type SubmitStatus = "idle" | "submitting" | "error";

function getInvalidKeys(form: HTMLFormElement): Set<string> {
  const fd = new FormData(form);
  const invalid = new Set<string>();

  generalInfoFields.forEach((_, i) => {
    if (!String(fd.get(`g${i}`) ?? "").trim()) invalid.add(`g${i}`);
  });

  return invalid;
}

function buildPayload(form: HTMLFormElement) {
  const fd = new FormData(form);

  const generalInfo = generalInfoFields.map((field, i) => ({
    field,
    value: (fd.get(`g${i}`) as string) ?? "",
  }));

  const toAnswers = (questions: string[], namePrefix: string) =>
    questions.map((question, i) => ({
      question,
      answer: (fd.get(`${namePrefix}q${i}`) as string) ?? "",
    }));

  return {
    generalInfo,
    section2: toAnswers(section2Questions, "s2"),
    section3: toAnswers(section3Questions, "s3"),
    section4: toAnswers(section4Questions, "s4"),
  };
}

export default function Interview() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [invalidKeys, setInvalidKeys] = useState<Set<string>>(new Set());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const invalid = getInvalidKeys(form);
    if (invalid.size > 0) {
      setInvalidKeys(invalid);
      const firstInvalid = form.querySelector(`[data-field="${[...invalid][0]}"]`);
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setInvalidKeys(new Set());

    setStatus("submitting");
    try {
      const payload = buildPayload(form);
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit failed");
      router.push("/?submitted=interview");
    } catch {
      setStatus("error");
    }
  }

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
          <Link
            href="/"
            className="mt-3 inline-flex items-center gap-1 rounded-full border-2 border-green-700 px-4 py-1.5 text-sm font-medium text-green-800 hover:bg-green-50 transition-colors"
          >
            ← กลับหน้าหลัก
          </Link>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold">
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

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-bold">
                ส่วนที่ 1 ข้อมูลทั่วไปของผู้ให้สัมภาษณ์
              </h3>

              <div className="mt-4 space-y-4">
                {generalInfoFields.map((field, index) => {
                  const key = `g${index}`;
                  const invalid = invalidKeys.has(key);
                  return (
                    <div key={field} data-field={key}>
                      <p className={invalid ? "text-red-600 font-medium" : undefined}>{field}</p>
                      <input
                        type="text"
                        name={key}
                        className={`mt-1 w-full border-b bg-transparent px-1 focus:outline-none focus:border-solid focus:border-black/60 ${
                          invalid ? "border-red-400" : "border-dotted border-black/40"
                        }`}
                      />
                      {invalid && <FieldError />}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-bold">
                ส่วนที่ 2 ประเด็นคำถามสำหรับผู้เชี่ยวชาญด้านภูมิสารสนเทศ/GIS
              </h3>

              <OpenQuestions questions={section2Questions} namePrefix="s2" />
            </div>

            <div>
              <h3 className="font-bold">
                ส่วนที่ 3 ประเด็นคำถามสำหรับผู้เกี่ยวข้องด้านผังเมือง/เทศบาล/สำนักการช่าง
              </h3>

              <OpenQuestions questions={section3Questions} namePrefix="s3" />
            </div>

            <div>
              <h3 className="font-bold">
                ส่วนที่ 4 ประเด็นคำถามสำหรับผู้เชี่ยวชาญด้านอุตุนิยมวิทยา/ภัยพิบัติ
              </h3>

              <OpenQuestions questions={section4Questions} namePrefix="s4" />
            </div>

            <div className="flex flex-col items-center gap-3 border-t border-black/10 pt-6">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50"
              >
                {status === "submitting" ? "กำลังส่งข้อมูล..." : "ส่งแบบสัมภาษณ์"}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-700">
                  เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง
                </p>
              )}
            </div>
            </form>
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
