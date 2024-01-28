"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AlertDialogLogout from "../dialog/AlertDialogLogout";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
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

export default function ButtonCredentials() {
  const { data: session } = useSession();
  const { push } = useRouter();

  return (
    <div className="flex gap-1">
      {session ? (
        // FIX: change button to avatar and hamburger
        // <Button variant="ghost font-semibold" onClick={() => signOut()}>
        //   Logout
        // </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">shadcn</p>
                <p className="text-xs leading-none text-muted-foreground">
                  m@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem> */}
            <AlertDialog>
              <AlertDialogTrigger className="cursor-pointer select-none items-center px-2 py-1.5 text-sm">
                Sign out
              </AlertDialogTrigger>
              <AlertDialogLogout />
            </AlertDialog>
            {/* </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          className="rounded-full font-semibold px-8"
          onClick={() => signIn()}
        >
          Login
        </Button>
      )}
    </div>
  );
}
