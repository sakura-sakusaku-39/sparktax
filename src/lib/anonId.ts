/**
 * 認証実装前の暫定ユーザー識別子。
 *
 * Cookie に `sparktax_anon_id` をセットして、再アクセスでも同じ人として扱う。
 * 本物の認証 (NextAuth など) を入れたら、この層を `session.userId` に置き換えるだけで
 * 上位の Server Action はそのまま動きます。
 */
import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE_NAME = "sparktax_anon_id";
/** 1 年 */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

/** 既存があれば返し、なければ新規発行して書き込む。Server Action / Route Handler から使う。 */
export async function getOrCreateAnonId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(COOKIE_NAME);
  if (existing?.value) return existing.value;

  const fresh = crypto.randomUUID();
  store.set(COOKIE_NAME, fresh, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  return fresh;
}

/** Read 専用 (発行はしない)。Server Component で現在値を覗く時に。 */
export async function readAnonId(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}
