/**
 * 出勤ペース → 美容B 経費割合の純粋関数。
 *
 * 仕様:
 *   - 週5以上 (high)  → 70%
 *   - 週3-4  (medium) → 50%
 *   - 週1-2  (low)    → 20%
 *
 * 「割合をユーザーが変更するたびに数字を柔軟に変更できるよう、関数を使ってください」
 * という要件のため、定数表 `BEAUTY_B_RATIO_BY_WORK_FREQUENCY` を 1 箇所にまとめ、
 * UI / Server Action の双方からこの関数を経由して取得します。
 */

export const WORK_FREQUENCIES = ["high", "medium", "low"] as const;
export type WorkFrequency = (typeof WORK_FREQUENCIES)[number];

/** 出勤ペース → 美容B 経費割合 (0.0〜1.0)。書き換える場合はここを変える。 */
export const BEAUTY_B_RATIO_BY_WORK_FREQUENCY: Record<WorkFrequency, number> = {
  high: 0.7,
  medium: 0.5,
  low: 0.2,
};

/** 未回答時に返す値 (0%)。null/undefined を呼び出し側で気にしなくて済むように。 */
export const BEAUTY_B_RATIO_UNANSWERED = 0;

export function isWorkFrequency(value: unknown): value is WorkFrequency {
  return typeof value === "string" && (WORK_FREQUENCIES as readonly string[]).includes(value);
}

/**
 * 美容B の経費割合 (0.0〜1.0) を返す。
 * @param workFrequency `"high" | "medium" | "low"` もしくは未回答 (null/undefined)
 */
export function beautyBExpenseRatio(workFrequency: WorkFrequency | null | undefined): number {
  if (!workFrequency) return BEAUTY_B_RATIO_UNANSWERED;
  return BEAUTY_B_RATIO_BY_WORK_FREQUENCY[workFrequency];
}

/** UI 表示用に「70%」形式へ整形する。 */
export function formatBeautyBRatio(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}
