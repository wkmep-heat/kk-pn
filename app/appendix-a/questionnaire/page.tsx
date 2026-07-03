import Link from "next/link";
import PageNav from "../_components/PageNav";
import SiteHeader from "../../_components/SiteHeader";

const part1Questions = [
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
    text: "สถานะของผู้ตอบแบบสอบถาม",
    options: [
      "นักเรียน",
      "ผู้ปกครอง",
      "ครู/บุคลากรทางการศึกษา",
      "ผู้ค้า/ผู้ประกอบอาชีพในเขตเมือง",
      "ประชาชนทั่วไป",
      "อื่น ๆ ระบุ ……………………………………………..",
    ],
  },
  {
    text: "ท่านใช้พื้นที่ในเขตเทศบาลนครขอนแก่นบ่อยเพียงใด",
    options: [
      "ทุกวัน",
      "3–5 วันต่อสัปดาห์",
      "1–2 วันต่อสัปดาห์",
      "นาน ๆ ครั้ง",
      "อื่น ๆ ระบุ ……………………………………………..",
    ],
  },
  {
    text: "พื้นที่ที่ท่านใช้เป็นประจำ",
    options: [
      "โรงเรียน/สถานศึกษา",
      "ตลาด",
      "ถนนสายหลัก",
      "จุดรอรถ/สถานีขนส่ง",
      "สถานที่ราชการ",
      "ห้างสรรพสินค้า/ย่านการค้า",
      "สวนสาธารณะ",
      "อื่น ๆ ระบุ ……………………………………………..",
    ],
  },
];

const scaleLevels = [5, 4, 3, 2, 1];
const scaleLabels = [
  "5 = มากที่สุด",
  "4 = มาก",
  "3 = ปานกลาง",
  "2 = น้อย",
  "1 = น้อยที่สุด",
];

const part3Questions = [
  {
    text: "พื้นที่ใดในเขตเทศบาลนครขอนแก่นที่ท่านรู้สึกว่าร้อนมากที่สุด",
    type: "text" as const,
  },
  {
    text: "พื้นที่ดังกล่าวมีลักษณะอย่างไร",
    type: "checkbox" as const,
    options: [
      "ถนนกว้าง",
      "พื้นคอนกรีต/ยางมะตอย",
      "อาคารหนาแน่น",
      "ไม่มีต้นไม้",
      "ไม่มีหลังคาหรือร่มเงา",
      "รถติด",
      "ฝุ่นมาก",
      "น้ำท่วมขังหลังฝนตก",
      "อื่น ๆ ระบุ ……………………………………………..",
    ],
  },
  {
    text: "ช่วงเวลาที่รู้สึกร้อนมากที่สุด",
    type: "radio" as const,
    options: [
      "08.00–10.00 น.",
      "10.01–12.00 น.",
      "12.01–14.00 น.",
      "14.01–16.00 น.",
      "หลัง 16.00 น.",
    ],
  },
  {
    text: "ผลกระทบที่ได้รับจากความร้อน",
    type: "checkbox" as const,
    options: [
      "เหนื่อยง่าย",
      "เวียนศีรษะ",
      "เหงื่อออกมาก",
      "ต้องหลีกเลี่ยงพื้นที่กลางแจ้ง",
      "ต้องเสียค่าใช้จ่ายเพิ่ม เช่น เครื่องดื่ม ค่าเดินทาง หรือเครื่องปรับอากาศ",
      "อื่น ๆ ระบุ ……………………………………………..",
    ],
  },
];

const part2Statements = [
  "ท่านรู้สึกว่าเขตเมืองขอนแก่นมีอากาศร้อนมากขึ้นในช่วงหลายปีที่ผ่านมา",
  "พื้นที่ที่มีถนนคอนกรีตหรือยางมะตอยกว้าง ทำให้รู้สึกร้อนกว่าพื้นที่ที่มีต้นไม้",
  "พื้นที่ที่ไม่มีร่มเงาส่งผลต่อการเดินทางหรือการใช้ชีวิตประจำวันของท่าน",
  "ความร้อนในเมืองส่งผลต่อสุขภาพ เช่น เหนื่อยง่าย เวียนศีรษะ อ่อนเพลีย หรือเป็นลม",
  "ท่านเห็นว่าควรเพิ่มพื้นที่สีเขียวหรือร่มเงาในเขตเทศบาลนครขอนแก่น",
  "ท่านเห็นว่าปัญหาความร้อนเมืองเกี่ยวข้องกับการขยายตัวของเมือง",
  "ท่านเห็นว่าข้อมูลแผนที่ความร้อนเมืองมีประโยชน์ต่อประชาชน",
  "ท่านต้องการระบบแจ้งเตือนหรือแผนที่แสดงพื้นที่ร้อนจัดในเมือง",
];

