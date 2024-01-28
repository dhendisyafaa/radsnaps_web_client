"use client";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";
import { useRegisterUser } from "@/app/api/resolver/authResolver";

export default function UserRegisterForm() {
  const [loadingButton, setloadingButton] = React.useState<boolean>(false);
  const { mutateAsync: registerUser } = useRegisterUser();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const formSchema = z.object({
    fullname: z.string().min(2, {
      message: "Fullname wajib untuk diisi",
    }),
    username: z.string().min(2, {
      message: "Username wajib untuk diisi",
    }),
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
          title: "Yeay, berhasil membuat akun!",
          description: "Anda akan langsung diarahkan ke halaman gallery",
        });
        setloadingButton(false);
        push("/gallery/trending");
      } else {
        setloadingButton(false);
        toast({
          variant: "destructive",
          title: "Gagal untuk login!",
          description: "Email tidak ditemukan",
        });
      }
    } catch (error) {
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
            Create an account
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or sign up with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={loadingButton}>
        {
          loadingButton
            ? "load"
            : // <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              "github"
          // <Icons.gitHub className="mr-2 h-4 w-4" />
        }{" "}
        GitHub
      </Button>
    </div>
  );
}
