"use client";
import { useToast } from "@/components/ui/use-toast";
import { baseUrlWeb } from "@/configs/config";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LoadingThreeDoots from "../common/loader/LoadingThreeDoots";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function UserLoginForm() {
  const [loadingButton, setloadingButton] = React.useState<boolean>(false);
  const { push } = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const params = searchParams.get("callbackUrl");
  const callbackUrl =
    params === `${baseUrlWeb}/` ? `${baseUrlWeb}/gallery` : params;

  const Icon = Icons.google;

  const formSchema = z.object({
    email: z
      .string()
      .min(2, {
        message: "Email is required",
      })
      .email(),
    password: z
      .string()
      .min(2, {
        message: "Password is required",
      })
      .min(5, {
        message: "Password at least 5 characters",
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your email address"
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
                  <Input placeholder="*****" type="password" {...field} />
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
      {/* <div className="relative">
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
        <Icon height={20} width={20} />
        Google
      </Button> */}
    </div>
  );
}
