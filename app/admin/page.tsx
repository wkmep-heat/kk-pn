import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";
import { readSubmissions } from "../api/_lib/submissions";
import AdminLogin from "./AdminLogin";
import { isAdminAuthenticated } from "./auth";
import DeleteButton from "./DeleteButton";
import LogoutButton from "./LogoutButton";
import { generateMockQuestionnaireSubmissions } from "./mockQuestionnaireData";
import QuestionnaireCharts from "./QuestionnaireCharts";

type ChoiceAnswer = { question: string; answer: string };
type RatingAnswer = { statement: string; rating: string | null };
type FieldValue = { field: string; value: string };

type QuestionnaireSubmission = {
  id: string;
  submittedAt: string;
  part1?: ChoiceAnswer[];
  part2?: RatingAnswer[];
  part3?: ChoiceAnswer[];
  part4?: RatingAnswer[];
  part5?: string;
};

type InterviewSubmission = {
  id: string;
  submittedAt: string;
  generalInfo?: FieldValue[];
  section2?: ChoiceAnswer[];
  section3?: ChoiceAnswer[];
  section4?: ChoiceAnswer[];
};

type FieldSurveySubmission = {
  id: string;
  submittedAt: string;
  header?: FieldValue[];
  rows?: { label: string; value: string }[];
  comparisons?: {
    code: string;
    name: string;
    lst: string;
    ndvi: string;
    ndbi: string;
    fieldFinding: string;
    match: string;
  }[];
};

type LineSatisfactionSubmission = {
  id: string;
  submittedAt: string;
  general?: ChoiceAnswer[];
  menusUsed?: string[];
  satisfaction?: RatingAnswer[];
  suggestion?: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("th-TH");
}

