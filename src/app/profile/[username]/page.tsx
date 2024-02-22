"use client";
import { useUserByUsername } from "@/app/api/resolver/userResolver";
import ButtonReportIssue from "@/components/button/ButtonReportIssue";
import ButtonShare from "@/components/button/ButtonShare";
import DrawerDialogShare from "@/components/drawer/DrawerShareContent";
import TabsProfile from "@/components/profile/TabsProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserData } from "@/hooks/useUserData";
import { Link as LinkIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage({ params }) {
  const { username } = useUserData();
  const { push } = useRouter();
  const [drawerShare, setDrawerShare] = useState(false);
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useUserByUsername(params.username);

  if (isLoading) return <p>load...</p>;
  if (isError) return <p>error: {error}</p>;

  const user = userData.data.data;
  const baseUrl = window.location;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex gap-3 items-center">
              <p className="md:text-2xl text-xl text-foreground font-bold tracking-wide capitalize">
                {user.fullname}
              </p>
              {username !== params.username && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="[&_svg]:w-4 [&_svg]:h-4">
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-3">
                    <ButtonReportIssue
                      content_id={user.username}
                      content_type={"user"}
                      flexColLayout={false}
                      className={"[&_svg]:w-6 [&_svg]:h-6 text-sm"}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <p className="text-sm text-foreground tracking-wide">
              {user.username}
            </p>
          </div>
          <Avatar className="w-16 h-16 md:w-20 md:h-20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-sm text-foreground tracking-wide">{user?.bio}</p>
        <div className="max-w-fit">
          {user?.links.map((link, index) => {
            return (
              <Link key={index} href={link}>
                <div className="flex items-center gap-1 hover:cursor-pointer hover:underline hover:decoration-primary">
                  <LinkIcon className="w-4 h-4" />
                  <p className="text-sm text-foreground tracking-wide truncate">
                    {link}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {username === params.username && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="w-full"
            variant={"outline"}
            onClick={() => push("/settings")}
          >
            Edit profile
          </Button>
          <DrawerDialogShare
            contentType={"user"}
            title="Share this profile user"
            description={`Share ${params.username} profile to people who want to see it`}
            open={drawerShare}
            onOpenChange={setDrawerShare}
            url={`${baseUrl}`}
          />
          <Button
            className="w-full"
            variant={"outline"}
            onClick={() => setDrawerShare(true)}
          >
            Share profile
          </Button>
        </div>
      )}
      <TabsProfile />
    </div>
  );
}
