import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

const instance: PrismaClient | null = null;

function getPrismaClient() {
   if (instance === null) {
      return new PrismaClient({ log: env.NODE_ENV === "development" ? ["query"] : [] });
   }

   return instance;
}

export const db = getPrismaClient();
