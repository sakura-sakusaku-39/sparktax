/**
 * 依存追加を避けた軽量 clsx 実装。
 * 文字列・falsy 値を平坦化して結合する。
 */
export type ClsxValue = string | number | false | null | undefined;

export function clsx(...values: ClsxValue[]): string {
  return values
    .filter((v): v is string | number => Boolean(v))
    .map(String)
    .join(" ");
}
