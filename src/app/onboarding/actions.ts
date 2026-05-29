"use server";

/**
 * オンボーディング回答を DB に保存する Server Action。
 *
 * Server Action はブラウザ側に JS を送らずにサーバ上だけで実行されるため、
 * Prisma クライアントを直接呼び出しても安全です。
 * (秘密鍵などをクライアントへ漏らしません)
 */
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  beautyBExpenseRatio,
  isWorkFrequency,
  type WorkFrequency,
} from "@/lib/beautyExpense";
import { getOrCreateAnonId, readAnonId } from "@/lib/anonId";

export type FilingType = "blue" | "white" | "undecided";

export type OnboardingInput = {
  filingType: FilingType;
  workFrequency: WorkFrequency;
};

export type SaveOnboardingResult =
  | {
      ok: true;
      beautyBExpenseRatio: number;
    }
  | {
      ok: false;
      error: string;
    };

const FILING_TYPES: ReadonlyArray<FilingType> = ["blue", "white", "undecided"];

function isFilingType(value: unknown): value is FilingType {
  return typeof value === "string" && FILING_TYPES.includes(value as FilingType);
}

/**
 * 入力をバリデーション → 美容B割合を関数で導出 → DB に upsert。
 */
export async function saveOnboarding(input: OnboardingInput): Promise<SaveOnboardingResult> {
  if (!isFilingType(input.filingType)) {
    return { ok: false, error: "申告区分の値が不正です" };
  }
  if (!isWorkFrequency(input.workFrequency)) {
    return { ok: false, error: "出勤ペースの値が不正です" };
  }

  const ratio = beautyBExpenseRatio(input.workFrequency);
  const anonId = await getOrCreateAnonId();

  await prisma.onboardingAnswer.upsert({
    where: { anonId },
    create: {
      anonId,
      filingType: input.filingType,
      workFrequency: input.workFrequency,
      beautyBExpenseRatio: ratio,
    },
    update: {
      filingType: input.filingType,
      workFrequency: input.workFrequency,
      beautyBExpenseRatio: ratio,
    },
  });

  // ホーム画面などキャッシュを持っている画面に変更を反映
  revalidatePath("/");
  revalidatePath("/onboarding");
  revalidatePath("/onboarding/done");

  return { ok: true, beautyBExpenseRatio: ratio };
}

/**
 * 現在保存されている回答を返す。Server Component から呼ぶため、
 * Cookie の発行 (set) は行わない。未発行ユーザーは単に null を返す。
 */
export async function getMyOnboarding() {
  try {
    const anonId = await readAnonId();
    if (!anonId) return null;
    return await prisma.onboardingAnswer.findUnique({ where: { anonId } });
  } catch {
    return null;
  }
}
