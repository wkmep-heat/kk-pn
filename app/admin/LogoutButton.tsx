"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="text-sm text-black/50 hover:underline">
      ออกจากระบบ
    </button>
  );
}
