"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import SiteHeader from "../../_components/SiteHeader";

const headerFields = ["วันที่สำรวจ", "เวลา", "ผู้สำรวจ", "สภาพอากาศขณะสำรวจ"];

const surveyRows = [
  { label: "รหัสจุดสำรวจ", type: "text" as const },
  { label: "ชื่อพื้นที่/สถานที่", type: "text" as const },
  { label: "ละติจูด", type: "text" as const },
  { label: "ลองจิจูด", type: "text" as const },
  {
    label: "ประเภทพื้นที่",
    type: "checkbox" as const,
    options: [
      "ถนน",
      "ตลาด",
      "โรงเรียน",
      "ลานคอนกรีต",
      "ชุมชน",
      "สวนสาธารณะ",
      "แหล่งน้ำ",
      "อื่น ๆ",
    ],
  },
  {
    label: "ลักษณะพื้นผิว",
    type: "checkbox" as const,
    options: ["คอนกรีต", "ยางมะตอย", "ดิน", "หญ้า", "น้ำ", "พื้นผิวผสม"],
  },
  {
    label: "มีร่มเงาหรือไม่",
    type: "checkbox" as const,
    options: ["มีมาก", "มีปานกลาง", "มีน้อย", "ไม่มี"],
  },
  {
    label: "มีต้นไม้หรือไม่",
    type: "checkbox" as const,
    options: ["มีมาก", "มีปานกลาง", "มีน้อย", "ไม่มี"],
  },
  {
    label: "ความหนาแน่นของผู้ใช้พื้นที่",
    type: "checkbox" as const,
    options: ["มาก", "ปานกลาง", "น้อย"],
  },
  {
    label: "ปัญหาที่พบ",
    type: "checkbox" as const,
    options: [
      "ร้อนจัด",
      "ฝุ่น",
      "รถติด",
      "น้ำท่วมขัง",
      "ไม่มีร่มเงา",
      "ท่อระบายน้ำอุดตัน",
      "อื่น ๆ",
    ],
  },
  {
    label: "ภาพถ่ายประกอบ",
    type: "checkbox" as const,
    options: ["มี", "ไม่มี"],
  },
  { label: "ข้อสังเกตเพิ่มเติม", type: "text" as const, multiline: true, optional: true },
];

const comparisonCodes = ["F001", "F002", "F003"];

function DottedInput({ name, invalid }: { name?: string; invalid?: boolean }) {
  return (
    <input
      type="text"
      name={name}
      className={`w-full border-b bg-transparent px-1 focus:outline-none focus:border-solid focus:border-black/60 ${
        invalid ? "border-red-400" : "border-dotted border-black/40"
      }`}
    />
  );
}

function FieldError() {
  return (
    <p className="mt-1 text-xs font-medium text-red-600">
      กรุณากรอกข้อมูลข้อนี้ก่อนส่งแบบบันทึกการสำรวจ
    </p>
  );
}

type SubmitStatus = "idle" | "submitting" | "error";

function getInvalidKeys(form: HTMLFormElement): Set<string> {
  const fd = new FormData(form);
  const invalid = new Set<string>();

  headerFields.forEach((_, i) => {
    if (!String(fd.get(`h${i}`) ?? "").trim()) invalid.add(`h${i}`);
  });

  surveyRows.forEach((row, i) => {
    if (row.optional) return;
    const name = `row${i}`;
    if (row.type === "checkbox") {
      if (fd.getAll(name).length === 0) invalid.add(name);
    } else if (!String(fd.get(name) ?? "").trim()) {
      invalid.add(name);
    }
  });

  return invalid;
}

function buildPayload(form: HTMLFormElement) {
  const fd = new FormData(form);

  const header = headerFields.map((field, i) => ({
    field,
    value: (fd.get(`h${i}`) as string) ?? "",
  }));

  const rows = surveyRows.map((row, i) => {
    const name = `row${i}`;
    if (row.type === "checkbox") {
      return { label: row.label, value: fd.getAll(name).join(", ") };
    }
    return { label: row.label, value: (fd.get(name) as string) ?? "" };
  });

  const comparisons = comparisonCodes.map((code, i) => ({
    code,
    name: (fd.get(`cmp${i}_name`) as string) ?? "",
    lst: (fd.get(`cmp${i}_lst`) as string) ?? "",
    ndvi: (fd.get(`cmp${i}_ndvi`) as string) ?? "",
    ndbi: (fd.get(`cmp${i}_ndbi`) as string) ?? "",
    fieldFinding: (fd.get(`cmp${i}_field`) as string) ?? "",
    match: fd.getAll(`cmp${i}_match`).join(", "),
  }));

  return { header, rows, comparisons };
}

