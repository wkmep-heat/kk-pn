"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import SiteHeader from "../../_components/SiteHeader";

const generalQuestions = [
  {
    text: "เพศ",
    options: ["ชาย", "หญิง", "ไม่ประสงค์ระบุ"],
  },
  {
    text: "ช่วงอายุ",
    options: [
      "ต่ำกว่า 15 ปี",
      "15–20 ปี",
      "21–30 ปี",
      "31–40 ปี",
      "41–50 ปี",
      "51–60 ปี",
      "มากกว่า 60 ปี",
    ],
  },
  {
    text: "สถานะของผู้ตอบแบบประเมิน",
    options: [
      "นักเรียน",
      "ผู้ปกครอง",
      "ครู/บุคลากรทางการศึกษา",
      "เจ้าหน้าที่หน่วยงานราชการ",
      "ประชาชนทั่วไป",
      "อื่น ๆ ระบุ ……………………………………………..",
    ],
  },
  {
    text: "ระยะเวลาที่ท่านใช้งาน LINE Official Account “HeatSafe Khon Kaen”",
    options: [
      "ยังไม่เคยใช้งาน",
      "น้อยกว่า 1 สัปดาห์",
      "1–4 สัปดาห์",
      "มากกว่า 1 เดือน",
    ],
  },
];

const menuOptions = [
  "Local Weather (สภาพอากาศท้องถิ่น)",
  "คู่มือการใช้งาน (Instruction Manual)",
  "Smart Map (แผนที่อัจฉริยะ)",
  "แจ้งเตือนภัย (Share Alert)",
  "GEO Travel Map",
  "ยังไม่เคยใช้งานเมนูใดเลย",
];

const scaleLevels = [5, 4, 3, 2, 1];
const scaleLabels = [
  "5 = มากที่สุด",
  "4 = มาก",
  "3 = ปานกลาง",
  "2 = น้อย",
  "1 = น้อยที่สุด",
];

const satisfactionStatements = [
  "ท่านสามารถเพิ่มเพื่อน LINE OA “HeatSafe Khon Kaen” ได้อย่างง่ายดาย",
  "เมนูและการใช้งานภายใน LINE OA มีความชัดเจน เข้าใจง่าย",
  "ข้อมูลสภาพอากาศท้องถิ่น (Local Weather) มีความถูกต้องและเป็นประโยชน์",
  "เมนู Smart Map (แผนที่อัจฉริยะ) ช่วยให้ทราบพื้นที่เสี่ยงความร้อนได้ชัดเจน",
  "เมนูแจ้งเตือนภัย (Share Alert) ใช้งานง่ายและสะดวกในการแจ้งเหตุ",
  "เมนู GEO Travel Map ช่วยวางแผนการเดินทางได้อย่างปลอดภัยมากขึ้น",
  "ความเร็วในการตอบสนอง/โหลดข้อมูลของ LINE OA มีความเหมาะสม",
  "ท่านคิดว่า LINE OA นี้มีประโยชน์ต่อการรับมือกับความร้อนเมือง",
  "ท่านจะแนะนำให้ผู้อื่นใช้งาน LINE OA “HeatSafe Khon Kaen”",
  "ความพึงพอใจในภาพรวมต่อการใช้งาน LINE OA “HeatSafe Khon Kaen”",
];

function FieldError({ text = "กรุณาตอบคำถามข้อนี้ก่อนส่งแบบประเมิน" }: { text?: string }) {
  return <p className="mt-1 text-xs font-medium text-red-600">{text}</p>;
}

function OptionInput({
  opt,
  name,
  type,
}: {
  opt: string;
  name: string;
  type: "radio" | "checkbox";
}) {
  const isOther = opt.startsWith("อื่น ๆ ระบุ");
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type={type}
        name={name}
        value={isOther ? "อื่น ๆ" : opt}
        className="h-4 w-4 accent-black cursor-pointer"
      />
      {isOther ? (
        <span className="inline-flex items-center gap-2">
          อื่น ๆ ระบุ
          <input
            type="text"
            name={`${name}_other`}
            className="border-b border-black/30 bg-transparent px-1 focus:outline-none focus:border-black/60"
          />
        </span>
      ) : (
        opt
      )}
    </label>
  );
}

