import { getPublicUpload } from "../../../_lib/public-uploads";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const result = await getPublicUpload(id);
    if (!result || result.statusCode !== 200) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(result.stream, {
      status: 200,
      headers: {
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
