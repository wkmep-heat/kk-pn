import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function readSubmissions(fileName: string): Promise<unknown[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, fileName), "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function appendSubmission(fileName: string, body: Record<string, unknown>) {
  const submission = {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    ...body,
  };

  await fs.mkdir(DATA_DIR, { recursive: true });
  const submissions = await readSubmissions(fileName);
  submissions.push(submission);
  await fs.writeFile(
    path.join(DATA_DIR, fileName),
    JSON.stringify(submissions, null, 2),
    "utf-8"
  );

  return submission;
}
