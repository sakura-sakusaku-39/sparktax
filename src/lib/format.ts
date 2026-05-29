/**
 * 数値・日付の表示用ヘルパー。
 */

const yenFormatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

export function formatYen(amount: number): string {
  return yenFormatter.format(amount);
}

export function toDateInputValue(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayInputValue(): string {
  return toDateInputValue(new Date());
}

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(d: Date | number | string): string {
  const date = d instanceof Date ? d : new Date(d);
  return dateFormatter.format(date);
}
