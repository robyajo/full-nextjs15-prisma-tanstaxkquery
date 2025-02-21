"use server";

import registerSchema from "@/app/(auth)/auth/_components/lib/schema-register";
import { prismaDB } from "@/lib/prisma";
import bcrypt, { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      error: "Invalid fields",
    };
  }
  const { name, email, password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prismaDB.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "Email already exists" };
  }
  await prismaDB.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return { success: "User registered successfully" };
};