export default function FieldSurvey() {
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
      const res = await fetch("/api/field-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit failed");
      router.push("/?submitted=field-survey");
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
            / แบบบันทึกการสำรวจภาคสนาม
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
            3. แบบบันทึกการสำรวจภาคสนาม
          </h1>

          <div className="mt-8 space-y-6 text-black/80 leading-relaxed">
            <h2 className="text-xl font-bold text-center">
              แบบบันทึกการสำรวจภาคสนาม
            </h2>
            <p className="text-center font-medium">
              แบบบันทึกจุดสำรวจพื้นที่ร้อนเมืองและพื้นที่เสี่ยงซ้ำซ้อน
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              {headerFields.map((field, index) => {
                const key = `h${index}`;
                const invalid = invalidKeys.has(key);
                return (
                  <div key={field} data-field={key}>
                    <div className="flex items-center gap-2">
                      <span className={`shrink-0 ${invalid ? "text-red-600 font-medium" : ""}`}>
                        {field}
                      </span>
                      <DottedInput name={key} invalid={invalid} />
                    </div>
                    {invalid && <FieldError />}
                  </div>
                );
              })}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-black/30">
                    <th className="w-48 py-2 pr-2 text-left align-bottom">
                      รายการ
                    </th>
                    <th className="py-2 px-2 text-left align-bottom">
                      รายละเอียด
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {surveyRows.map((row, rowIndex) => {
                    const key = `row${rowIndex}`;
                    const invalid = invalidKeys.has(key);
                    return (
                      <tr
                        key={row.label}
                        data-field={key}
                        className={`border-b border-black/10 ${invalid ? "bg-red-50" : ""}`}
                      >
                        <td className={`py-2 pr-2 align-top ${invalid ? "text-red-600 font-medium" : ""}`}>
                          {row.label}
                        </td>
                        <td className="py-2 px-2 align-top">
                          {row.type === "text" ? (
                            row.multiline ? (
                              <textarea
                                rows={2}
                                name={key}
                                className={`w-full resize-y border-b bg-transparent px-1 focus:outline-none focus:border-solid focus:border-black/60 ${
                                  invalid ? "border-red-400" : "border-dotted border-black/40"
                                }`}
                              />
                            ) : (
                              <DottedInput name={key} invalid={invalid} />
                            )
                          ) : (
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                              {row.options.map((opt) => (
                                <label
                                  key={opt}
                                  className="inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                                >
                                  <input
                                    type="checkbox"
                                    name={key}
                                    value={opt}
                                    className="h-4 w-4 accent-black cursor-pointer"
                                  />
                                  {opt}
                                </label>
                              ))}
                            </div>
                          )}
                          {invalid && <FieldError />}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="font-bold">
                แบบบันทึกเปรียบเทียบผลจากดาวเทียมกับภาคสนาม
              </h3>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-black/30">
                      <th className="py-2 pr-2 text-left align-bottom">รหัส</th>
                      <th className="py-2 px-2 text-left align-bottom">ชื่อพื้นที่</th>
                      <th className="py-2 px-2 text-left align-bottom">ค่า LST</th>
                      <th className="py-2 px-2 text-left align-bottom">ค่า NDVI</th>
                      <th className="py-2 px-2 text-left align-bottom">ค่า NDBI</th>
                      <th className="py-2 px-2 text-left align-bottom">
                        สิ่งที่พบภาคสนาม
                      </th>
                      <th className="py-2 px-2 text-left align-bottom">
                        สอดคล้องกับข้อมูลดาวเทียมหรือไม่
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonCodes.map((code, codeIndex) => (
                      <tr key={code} className="border-b border-black/10">
                        <td className="py-2 pr-2 align-top">{code}</td>
                        <td className="py-2 px-2 align-top">
                          <DottedInput name={`cmp${codeIndex}_name`} />
                        </td>
                        <td className="py-2 px-2 align-top">
                          <DottedInput name={`cmp${codeIndex}_lst`} />
                        </td>
                        <td className="py-2 px-2 align-top">
                          <DottedInput name={`cmp${codeIndex}_ndvi`} />
                        </td>
                        <td className="py-2 px-2 align-top">
                          <DottedInput name={`cmp${codeIndex}_ndbi`} />
                        </td>
                        <td className="py-2 px-2 align-top">
                          <DottedInput name={`cmp${codeIndex}_field`} />
                        </td>
                        <td className="py-2 px-2 align-top">
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {["สอดคล้อง", "ไม่สอดคล้อง"].map((opt) => (
                              <label
                                key={opt}
                                className="inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                              >
                                <input
                                  type="checkbox"
                                  name={`cmp${codeIndex}_match`}
                                  value={opt}
                                  className="h-4 w-4 accent-black cursor-pointer"
                                />
                                {opt}
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 border-t border-black/10 pt-6">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50"
              >
                {status === "submitting" ? "กำลังส่งข้อมูล..." : "ส่งแบบบันทึกการสำรวจ"}
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
