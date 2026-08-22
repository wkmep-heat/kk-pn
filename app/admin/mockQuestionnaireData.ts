// Generates fake questionnaire responses for the admin chart PREVIEW only.
// This never touches Blob storage / real submissions — it exists purely so the
// chart layout can be sanity-checked before real responses come in. Never wire
// this into the submit flow or persist its output anywhere.
import {
  part1Questions,
  part2Statements,
  part3CharacterOptions,
  part3ImpactOptions,
  part3TimeOptions,
  part4Statements,
  type QuestionnaireSubmission,
} from "./QuestionnaireCharts";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickSome<T>(arr: T[]): T[] {
  const count = 1 + Math.floor(Math.random() * Math.min(3, arr.length));
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Skewed toward 3-5 so the preview looks like plausible opinion data.
function randomRating(): string {
  const weighted = [2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 1];
  return String(pick(weighted));
}

function answerFor(opt: string): string {
  return opt.startsWith("อื่น ๆ ระบุ") ? "อื่น ๆ: ไม่ระบุรายละเอียด" : opt;
}

export function generateMockQuestionnaireSubmissions(count: number): QuestionnaireSubmission[] {
  return Array.from({ length: count }, (_, i) => {
    const part1 = part1Questions.map((q) => ({
      question: q.text,
      answer: answerFor(pick(q.options)),
    }));

    const part2 = part2Statements.map((statement) => ({
      statement,
      rating: randomRating(),
    }));

    const part3 = [
      { question: "พื้นที่ใดในเขตเทศบาลนครขอนแก่นที่ท่านรู้สึกว่าร้อนมากที่สุด", answer: "" },
      {
        question: "พื้นที่ดังกล่าวมีลักษณะอย่างไร",
        answer: pickSome(part3CharacterOptions).map(answerFor).join(", "),
      },
      { question: "ช่วงเวลาที่รู้สึกร้อนมากที่สุด", answer: answerFor(pick(part3TimeOptions)) },
      {
        question: "ผลกระทบที่ได้รับจากความร้อน",
        answer: pickSome(part3ImpactOptions).map(answerFor).join(", "),
      },
    ];

    const part4 = part4Statements.map((statement) => ({
      statement,
      rating: randomRating(),
    }));

    return {
      id: `preview-${i}`,
      submittedAt: new Date().toISOString(),
      part1,
      part2,
      part3,
      part4,
      part5: "",
    };
  });
}
