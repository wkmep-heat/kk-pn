export type ChoiceAnswer = { question: string; answer: string };
export type RatingAnswer = { statement: string; rating: string | null };

export type QuestionnaireSubmission = {
  id: string;
  submittedAt: string;
  part1?: ChoiceAnswer[];
  part2?: RatingAnswer[];
  part3?: ChoiceAnswer[];
  part4?: RatingAnswer[];
  part5?: string;
};

const TARGET_SAMPLE = 300;

export const part1Questions = [
  { text: "เพศ", options: ["ชาย", "หญิง", "ไม่ประสงค์ระบุ"] },
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

export const part2Statements = [
  "ท่านรู้สึกว่าเขตเมืองขอนแก่นมีอากาศร้อนมากขึ้นในช่วงหลายปีที่ผ่านมา",
  "พื้นที่ที่มีถนนคอนกรีตหรือยางมะตอยกว้าง ทำให้รู้สึกร้อนกว่าพื้นที่ที่มีต้นไม้",
  "พื้นที่ที่ไม่มีร่มเงาส่งผลต่อการเดินทางหรือการใช้ชีวิตประจำวันของท่าน",
  "ความร้อนในเมืองส่งผลต่อสุขภาพ เช่น เหนื่อยง่าย เวียนศีรษะ อ่อนเพลีย หรือเป็นลม",
  "ท่านเห็นว่าควรเพิ่มพื้นที่สีเขียวหรือร่มเงาในเขตเทศบาลนครขอนแก่น",
  "ท่านเห็นว่าปัญหาความร้อนเมืองเกี่ยวข้องกับการขยายตัวของเมือง",
  "ท่านเห็นว่าข้อมูลแผนที่ความร้อนเมืองมีประโยชน์ต่อประชาชน",
  "ท่านต้องการระบบแจ้งเตือนหรือแผนที่แสดงพื้นที่ร้อนจัดในเมือง",
];

export const part3CharacterOptions = [
  "ถนนกว้าง",
  "พื้นคอนกรีต/ยางมะตอย",
  "อาคารหนาแน่น",
  "ไม่มีต้นไม้",
  "ไม่มีหลังคาหรือร่มเงา",
  "รถติด",
  "ฝุ่นมาก",
  "น้ำท่วมขังหลังฝนตก",
  "อื่น ๆ ระบุ ……………………………………………..",
];

export const part3TimeOptions = [
  "08.00–10.00 น.",
  "10.01–12.00 น.",
  "12.01–14.00 น.",
  "14.01–16.00 น.",
  "หลัง 16.00 น.",
];

export const part3ImpactOptions = [
  "เหนื่อยง่าย",
  "เวียนศีรษะ",
  "เหงื่อออกมาก",
  "ต้องหลีกเลี่ยงพื้นที่กลางแจ้ง",
  "ต้องเสียค่าใช้จ่ายเพิ่ม เช่น เครื่องดื่ม ค่าเดินทาง หรือเครื่องปรับอากาศ",
  "อื่น ๆ ระบุ ……………………………………………..",
];

export const part4Statements = [
  "แผนที่แสดงพื้นที่ร้อนจัดมีประโยชน์ต่อการวางแผนเดินทาง",
  "ระบบแจ้งเหตุผ่าน LINE Official Account ใช้งานสะดวก",
  "ท่านยินดีแจ้งข้อมูลจุดร้อน จุดน้ำท่วม จุดฝุ่น หรือจุดไม่มีร่มเงา ผ่านระบบออนไลน์",
  "ระบบ Smart Map ควรแสดงข้อมูลหลายด้าน เช่น ความร้อน ฝุ่น น้ำท่วม และจราจร",
  "ข้อมูลจากประชาชนควรถูกนำไปใช้ประกอบการวางแผนพัฒนาเมือง",
];

function normalizeLabel(opt: string) {
  return opt.startsWith("อื่น ๆ ระบุ") ? "อื่น ๆ" : opt;
}

function tallySingle(answers: (string | undefined)[], options: string[]) {
  const labels = options.map(normalizeLabel);
  const counts = new Map(labels.map((l) => [l, 0]));
  let total = 0;
  answers.forEach((raw) => {
    const a = (raw ?? "").trim();
    if (!a) return;
    const key = a.startsWith("อื่น ๆ") ? "อื่น ๆ" : a;
    if (counts.has(key)) {
      counts.set(key, (counts.get(key) ?? 0) + 1);
      total++;
    }
  });
  return { total, items: labels.map((l) => ({ label: l, value: counts.get(l) ?? 0 })) };
}

function tallyMulti(answers: (string | undefined)[], options: string[]) {
  const labels = options.map(normalizeLabel);
  const counts = new Map(labels.map((l) => [l, 0]));
  let respondents = 0;
  answers.forEach((raw) => {
    const a = (raw ?? "").trim();
    if (!a) return;
    respondents++;
    a.split(",")
      .map((s) => s.trim())
      .forEach((part) => {
        const key = part.startsWith("อื่น ๆ") ? "อื่น ๆ" : part;
        if (counts.has(key)) counts.set(key, (counts.get(key) ?? 0) + 1);
      });
  });
  return { respondents, items: labels.map((l) => ({ label: l, value: counts.get(l) ?? 0 })) };
}

function likertAverage(ratings: (string | null | undefined)[]) {
  const nums = ratings
    .map((r) => (r ? Number(r) : NaN))
    .filter((n) => Number.isFinite(n));
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

function BarChart({
  items,
  max,
  formatValue,
}: {
  items: { label: string; value: number }[];
  max: number;
  formatValue: (v: number) => string;
}) {
  return (
    <div className="space-y-2.5">
      {items.map((item) => {
        const pct = max > 0 ? Math.min(100, (item.value / max) * 100) : 0;
        return (
          <div key={item.label}>
            <div className="flex items-baseline justify-between gap-3 text-xs">
              <span className="text-black/70">{item.label}</span>
              <span className="shrink-0 font-medium text-black/80">
                {formatValue(item.value)}
              </span>
            </div>
            <div className="mt-1 h-2.5 w-full rounded-full bg-black/5">
              <div
                className="h-2.5 rounded-full bg-[#2a78d6]"
                style={{ width: `${item.value > 0 ? Math.max(pct, 2) : 0}%` }}
                title={`${item.label}: ${formatValue(item.value)}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function QuestionnaireCharts({
  submissions,
  isPreview = false,
}: {
  submissions: QuestionnaireSubmission[];
  isPreview?: boolean;
}) {
  const n = submissions.length;
  const progressPct = Math.min(100, (n / TARGET_SAMPLE) * 100);

  const part1Charts = part1Questions.map((q, qi) => {
    const answers = submissions.map((s) => s.part1?.[qi]?.answer);
    return { title: q.text, ...tallySingle(answers, q.options) };
  });

  const part2Items = part2Statements.map((statement, i) => ({
    label: statement,
    value: likertAverage(submissions.map((s) => s.part2?.[i]?.rating)),
  }));

  const hotspotChar = tallyMulti(
    submissions.map((s) => s.part3?.[1]?.answer),
    part3CharacterOptions
  );
  const hotspotTime = tallySingle(
    submissions.map((s) => s.part3?.[2]?.answer),
    part3TimeOptions
  );
  const hotspotImpact = tallyMulti(
    submissions.map((s) => s.part3?.[3]?.answer),
    part3ImpactOptions
  );

  const part4Items = part4Statements.map((statement, i) => ({
    label: statement,
    value: likertAverage(submissions.map((s) => s.part4?.[i]?.rating)),
  }));

  return (
    <div
      className={`mt-6 space-y-8 rounded-2xl border p-6 ${
        isPreview ? "border-yellow-300 bg-yellow-50/40" : "border-black/10"
      }`}
    >
      <div>
        <p className="text-sm text-black/60">
          {isPreview ? "จำนวนผู้ตอบแบบสอบถาม (ข้อมูลจำลอง — ไม่ใช่ข้อมูลจริง)" : (
            <>จำนวนผู้ตอบแบบสอบถาม (เป้าหมายกลุ่มตัวอย่าง {TARGET_SAMPLE} คน)</>
          )}
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#2a78d6]">{n}</span>
          <span className="text-sm text-black/50">
            / {TARGET_SAMPLE} คน ({progressPct.toFixed(0)}%)
          </span>
        </div>
        <div className="mt-2 h-2.5 w-full max-w-md rounded-full bg-black/5">
          <div
            className="h-2.5 rounded-full bg-[#2a78d6]"
            style={{ width: `${n > 0 ? Math.max(progressPct, 2) : 0}%` }}
          />
        </div>
      </div>

      {n === 0 ? (
        <p className="text-sm text-black/50">ยังไม่มีข้อมูลสำหรับสร้างกราฟ</p>
      ) : (
        <>
          <div>
            <h4 className="font-semibold">ตอนที่ 1 ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม</h4>
            <div className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {part1Charts.map((c) => (
                <div key={c.title}>
                  <p className="text-sm font-medium text-black/80">{c.title}</p>
                  <div className="mt-2">
                    <BarChart
                      items={c.items}
                      max={Math.max(c.total, 1)}
                      formatValue={(v) =>
                        `${v} คน (${c.total > 0 ? Math.round((v / c.total) * 100) : 0}%)`
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold">
              ตอนที่ 2 การรับรู้ปัญหาความร้อนเมือง (ค่าเฉลี่ยระดับความคิดเห็น เต็ม 5)
            </h4>
            <div className="mt-3">
              <BarChart items={part2Items} max={5} formatValue={(v) => `${v.toFixed(2)} / 5`} />
            </div>
          </div>

          <div>
            <h4 className="font-semibold">
              ตอนที่ 3 พื้นที่ที่ประชาชนรับรู้ว่าเป็นจุดร้อนหรือจุดเสี่ยง
            </h4>
            <div className="mt-4 space-y-6">
              <div>
                <p className="text-sm font-medium text-black/80">
                  ลักษณะของพื้นที่ร้อน (เลือกได้หลายข้อ)
                </p>
                <div className="mt-2">
                  <BarChart
                    items={hotspotChar.items}
                    max={Math.max(hotspotChar.respondents, 1)}
                    formatValue={(v) => `${v} คน`}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-black/80">ช่วงเวลาที่รู้สึกร้อนมากที่สุด</p>
                <div className="mt-2">
                  <BarChart
                    items={hotspotTime.items}
                    max={Math.max(hotspotTime.total, 1)}
                    formatValue={(v) =>
                      `${v} คน (${hotspotTime.total > 0 ? Math.round((v / hotspotTime.total) * 100) : 0}%)`
                    }
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-black/80">
                  ผลกระทบที่ได้รับจากความร้อน (เลือกได้หลายข้อ)
                </p>
                <div className="mt-2">
                  <BarChart
                    items={hotspotImpact.items}
                    max={Math.max(hotspotImpact.respondents, 1)}
                    formatValue={(v) => `${v} คน`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">
              ตอนที่ 4 ความคิดเห็นต่อระบบ Smart Map และ LINE OA (ค่าเฉลี่ย เต็ม 5)
            </h4>
            <div className="mt-3">
              <BarChart items={part4Items} max={5} formatValue={(v) => `${v.toFixed(2)} / 5`} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
