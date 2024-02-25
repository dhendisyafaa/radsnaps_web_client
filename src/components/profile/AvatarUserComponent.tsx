"use client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

export default function AvatarUserComponent({
  username,
  imageUrl,
  withUsername = true,
  className = "w-8 h-8",
}) {
  const { push } = useRouter();
  const firstLetterUsername = username?.split("", 1);

  return (
    <div
      className="flex gap-2 items-center border"
      onClick={() => push(`/profile/${username}`)}
    >
      <Avatar className={cn(className)}>
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback className="uppercase">
          {firstLetterUsername}
        </AvatarFallback>
      </Avatar>
      {withUsername && <p>{username}</p>}
    </div>
  );
}
