/**
 * Prisma クライアントのシングルトン。
 *
 * Next.js の dev サーバはホットリロードのたびにモジュールを再読込するため、
 * 何も対策しないと毎回新しい PrismaClient が生成されてコネクションが枯渇します。
 * グローバルに 1 個だけ保持しておくのが Prisma 公式推奨パターンです。
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
