"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useUserByUsername } from "../api/resolver/userResolver";
import { useDecodedToken } from "@/hooks/useDecodedToken";
import FormEditProfileUser from "@/components/form/formEditProfileUser";

const defaultValues: Partial<ProfileFormValues> = {
  username: "",
  fullname: "",
  email: "",
  bio: "I own a computer.",
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
};

export default function ProfileForm() {
  const { username } = useDecodedToken();
  const { data: profileUser, isLoading } = useUserByUsername(username);
  if (isLoading) return <p>load...</p>;

  const profile = profileUser.data.data;

  return <FormEditProfileUser profile={profile} />;
}