function LikertTable({
  statements,
  namePrefix,
  invalidKeys,
}: {
  statements: string[];
  namePrefix: string;
  invalidKeys: Set<string>;
}) {
  const hasInvalid = statements.some((_, index) => invalidKeys.has(`${namePrefix}q${index}`));

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-black/30">
            <th className="py-2 pr-2 text-left align-bottom">ข้อ</th>
            <th className="py-2 px-2 text-left align-bottom">รายการประเมิน</th>
            {scaleLevels.map((level) => (
              <th key={level} className="py-2 px-2 text-center align-bottom w-12">
                {level}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {statements.map((statement, index) => {
            const key = `${namePrefix}q${index}`;
            const invalid = invalidKeys.has(key);
            return (
              <tr
                key={statement}
                data-field={key}
                className={`border-b border-black/10 ${invalid ? "bg-red-50" : ""}`}
              >
                <td className="py-2 pr-2 align-top">{index + 1}</td>
                <td className={`py-2 px-2 align-top ${invalid ? "text-red-600 font-medium" : ""}`}>
                  {statement}
                </td>
                {scaleLevels.map((level) => (
                  <td key={level} className="py-2 px-2 text-center align-top">
                    <input
                      type="radio"
                      name={key}
                      value={level}
                      className="h-4 w-4 accent-black cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {hasInvalid && (
        <p className="mt-2 text-xs font-medium text-red-600">กรุณาตอบให้ครบทุกข้อ</p>
      )}
    </div>
  );
}

type SubmitStatus = "idle" | "submitting" | "error";

function otherAwareValue(value: FormDataEntryValue | null, other: FormDataEntryValue | null) {
  if (value === null) return "";
  return value === "อื่น ๆ" ? `อื่น ๆ: ${other ?? ""}` : String(value);
}

function buildPayload(form: HTMLFormElement) {
  const fd = new FormData(form);

  const general = generalQuestions.map((q, i) => {
    const name = `g${i}`;
    return {
      question: q.text,
      answer: otherAwareValue(fd.get(name), fd.get(`${name}_other`)),
    };
  });

  const menusUsed = fd.getAll("menus").map((v) => String(v));

  const satisfaction = satisfactionStatements.map((statement, i) => ({
    statement,
    rating: fd.get(`p2q${i}`) as string | null,
  }));

  const suggestion = (fd.get("p3") as string) ?? "";

  return { general, menusUsed, satisfaction, suggestion };
}

function getInvalidKeys(form: HTMLFormElement): Set<string> {
  const fd = new FormData(form);
  const invalid = new Set<string>();

  generalQuestions.forEach((_, i) => {
    if (!fd.get(`g${i}`)) invalid.add(`g${i}`);
  });

  if (fd.getAll("menus").length === 0) invalid.add("menus");

  satisfactionStatements.forEach((_, i) => {
    if (!fd.get(`p2q${i}`)) invalid.add(`p2q${i}`);
  });

  return invalid;
}

export default function LineSatisfaction() {
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
      const res = await fetch("/api/line-satisfaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit failed");
      router.push("/?submitted=line-satisfaction");
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
            / แบบประเมินความพึงพอใจ LINE OA
          </p>
          <Link
            href="/"
            className="mt-3 inline-flex items-center gap-1 rounded-full border-2 border-green-700 px-4 py-1.5 text-sm font-medium text-green-800 hover:bg-green-50 transition-colors"
          >
            ← กลับหน้าหลัก
          </Link>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold">
            4. แบบประเมินความพึงพอใจการใช้งาน LINE OA
          </h1>

          <div className="mt-8 space-y-6 text-black/80 leading-relaxed">
            <h2 className="text-xl font-bold text-center">
              แบบประเมินความพึงพอใจการใช้งาน
            </h2>
            <p className="text-center font-medium">
              LINE Official Account &quot;HeatSafe Khon Kaen&quot;
            </p>

            <div>
              <h3 className="font-semibold">คำชี้แจง</h3>
              <p className="mt-2">
                แบบประเมินฉบับนี้จัดทำขึ้นเพื่อเก็บข้อมูลประกอบโครงงาน GeoHeat
                Khon Kaen โดยมีวัตถุประสงค์เพื่อประเมินความพึงพอใจของผู้ใช้งานที่มีต่อ
                LINE Official Account &quot;HeatSafe Khon Kaen&quot; ทั้งด้านการใช้งาน
                เนื้อหา และประโยชน์ที่ได้รับ
              </p>
              <p className="mt-2">
                ข้อมูลที่ได้รับจะนำไปใช้เพื่อการศึกษาและปรับปรุงระบบเท่านั้น
                และจะนำเสนอผลในภาพรวมโดยไม่เปิดเผยชื่อหรือข้อมูลส่วนบุคคลของผู้ตอบแบบประเมิน
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-bold">ตอนที่ 1 ข้อมูลทั่วไปของผู้ตอบแบบประเมิน</h3>
                <p className="mt-2">โปรดทำเครื่องหมาย ✓ ลงในช่องที่ตรงกับข้อมูลของท่าน</p>

                <ol className="mt-4 space-y-4 list-decimal list-inside">
                  {generalQuestions.map((q, qIndex) => {
                    const key = `g${qIndex}`;
                    const invalid = invalidKeys.has(key);
                    return (
                      <li key={q.text} data-field={key}>
                        <span className={invalid ? "text-red-600 font-medium" : undefined}>
                          {q.text}
                        </span>
                        <ul className="mt-1 ml-6 space-y-1">
                          {q.options.map((opt) => (
                            <li key={opt}>
                              <OptionInput opt={opt} name={key} type="radio" />
                            </li>
                          ))}
                        </ul>
                        {invalid && <FieldError />}
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-4" data-field="menus">
                  <span className={invalidKeys.has("menus") ? "text-red-600 font-medium" : undefined}>
                    เมนูที่ท่านเคยใช้งาน (เลือกได้มากกว่า 1 ข้อ)
                  </span>
                  <ul className="mt-1 ml-6 space-y-1">
                    {menuOptions.map((opt) => (
                      <li key={opt}>
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="menus"
                            value={opt}
                            className="h-4 w-4 accent-black cursor-pointer"
                          />
                          {opt}
                        </label>
                      </li>
                    ))}
                  </ul>
                  {invalidKeys.has("menus") && <FieldError text="กรุณาเลือกอย่างน้อย 1 ข้อ" />}
                </div>
              </div>

              <div>
                <h3 className="font-bold">ตอนที่ 2 ความพึงพอใจต่อการใช้งาน LINE OA</h3>
                <p className="mt-2">โปรดทำเครื่องหมาย ✓ ในช่องระดับความคิดเห็น</p>

                <p className="mt-4 font-medium">ระดับความคิดเห็น</p>
                <ul className="mt-1">
                  {scaleLabels.map((label) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>

                <LikertTable
                  statements={satisfactionStatements}
                  namePrefix="p2"
                  invalidKeys={invalidKeys}
                />
              </div>

              <div>
                <h3 className="font-bold">ตอนที่ 3 ข้อเสนอแนะเพิ่มเติม</h3>
                <p className="mt-2">
                  ท่านมีข้อเสนอแนะในการปรับปรุง LINE OA &quot;HeatSafe Khon Kaen&quot; อย่างไร
                </p>

                <textarea
                  rows={6}
                  name="p3"
                  className="mt-4 w-full resize-y rounded-md border border-black/20 bg-transparent p-3 focus:outline-none focus:border-black/60"
                />
              </div>

              <div className="flex flex-col items-center gap-3 border-t border-black/10 pt-6">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50"
                >
                  {status === "submitting" ? "กำลังส่งข้อมูล..." : "ส่งแบบประเมิน"}
                </button>
                {status === "error" && (
                  <p className="text-sm text-red-700">
                    เกิดข้อผิดพลาดในการส่งแบบประเมิน กรุณาลองใหม่อีกครั้ง
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
