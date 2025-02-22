import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import loginSchema from "./app/(auth)/auth/_components/lib/schema-login";
import { prismaDB } from "./lib/prisma";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        const user = await prismaDB.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true,
            image: true,
          },
        });

        if (!user || !user.password || !user.email) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (account && account.type === "oauth" && user) {
        token.image = user.image; // Pastikan image tersimpan di token
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (user) {
        // Pastikan tipe data
        return {
          ...token,
          role: user.role as string,
          id: user.id as string,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role as string,
          id: token.id as string,
        },
      };
    },
  },
} satisfies NextAuthConfig;