function QuestionnaireList({ submissions }: { submissions: QuestionnaireSubmission[] }) {
  if (submissions.length === 0) {
    return <p className="mt-4 text-black/50">ยังไม่มีข้อมูลที่ส่งเข้ามา</p>;
  }
  return (
    <div className="mt-4 space-y-4">
      {submissions.map((s, idx) => (
        <details key={s.id} className="rounded-lg border border-black/10 p-4">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
            <span>
              ฉบับที่ {submissions.length - idx} — {formatDate(s.submittedAt)}
            </span>
            <DeleteButton type="questionnaire" id={s.id} />
          </summary>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <h4 className="font-semibold">ตอนที่ 1 ข้อมูลทั่วไป</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.part1 ?? []).map((a) => (
                  <li key={a.question}>
                    {a.question}: {a.answer || "—"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">ตอนที่ 2 การรับรู้ปัญหาความร้อนเมือง</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.part2 ?? []).map((a) => (
                  <li key={a.statement}>
                    {a.statement}: {a.rating ?? "—"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">ตอนที่ 3 จุดร้อน/จุดเสี่ยง</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.part3 ?? []).map((a) => (
                  <li key={a.question}>
                    {a.question}: {a.answer || "—"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">ตอนที่ 4 ความคิดเห็นต่อระบบ Smart Map</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.part4 ?? []).map((a) => (
                  <li key={a.statement}>
                    {a.statement}: {a.rating ?? "—"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">ตอนที่ 5 ข้อเสนอแนะเพิ่มเติม</h4>
              <p className="mt-1">{s.part5 || "—"}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function InterviewList({ submissions }: { submissions: InterviewSubmission[] }) {
  if (submissions.length === 0) {
    return <p className="mt-4 text-black/50">ยังไม่มีข้อมูลที่ส่งเข้ามา</p>;
  }
  return (
    <div className="mt-4 space-y-4">
      {submissions.map((s, idx) => (
        <details key={s.id} className="rounded-lg border border-black/10 p-4">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
            <span>
              ฉบับที่ {submissions.length - idx} — {formatDate(s.submittedAt)}
            </span>
            <DeleteButton type="interview" id={s.id} />
          </summary>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <h4 className="font-semibold">ส่วนที่ 1 ข้อมูลทั่วไปของผู้ให้สัมภาษณ์</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.generalInfo ?? []).map((a) => (
                  <li key={a.field}>
                    {a.field}: {a.value || "—"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">ส่วนที่ 2 ประเด็นด้านภูมิสารสนเทศ/GIS</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.section2 ?? []).map((a) => (
                  <li key={a.question}>
                    {a.question}: {a.answer || "—"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">ส่วนที่ 3 ประเด็นด้านผังเมือง/เทศบาล</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.section3 ?? []).map((a) => (
                  <li key={a.question}>
                    {a.question}: {a.answer || "—"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">ส่วนที่ 4 ประเด็นด้านอุตุนิยมวิทยา/ภัยพิบัติ</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.section4 ?? []).map((a) => (
                  <li key={a.question}>
                    {a.question}: {a.answer || "—"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function FieldSurveyList({ submissions }: { submissions: FieldSurveySubmission[] }) {
  if (submissions.length === 0) {
    return <p className="mt-4 text-black/50">ยังไม่มีข้อมูลที่ส่งเข้ามา</p>;
  }
  return (
    <div className="mt-4 space-y-4">
      {submissions.map((s, idx) => (
        <details key={s.id} className="rounded-lg border border-black/10 p-4">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
            <span>
              ฉบับที่ {submissions.length - idx} — {formatDate(s.submittedAt)}
            </span>
            <DeleteButton type="field-survey" id={s.id} />
          </summary>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <h4 className="font-semibold">ข้อมูลหัวแบบบันทึก</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.header ?? []).map((a) => (
                  <li key={a.field}>
                    {a.field}: {a.value || "—"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">รายการสำรวจ</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.rows ?? []).map((a) => (
                  <li key={a.label}>
                    {a.label}: {a.value || "—"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">แบบบันทึกเปรียบเทียบผลจากดาวเทียมกับภาคสนาม</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.comparisons ?? []).map((c) => (
                  <li key={c.code}>
                    {c.code} — {c.name || "—"} | LST: {c.lst || "—"} | NDVI:{" "}
                    {c.ndvi || "—"} | NDBI: {c.ndbi || "—"} | สิ่งที่พบ:{" "}
                    {c.fieldFinding || "—"} | ความสอดคล้อง: {c.match || "—"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function LineSatisfactionList({ submissions }: { submissions: LineSatisfactionSubmission[] }) {
  if (submissions.length === 0) {
    return <p className="mt-4 text-black/50">ยังไม่มีข้อมูลที่ส่งเข้ามา</p>;
  }
  return (
    <div className="mt-4 space-y-4">
      {submissions.map((s, idx) => (
        <details key={s.id} className="rounded-lg border border-black/10 p-4">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
            <span>
              ฉบับที่ {submissions.length - idx} — {formatDate(s.submittedAt)}
            </span>
            <DeleteButton type="line-satisfaction" id={s.id} />
          </summary>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <h4 className="font-semibold">ตอนที่ 1 ข้อมูลทั่วไป</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.general ?? []).map((a) => (
                  <li key={a.question}>
                    {a.question}: {a.answer || "—"}
                  </li>
                ))}
                <li>เมนูที่เคยใช้งาน: {(s.menusUsed ?? []).join(", ") || "—"}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">ตอนที่ 2 ความพึงพอใจต่อการใช้งาน LINE OA</h4>
              <ul className="mt-1 list-disc list-inside">
                {(s.satisfaction ?? []).map((a) => (
                  <li key={a.statement}>
                    {a.statement}: {a.rating ?? "—"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">ตอนที่ 3 ข้อเสนอแนะเพิ่มเติม</h4>
              <p className="mt-1">{s.suggestion || "—"}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1">
          <section className="mx-auto max-w-md px-6 py-16">
            <h1 className="text-2xl font-bold">เข้าสู่ระบบแอดมิน</h1>
            <p className="mt-2 text-sm text-black/50">
              กรอกรหัสผ่านเพื่อดูข้อมูลที่ส่งเข้ามา
            </p>
            <AdminLogin />
          </section>
        </main>
      </>
    );
  }

  const [questionnaire, interview, fieldSurvey, lineSatisfaction] = await Promise.all([
    readSubmissions("questionnaire-submissions.json") as Promise<QuestionnaireSubmission[]>,
    readSubmissions("interview-submissions.json") as Promise<InterviewSubmission[]>,
    readSubmissions("field-survey-submissions.json") as Promise<FieldSurveySubmission[]>,
    readSubmissions("line-satisfaction-submissions.json") as Promise<LineSatisfactionSubmission[]>,
  ]);

  const questionnaireRev = questionnaire.slice().reverse();
  const interviewRev = interview.slice().reverse();
  const fieldSurveyRev = fieldSurvey.slice().reverse();
  const lineSatisfactionRev = lineSatisfaction.slice().reverse();

  const params = await searchParams;
  const previewCount = params.preview === "1" ? 300 : 0;
  const chartSubmissions = previewCount > 0
    ? generateMockQuestionnaireSubmissions(previewCount)
    : questionnaireRev;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">ข้อมูลที่ส่งเข้ามา</h1>
            <LogoutButton />
          </div>

          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold">
                1. แบบสอบถามประชาชน ({questionnaireRev.length})
              </h2>
              {previewCount > 0 ? (
                <Link
                  href="/admin"
                  className="rounded-full border border-black/20 px-3 py-1 text-xs font-medium text-black/60 hover:border-black/40"
                >
                  ← กลับไปดูกราฟจากข้อมูลจริง
                </Link>
              ) : (
                <Link
                  href="/admin?preview=1"
                  className="rounded-full border border-black/20 px-3 py-1 text-xs font-medium text-black/60 hover:border-black/40"
                >
                  ดูตัวอย่างกราฟจำลอง (300 คน)
                </Link>
              )}
            </div>

            {previewCount > 0 && (
              <p className="mt-2 rounded-md bg-yellow-50 px-3 py-2 text-xs font-medium text-yellow-800">
                ⚠️ กราฟด้านล่างนี้แสดง{" "}
                <strong>ข้อมูลจำลอง {previewCount} ชุด</strong> เพื่อดูตัวอย่างหน้าตากราฟเท่านั้น
                ไม่ใช่ข้อมูลจริง และไม่ถูกบันทึกลงระบบ — รายการแบบสอบถามด้านล่างยังเป็นข้อมูลจริงตามปกติ
              </p>
            )}

            <QuestionnaireCharts submissions={chartSubmissions} isPreview={previewCount > 0} />
            <QuestionnaireList submissions={questionnaireRev} />
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-bold">
              2. แบบสัมภาษณ์ผู้รู้และผู้เกี่ยวข้อง ({interviewRev.length})
            </h2>
            <InterviewList submissions={interviewRev} />
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-bold">
              3. แบบบันทึกการสำรวจภาคสนาม ({fieldSurveyRev.length})
            </h2>
            <FieldSurveyList submissions={fieldSurveyRev} />
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-bold">
              4. แบบประเมินความพึงพอใจการใช้งาน LINE OA ({lineSatisfactionRev.length})
            </h2>
            <LineSatisfactionList submissions={lineSatisfactionRev} />
          </div>
        </section>
      </main>
    </>
  );
}
