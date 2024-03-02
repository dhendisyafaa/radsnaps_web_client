"use client";
import { useUserByUsername } from "@/app/api/resolver/userResolver";
import ButtonReportIssue from "@/components/button/ButtonReportIssue";
import DrawerDialogEditProfile from "@/components/drawer/DrawerDialogEditProfile";
import DrawerDialogShare from "@/components/drawer/DrawerDialogShare";
import FormEditAvatar from "@/components/form/FormEditAvatar";
import AvatarUserComponent from "@/components/profile/AvatarUserComponent";
import TabsProfile from "@/components/profile/TabsProfile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserData } from "@/hooks/useUserData";
import {
  ChevronLeft,
  Link as LinkIcon,
  MoreHorizontal,
  Pencil,
  Verified,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

export default function ProfilePage({ params }) {
  const { username } = useUserData();
  const { push, back } = useRouter();
  const [drawerShare, setDrawerShare] = useState(false);
  const [drawerProfile, setDrawerProfile] = useState(false);
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
            <div
              className="flex items-center gap-2 cursor-pointer mb-6 group w-fit"
              onClick={() => back()}
            >
              <div className="rounded-full p-1 bg-secondary/50 group-hover:bg-secondary/30">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <p className="text-foreground font-semibold">Back</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="md:text-2xl text-xl text-foreground font-bold tracking-wide capitalize">
                {user.fullname}
              </p>
              {user.role === "ADMIN" && (
                <Badge className="w-fit p-1 rounded-full [&_svg]:w-4 [&_svg]:h-4">
                  <Verified />
                </Badge>
              )}
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
              @{user.username}
            </p>
          </div>
          <Dialog>
            <DialogTrigger className="relative overflow-hidden">
              <div className="text-primary-foreground absolute bottom-1 right-1 w-6 h-6 bg-primary rounded-full z-20 grid place-items-center [&_svg]:w-3">
                <Pencil />
              </div>
              <AvatarUserComponent
                imageUrl={user.avatar}
                withUsername={false}
                username={user.username}
                className="w-16 h-16 md:w-20 md:h-20 text-2xl md:text-4xl"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-3">Edit avatar</DialogTitle>
              </DialogHeader>
              <FormEditAvatar
                avatar={user.avatar}
                userId={user.id}
                username={user.username}
              />
            </DialogContent>
          </Dialog>
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
      {username === params.username ? (
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="w-full"
            variant={"outline"}
            onClick={() => setDrawerProfile(true)}
            // onClick={() => push("/settings")}
          >
            Edit profile
          </Button>
          <Button
            className="w-full"
            variant={"outline"}
            onClick={() => setDrawerShare(true)}
          >
            Share profile
          </Button>
        </div>
      ) : (
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => setDrawerShare(true)}
        >
          Share profile
        </Button>
      )}
      <DrawerDialogEditProfile
        open={drawerProfile}
        onOpenChange={setDrawerProfile}
        profile={user}
        title={"Edit your profile"}
        description={"Make sure the data you changed is correct"}
      />
      <DrawerDialogShare
        contentType={"user"}
        title="Share this profile user"
        description={`Share ${params.username} profile to people who want to see it`}
        open={drawerShare}
        onOpenChange={setDrawerShare}
        url={`${baseUrl}`}
      />
      <TabsProfile userId={user.id} />
    </div>
  );
}
