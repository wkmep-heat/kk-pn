import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/admin/auth";
import { deleteSubmission } from "../../_lib/submissions";

const FILE_NAMES: Record<string, string> = {
  questionnaire: "questionnaire-submissions.json",
  interview: "interview-submissions.json",
  "field-survey": "field-survey-submissions.json",
};

export async function DELETE(request: NextRequest) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const type = typeof body?.type === "string" ? body.type : "";
  const id = typeof body?.id === "string" ? body.id : "";
  const fileName = FILE_NAMES[type];

  if (!fileName || !id) {
    return NextResponse.json({ ok: false, error: "invalid request" }, { status: 400 });
  }

  await deleteSubmission(fileName, id);

  return NextResponse.json({ ok: true });
}
