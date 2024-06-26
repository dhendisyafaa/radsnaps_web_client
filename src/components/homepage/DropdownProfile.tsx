"use client";

import { useAvatarUser } from "@/app/api/resolver/userResolver";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/navigation";
import ButtonSignOut from "../button/ButtonSignOut";
import { ModeToggle } from "../button/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import AvatarUserComponent from "../profile/AvatarUserComponent";

export default function DropdownProfile() {
  const { username, email, user_id } = useUserData();
  const { data: avatarUser, isLoading } = useAvatarUser(user_id);
  const { push } = useRouter();

  const firstLetterUsername = username?.split("", 1);

  if (isLoading) return <Skeleton className="w-8 h-8 rounded-full" />;
  const avatar = avatarUser?.data.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <AvatarUserComponent
            withUsername={false}
            imageUrl={avatar.avatar}
            username={username}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="hidden md:block"
            onClick={() => push(`/profile/${username}`)}
          >
            Profile
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => push("/settings")}>
            Settings
          </DropdownMenuItem> */}
          <ButtonSignOut />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ModeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
