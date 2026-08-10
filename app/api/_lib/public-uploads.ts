import { randomUUID } from "crypto";
import { get, list, put } from "@vercel/blob";

const PUBLIC_FOLDER = "public-uploads";

export type PublicUploadEntry = {
  id: string;
  filename: string;
  contentType?: string;
};

export async function listPublicUploads(): Promise<PublicUploadEntry[]> {
  const { blobs } = await list({ prefix: `${PUBLIC_FOLDER}/` });
  return blobs.map((blob) => {
    const id = blob.pathname.slice(`${PUBLIC_FOLDER}/`.length);
    return {
      id,
      filename: id.replace(/^[^-]+-/, ""),
    };
  });
}

export async function savePublicUpload(
  file: Blob,
  filename: string,
  contentType: string
) {
  const id = randomUUID();
  const sanitized = filename
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.\-_]/g, "")
    .slice(0, 100) || "upload";
  const key = `${id}-${sanitized}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await put(`${PUBLIC_FOLDER}/${key}`, buffer, {
    access: "public",
    contentType,
  });

  return {
    id: key,
    filename: sanitized,
    contentType,
  };
}

export async function getPublicUpload(name: string) {
  return await get(`${PUBLIC_FOLDER}/${name}`, { access: "public" });
}
