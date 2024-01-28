"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";
import Image from "next/image";

export default function UserLoginForm() {
  const [loadingButton, setloadingButton] = React.useState<boolean>(false);
  const { push } = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const params = searchParams.get("callbackUrl");
  const callbackUrl = params || "/gallery/trending";

  const formSchema = z.object({
    email: z
      .string()
      .min(2, {
        message: "Email wajib untuk diisi",
      })
      .email(),
    password: z.string().min(2, {
      message: "Password wajib untuk diisi",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      const signInData = await signIn("credentials", {
        ...values,
        redirect: false,
        callbackUrl,
      });
      if (!signInData?.error) {
        toast({
          title: "Yeay, berhasil login!",
          description: "Anda akan langsung diarahkan ke halaman gallery",
        });
        setloadingButton(false);
        push(callbackUrl);
      } else {
        setloadingButton(false);
        toast({
          variant: "destructive",
          title: "Gagal untuk login!",
          description: "Email tidak ditemukan",
        });
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      setloadingButton(false);
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${
            error.response?.data?.message || "Email atau kata sandi salah"
          }`,
        });
      }
    }
  };

  return (
    <div className={cn("grid gap-6")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="inforadcliffe@gmail.com"
                    {...field}
                  />
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
                  <Input
                    placeholder="Masukkan Kata Sandi"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loadingButton} className="w-full">
            {/* {loadingButton && <LoadingOval />} */}
            Sign in
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={loadingButton}
        onClick={() =>
          signIn("google", {
            callbackUrl,
            redirect: false,
          })
        }
        className="gap-2"
      >
        <Image
          src={"/assets/svg/google-icon.svg"}
          alt="google icon"
          width={20}
          height={20}
        />
        Google
      </Button>
    </div>
  );
}
