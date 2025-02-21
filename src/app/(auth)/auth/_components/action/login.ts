"use server";

import { prismaDB } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import loginSchema from "../lib/schema-login";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    // Validasi input
    const validateFields = loginSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "Data yang dimasukkan tidak valid" };
    }

    const { email, password } = validateFields.data;

    // Cek keberadaan user
    const userExists = await prismaDB.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    // Cek apakah user ditemukan dan memiliki password
    if (!userExists?.email) {
      return { error: "Email tidak terdaftar" };
    }
    if (!userExists?.password) {
      return { error: "Email atau password salah" };
    }

    // Verifikasi password menggunakan bcrypt
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
      return { error: "Password salah" };
    }

    // Proses login jika password valid
    try {
      await signIn("credentials", {
        email: userExists.email,
        password: password,
        redirect: false,
      });

      return { success: "Login berhasil" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email atau password salah" };
          default:
            return { error: "Terjadi kesalahan pada autentikasi" };
        }
      }
      throw error;
    }
  } catch (error) {
    console.error("Error pada proses login:", error);
    return { error: "Terjadi kesalahan pada sistem" };
  }
};
