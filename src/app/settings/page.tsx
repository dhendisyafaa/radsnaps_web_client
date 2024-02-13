"use client";

import FormEditProfileUser from "@/components/form/formEditProfileUser";
import { useUserData } from "@/hooks/useUserData";
import { useUserByUsername } from "../api/resolver/userResolver";

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
  const { username } = useUserData();
  const { data: profileUser, isLoading } = useUserByUsername(username);
  if (isLoading) return <p>load...</p>;

  const profile = profileUser.data.data;

  return <FormEditProfileUser profile={profile} />;
}
