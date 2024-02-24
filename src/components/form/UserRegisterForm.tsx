"use client";
import { useRegisterUser } from "@/app/api/resolver/authResolver";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LoadingThreeDoots from "../common/loader/LoadingThreeDoots";
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

export default function UserRegisterForm() {
  const [loadingButton, setloadingButton] = React.useState<boolean>(false);
  const { mutateAsync: registerUser } = useRegisterUser();
  const { push } = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const params = searchParams.get("callbackUrl");
  const callbackUrl = params || "/gallery";

  const formSchema = z.object({
    fullname: z.string().min(2, {
      message: "Fullname is required",
    }),
    username: z.string().min(2, {
      message: "Username is required",
    }),
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
      fullname: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setloadingButton(true);
    try {
      await registerUser(values);
      const signInData = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (!signInData?.error) {
        toast({
          title: "Account created successfully!",
          description: "You will be directed to the gallery page",
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
            error.response?.data?.message || "Failed to create account"
          }`,
        });
      }
    }
  };

  return (
    <div className={cn("grid gap-6")}>
      <div className="text-sm flex items-center justify-center gap-1">
        <p>Already have an account?</p>
        <Link
          href={"/auth/login"}
          className="font-bold text-primary no-underline hover:underline"
        >
          Log in
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Dans Radcliffe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="dansradcliffe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loadingButton} className="w-full">
            {loadingButton ? (
              <LoadingThreeDoots color="#fff" />
            ) : (
              "Create an account"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
