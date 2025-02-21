"use client";
import React, { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail } from "lucide-react";
import { PasswordInput } from "@/components/input/password-input";
import LoadingButton from "@/components/button/loading-button";
import loginSchema from "./lib/schema-login";
import { toast } from "sonner";
import { login } from "./action/login";
import GoogleLogin from "./google/google-button";

export default function FormLogin() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      try {
        const response = await login(values);

        if (response.error) {
          toast.error(response.error);
          return;
        }

        // Tampilkan toast success sebelum redirect
        toast.success("Berhasil masuk!");

        // Tunggu sebentar agar toast sempat muncul
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Redirect manual setelah toast
        window.location.href = "/dashboard";
      } catch (error) {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
        console.error("Login error:", error);
      }
    });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                type="submit"
                className="w-full"
                loading={isPending}
              >
                {isPending ? "Memproses..." : "Login"}
              </LoadingButton>
            </form>
          </Form>
          <GoogleLogin />
        </CardContent>
      </Card>
    </>
  );
}
