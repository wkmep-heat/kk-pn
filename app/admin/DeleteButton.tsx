"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type SubmissionType = "questionnaire" | "interview" | "field-survey";

export default function DeleteButton({ type, id }: { type: SubmissionType; id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("ต้องการลบข้อมูลนี้ใช่หรือไม่? การลบไม่สามารถกู้คืนได้")) return;

    setDeleting(true);
    const res = await fetch("/api/admin/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id }),
    });
    setDeleting(false);

    if (res.ok) {
      router.refresh();
    } else {
      alert("ลบข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="shrink-0 rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:border-red-400 hover:bg-red-50 disabled:opacity-50"
    >
      {deleting ? "กำลังลบ..." : "ลบ"}
    </button>
  );
}
