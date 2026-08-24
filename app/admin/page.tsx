import SiteHeader from "../_components/SiteHeader";
import { readSubmissions } from "../api/_lib/submissions";
import AdminLogin from "./AdminLogin";
import { isAdminAuthenticated } from "./auth";
import DeleteButton from "./DeleteButton";
import LogoutButton from "./LogoutButton";
import QuestionnaireCharts from "./QuestionnaireCharts";

type ChoiceAnswer = { question: string; answer: string };
type RatingAnswer = { statement: string; rating: string | null };

type QuestionnaireSubmission = {
  id: string;
  submittedAt: string;
  part1?: ChoiceAnswer[];
  part2?: RatingAnswer[];
  part3?: ChoiceAnswer[];
  part4?: RatingAnswer[];
  part5?: string;
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

export default async function AdminPage() {
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

  const questionnaire = (await readSubmissions(
    "questionnaire-submissions.json"
  )) as QuestionnaireSubmission[];
  const questionnaireRev = questionnaire.slice().reverse();

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
            <h2 className="text-lg font-bold">1. แบบสอบถามประชาชน</h2>
            <p className="mt-1 text-xs text-black/50">
              กราฟด้านล่างสรุปผลจากแบบสอบถามฉบับกระดาษ/ภาคสนามที่รวบรวมและประมวลผลแล้ว (n = 300)
              ส่วนรายการฉบับด้านล่างกราฟเป็นข้อมูลที่ส่งเข้ามาผ่านเว็บไซต์นี้โดยตรง
            </p>
            <QuestionnaireCharts />
            <QuestionnaireList submissions={questionnaireRev} />
          </div>
        </section>
      </main>
    </>
  );
}
