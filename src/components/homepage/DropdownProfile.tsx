"use client";

import { useUserData } from "@/hooks/useUserData";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../button/ModeToggle";
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

export default function DropdownProfile() {
  const { username, email } = useUserData();
  const { push } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Menu />
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
          <DropdownMenuItem onClick={() => push("/settings")}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ModeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