const part4Statements = [
  "แผนที่แสดงพื้นที่ร้อนจัดมีประโยชน์ต่อการวางแผนเดินทาง",
  "ระบบแจ้งเหตุผ่าน LINE Official Account ใช้งานสะดวก",
  "ท่านยินดีแจ้งข้อมูลจุดร้อน จุดน้ำท่วม จุดฝุ่น หรือจุดไม่มีร่มเงา ผ่านระบบออนไลน์",
  "ระบบ Smart Map ควรแสดงข้อมูลหลายด้าน เช่น ความร้อน ฝุ่น น้ำท่วม และจราจร",
  "ข้อมูลจากประชาชนควรถูกนำไปใช้ประกอบการวางแผนพัฒนาเมือง",
];

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
        name={type === "radio" ? name : undefined}
        className="h-4 w-4 accent-black cursor-pointer"
      />
      {isOther ? (
        <span className="inline-flex items-center gap-2">
          อื่น ๆ ระบุ
          <input
            type="text"
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
}: {
  statements: string[];
  namePrefix: string;
}) {
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
          {statements.map((statement, index) => (
            <tr key={statement} className="border-b border-black/10">
              <td className="py-2 pr-2 align-top">{index + 1}</td>
              <td className="py-2 px-2 align-top">{statement}</td>
              {scaleLevels.map((level) => (
                <td key={level} className="py-2 px-2 text-center align-top">
                  <input
                    type="radio"
                    name={`${namePrefix}q${index}`}
                    value={level}
                    className="h-4 w-4 accent-black cursor-pointer"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Questionnaire() {
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
            / แบบสอบถาม
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
            1. แบบสอบถามประชาชน
          </h1>

          <div className="mt-8 space-y-6 text-black/80 leading-relaxed">
            <h2 className="text-xl font-bold text-center">
              แบบสอบถามประชาชน
            </h2>
            <p className="text-center font-medium">
              เรื่อง การรับรู้ปัญหาความร้อนเมืองและพื้นที่เสี่ยงภัยในเขตเทศบาลนครขอนแก่น
            </p>

            <div>
              <h3 className="font-semibold">คำชี้แจง</h3>
              <p className="mt-2">
                แบบสอบถามฉบับนี้จัดทำขึ้นเพื่อเก็บข้อมูลประกอบโครงงาน GeoHeat
                Khon Kaen โดยมีวัตถุประสงค์เพื่อศึกษาการรับรู้ของประชาชนเกี่ยวกับปัญหาความร้อนเมือง
                พื้นที่ร้อนจัด พื้นที่ไม่มีร่มเงา จุดน้ำท่วมขัง จุดฝุ่น จุดรถติด
                และความต้องการใช้ระบบแผนที่อัจฉริยะหรือระบบแจ้งเตือนภัยผ่าน LINE
                Official Account
              </p>
              <p className="mt-2">
                ข้อมูลที่ได้รับจะนำไปใช้เพื่อการศึกษาเท่านั้น
                และจะนำเสนอผลในภาพรวมโดยไม่เปิดเผยชื่อหรือข้อมูลส่วนบุคคลของผู้ตอบแบบสอบถาม
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                ตอนที่ 1 ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม
              </h3>
              <p className="mt-2">
                โปรดทำเครื่องหมาย ✓ ลงในช่องที่ตรงกับข้อมูลของท่าน
              </p>

              <ol className="mt-4 space-y-4 list-decimal list-inside">
                {part1Questions.map((q, qIndex) => (
                  <li key={q.text}>
                    {q.text}
                    <ul className="mt-1 ml-6 space-y-1">
                      {q.options.map((opt) => (
                        <li key={opt}>
                          <OptionInput opt={opt} name={`q${qIndex}`} type="radio" />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-bold">
                ตอนที่ 2 การรับรู้ปัญหาความร้อนเมือง
              </h3>
              <p className="mt-2">
                โปรดทำเครื่องหมาย ✓ ในช่องระดับความคิดเห็น
              </p>

              <p className="mt-4 font-medium">ระดับความคิดเห็น</p>
              <ul className="mt-1">
                {scaleLabels.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>

              <LikertTable statements={part2Statements} namePrefix="p2" />
            </div>

            <div>
              <h3 className="font-bold">
                ตอนที่ 3 พื้นที่ที่ประชาชนรับรู้ว่าเป็นจุดร้อนหรือจุดเสี่ยง
              </h3>
              <p className="mt-2">
                โปรดทำเครื่องหมาย ✓ ลงในช่องที่ตรงกับข้อมูลของท่าน
              </p>

              <ol className="mt-4 space-y-4 list-decimal list-inside">
                {part3Questions.map((q, qIndex) => (
                  <li key={q.text}>
                    {q.text}
                    {q.type === "text" ? (
                      <div className="mt-2 ml-6 flex items-center gap-2">
                        <span>ตอบ</span>
                        <input
                          type="text"
                          className="w-full max-w-md border-b border-black/30 bg-transparent px-1 focus:outline-none focus:border-black/60"
                        />
                      </div>
                    ) : (
                      <ul className="mt-1 ml-6 space-y-1">
                        {q.options.map((opt) => (
                          <li key={opt}>
                            <OptionInput
                              opt={opt}
                              name={`p3q${qIndex}`}
                              type={q.type}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-bold">
                ตอนที่ 4 ความคิดเห็นต่อระบบ Smart Map และ LINE Official Account
              </h3>
              <p className="mt-2">
                โปรดทำเครื่องหมาย ✓ ในช่องระดับความคิดเห็น
              </p>

              <LikertTable statements={part4Statements} namePrefix="p4" />
            </div>

            <div>
              <h3 className="font-bold">ตอนที่ 5 ข้อเสนอแนะเพิ่มเติม</h3>
              <p className="mt-2">
                ท่านมีข้อเสนอแนะในการลดปัญหาความร้อนเมืองหรือพื้นที่เสี่ยงภัยในเทศบาลนครขอนแก่นอย่างไร
              </p>

              <textarea
                rows={6}
                className="mt-4 w-full resize-y rounded-md border border-black/20 bg-transparent p-3 focus:outline-none focus:border-black/60"
              />
            </div>

            <PageNav
              next={{ href: "/appendix-a/interview", label: "แบบสัมภาษณ์ผู้รู้และผู้เกี่ยวข้อง" }}
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
