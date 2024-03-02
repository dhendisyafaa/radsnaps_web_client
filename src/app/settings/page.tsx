"use client";

import LoadingThreeDoots from "@/components/common/loader/LoadingThreeDoots";
import FormEditProfileUser from "@/components/form/FormEditProfile";
import { useUserData } from "@/hooks/useUserData";
import { useUserByUsername } from "../api/resolver/userResolver";

export default function ProfileForm() {
  const { username } = useUserData();
  const { data: profileUser, isLoading } = useUserByUsername(username);
  if (isLoading)
    return (
      <div className="flex justify-center">
        <LoadingThreeDoots />
      </div>
    );

  const profile = profileUser.data.data;

  return <FormEditProfileUser profile={profile} />;
}
