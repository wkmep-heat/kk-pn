import Link from "next/link";
import PageNav from "../_components/PageNav";
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
  { label: "ข้อสังเกตเพิ่มเติม", type: "text" as const, multiline: true },
];

const comparisonCodes = ["F001", "F002", "F003"];

function DottedInput() {
  return (
    <input
      type="text"
      className="w-full border-b border-dotted border-black/40 bg-transparent px-1 focus:outline-none focus:border-solid focus:border-black/60"
    />
  );
}

export default function FieldSurvey() {
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

            <div className="space-y-2">
              {headerFields.map((field) => (
                <div key={field} className="flex items-center gap-2">
                  <span className="shrink-0">{field}</span>
                  <DottedInput />
                </div>
              ))}
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
                  {surveyRows.map((row) => (
                    <tr key={row.label} className="border-b border-black/10">
                      <td className="py-2 pr-2 align-top">{row.label}</td>
                      <td className="py-2 px-2 align-top">
                        {row.type === "text" ? (
                          row.multiline ? (
                            <textarea
                              rows={2}
                              className="w-full resize-y border-b border-dotted border-black/40 bg-transparent px-1 focus:outline-none focus:border-solid focus:border-black/60"
                            />
                          ) : (
                            <DottedInput />
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
                                  className="h-4 w-4 accent-black cursor-pointer"
                                />
                                {opt}
                              </label>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
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
                    {comparisonCodes.map((code) => (
                      <tr key={code} className="border-b border-black/10">
                        <td className="py-2 pr-2 align-top">{code}</td>
                        <td className="py-2 px-2 align-top">
                          <DottedInput />
                        </td>
                        <td className="py-2 px-2 align-top">
                          <DottedInput />
                        </td>
                        <td className="py-2 px-2 align-top">
                          <DottedInput />
                        </td>
                        <td className="py-2 px-2 align-top">
                          <DottedInput />
                        </td>
                        <td className="py-2 px-2 align-top">
                          <DottedInput />
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

            <PageNav
              prev={{ href: "/appendix-a/interview", label: "แบบสัมภาษณ์ผู้รู้และผู้เกี่ยวข้อง" }}
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
