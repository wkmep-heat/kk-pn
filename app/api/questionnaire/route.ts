import { NextRequest, NextResponse } from "next/server";
import { appendSubmission } from "../_lib/submissions";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  await appendSubmission("questionnaire-submissions.json", body);

  return NextResponse.json({ ok: true });
}
