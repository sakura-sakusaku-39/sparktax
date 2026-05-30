/**
 * 経費カテゴリの単一情報源 (Next.js版)。
 * Vite版 shared/categories.ts の最小サブセット。
 */

export const EXPENSE_CATEGORY_IDS = [
  "beauty_a",
  "beauty_b",
  "costume",
  "transport",
  "gift",
  "communication",
  "supplies",
  "other",
] as const;

export type ExpenseCategoryId = (typeof EXPENSE_CATEGORY_IDS)[number];

export type ExpenseCategoryMeta = {
  id: ExpenseCategoryId;
  label: string;
  description: string;
  color: string;
  emoji: string;
  icon: string;
};

export const EXPENSE_CATEGORIES: ExpenseCategoryMeta[] = [
  { id: "beauty_a", label: "美容A", description: "ヘア・メイク・ネイル", color: "#FF8FA3", emoji: "💄" , icon: "/icons/icon-beauty.svg" },
  { id: "beauty_b", label: "美容B", description: "脱毛・エステ・スキンケア", color: "#FFB199", emoji: "✂️", icon: "/icons/icon-beauty.svg" },
  { id: "costume", label: "衣装", description: "ドレス・下着・小物", color: "#C792EA", emoji: "👗" , icon: "/icons/icon-fashion.svg" },
  { id: "transport", label: "交通費", description: "タクシー・電車・送迎", color: "#82C7FF", emoji: "🚕" , icon: "/icons/icon-transport.svg" },
  { id: "gift", label: "贈答・接待", description: "プレゼント・差し入れ", color: "#7FE3D4", emoji: "🎁" , icon: "/icons/icon-gift.svg" },
  { id: "communication", label: "通信費", description: "携帯・ネット", color: "#FFD66B", emoji: "📱" , icon: "/icons/icon-phone.svg" },
  { id: "supplies", label: "備品", description: "仕事の道具", color: "#A0C4FF", emoji: "🛠️" , icon: "/icons/icon-supplies.svg" },
  { id: "other", label: "その他", description: "上記以外の業務関連", color: "#9FA8B7", emoji: "🏷️" , icon: "/icons/icon-other.svg" },
];

export const CATEGORY_BY_ID: Record<ExpenseCategoryId, ExpenseCategoryMeta> = Object.fromEntries(
  EXPENSE_CATEGORIES.map((c) => [c.id, c]),
) as Record<ExpenseCategoryId, ExpenseCategoryMeta>;

export function isExpenseCategoryId(value: unknown): value is ExpenseCategoryId {
  return typeof value === "string" && (EXPENSE_CATEGORY_IDS as readonly string[]).includes(value);
}

export function categoryLabel(id: string): string {
  return isExpenseCategoryId(id) ? CATEGORY_BY_ID[id].label : id;
}

export function categoryColor(id: string): string {
  return isExpenseCategoryId(id) ? CATEGORY_BY_ID[id].color : "#9FA8B7";
}
