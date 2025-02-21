import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prismaDB } from "./lib/prisma";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prismaDB) as any, // Temporary type assertion
  session: { strategy: "jwt" },
  ...authConfig,
});
