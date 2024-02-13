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
import Link from "next/link";
import LoadingThreeDoots from "../common/loader/LoadingThreeDoots";

export default function UserLoginForm() {
  const [loadingButton, setloadingButton] = React.useState<boolean>(false);
  const { push } = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const params = searchParams.get("callbackUrl");
  const callbackUrl = params || "/gallery?filter=trending";

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
          title: "You are successfully logged in!",
        });
        setloadingButton(false);
        form.reset();
        push(callbackUrl);
      } else {
        setloadingButton(false);
        toast({
          variant: "destructive",
          title: "Failed to login!",
          description: "Email not found",
        });
      }
    } catch (error) {
      setloadingButton(false);
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${
            error.response?.data?.message || "Email or password is incorrect"
          }`,
        });
      }
    }
  };

  return (
    <div className={cn("grid gap-6")}>
      <div className="text-sm flex items-center justify-center gap-1">
        <p>Don&apos;t have an account? </p>
        <Link
          href={"/auth/register"}
          className="font-bold text-primary no-underline hover:underline"
        >
          Sign Up
        </Link>
      </div>
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
            {loadingButton ? <LoadingThreeDoots color="#fff" /> : "Sign in"}
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
