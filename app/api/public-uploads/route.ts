import { NextResponse } from "next/server";
import { listPublicUploads, savePublicUpload } from "../_lib/public-uploads";

export async function GET() {
  const uploads = await listPublicUploads();
  return NextResponse.json(
    uploads.map((upload) => ({
      id: upload.id,
      filename: upload.filename,
      url: `/api/public-uploads/image/${encodeURIComponent(upload.id)}`,
    }))
  );
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("image");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "กรุณาเลือกไฟล์ภาพ" }, { status: 400 });
  }

  const saved = await savePublicUpload(file, file.name, file.type || "application/octet-stream");

  return NextResponse.json(
    {
      id: saved.id,
      filename: saved.filename,
      url: `/api/public-uploads/image/${encodeURIComponent(saved.id)}`,
    },
    { status: 201 }
  );
}
