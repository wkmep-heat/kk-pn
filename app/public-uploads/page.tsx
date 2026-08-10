"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteHeader from "../_components/SiteHeader";

type UploadItem = {
  id: string;
  filename: string;
  url: string;
};

export default function PublicUploadsPage() {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public-uploads")
      .then((res) => res.json())
      .then((data) => {
        setUploads(data);
      })
      .catch(() => {
        setStatus("ไม่สามารถโหลดภาพได้");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    setStatus("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setStatus("กรุณาเลือกไฟล์ภาพก่อนอัพโหลด");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setStatus("กำลังอัพโหลด...");
    const response = await fetch("/api/public-uploads", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      setStatus(result.error || "เกิดข้อผิดพลาดขณะอัพโหลด");
      return;
    }

    setUploads((current) => [result, ...current]);
    setFile(null);
    setStatus("อัพโหลดสำเร็จ! รูปภาพจะเป็นสาธารณะทันที");
  };

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <p className="text-sm text-black/40">
            <Link href="/" className="hover:underline">
              หน้าหลัก
            </Link>{" "}
            / ภาพกิจกรรมสาธารณะ
          </p>
          <h1 className="mt-4 text-3xl font-bold">อัพโหลดภาพกิจกรรม</h1>

          <div className="mt-8 rounded-[2rem] border border-green-700/20 bg-green-50/70 p-6">
            <p className="mb-4 text-sm text-green-900">
              เลือกรูปภาพที่ต้องการอัพโหลด เมื่ออัพโหลดแล้ว ภาพจะถูกเก็บเป็นสาธารณะและทุกคนสามารถดูได้จากหน้านี้
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black/80">ไฟล์รูปภาพ</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2 block w-full rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm text-black"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                อัพโหลดภาพ
              </button>
            </form>
            {status ? <p className="mt-3 text-sm text-black/70">{status}</p> : null}
          </div>

          <section className="mt-10">
            <h2 className="text-xl font-semibold">รูปภาพสาธารณะ</h2>
            {loading ? (
              <p className="mt-4 text-sm text-black/60">กำลังโหลดภาพ...</p>
            ) : uploads.length === 0 ? (
              <p className="mt-4 text-sm text-black/60">ยังไม่มีภาพกิจกรรม</p>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {uploads.map((upload) => (
                  <div key={upload.id} className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
                    <img
                      src={upload.url}
                      alt={upload.filename}
                      className="h-48 w-full object-cover"
                    />
                    <div className="px-4 py-3 text-center text-sm text-black/70">{upload.filename}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>

      <footer className="border-t border-black/10">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-xs text-black/40">
          © {new Date().getFullYear()} ภาคผนวก
        </div>
      </footer>
    </>
  );
}
