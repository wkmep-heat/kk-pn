"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const messages: Record<string, string> = {
  questionnaire: "ส่งแบบสอบถามเรียบร้อยแล้ว ขอบคุณสำหรับข้อมูลของท่าน",
  interview: "ส่งแบบสัมภาษณ์เรียบร้อยแล้ว ขอบคุณสำหรับข้อมูลของท่าน",
  "field-survey": "ส่งแบบบันทึกการสำรวจเรียบร้อยแล้ว ขอบคุณสำหรับข้อมูลของท่าน",
};

export default function SubmittedNotice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submitted = searchParams.get("submitted");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (submitted && messages[submitted]) {
      setMessage(messages[submitted]);
      router.replace("/", { scroll: false });
    }
  }, [submitted, router]);

  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
          ✓
        </div>
        <p className="mt-4 font-medium text-black">{message}</p>
        <button
          type="button"
          onClick={() => setMessage(null)}
          className="mt-6 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80"
        >
          ปิด
        </button>
      </div>
    </div>
  );
}
