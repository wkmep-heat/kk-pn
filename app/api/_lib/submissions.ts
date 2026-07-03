import { randomUUID } from "crypto";
import { del, get, list, put } from "@vercel/blob";

function folderFor(fileName: string) {
  return fileName.replace(/-submissions\.json$/, "");
}

export async function readSubmissions(fileName: string): Promise<unknown[]> {
  const prefix = `${folderFor(fileName)}/`;
  const { blobs } = await list({ prefix });

  const submissions = await Promise.all(
    blobs.map(async (blob) => {
      const result = await get(blob.pathname, { access: "private" });
      if (!result || result.statusCode !== 200) return null;
      const text = await new Response(result.stream).text();
      return JSON.parse(text) as Record<string, unknown>;
    })
  );

  return submissions
    .filter((s): s is Record<string, unknown> => s !== null)
    .sort((a, b) => String(a.submittedAt).localeCompare(String(b.submittedAt)));
}

export async function appendSubmission(fileName: string, body: Record<string, unknown>) {
  const submission = {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    ...body,
  };

  const prefix = folderFor(fileName);
  await put(`${prefix}/${submission.id}.json`, JSON.stringify(submission), {
    access: "private",
    contentType: "application/json",
  });

  return submission;
}

export async function deleteSubmission(fileName: string, id: string) {
  const prefix = folderFor(fileName);
  await del(`${prefix}/${id}.json`);
}
