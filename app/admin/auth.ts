import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_session";

export function getSessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(password).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = getSessionToken();
  if (!token) return false;
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === token;
}
