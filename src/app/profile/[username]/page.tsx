"use client";
import { useUserByUsername } from "@/app/api/resolver/userResolver";
import TabsProfile from "@/components/profile/TabsProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function ProfilePage() {
  const pathname = usePathname();
  const username = pathname.split("/")[2];
  const { push } = useRouter();
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useUserByUsername(username);

  if (isLoading) return <p>load...</p>;
  if (isError) return <p>error: {error}</p>;

  const user = userData.data.data;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="md:text-2xl text-xl text-foreground font-bold tracking-wide capitalize">
              {user.fullname}
            </p>
            <p className="text-sm text-foreground tracking-wide">
              {user.username}
            </p>
          </div>
          <Avatar className="w-16 h-16 md:w-20 md:h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-sm text-foreground tracking-wide">
          How to be brave?
        </p>
        <div className="max-w-sm">
          <Link href={"/"}>
            <div className="flex items-center gap-1 hover:cursor-pointer hover:underline hover:decoration-primary">
              <LinkIcon className="w-4 h-4" />
              <p className="text-sm text-foreground tracking-wide truncate">
                http://localhost:3000/profile/dhendisyafaa
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => push("/settings")}
        >
          Edit profile
        </Button>
        <Button className="w-full" variant={"outline"} onClick={() => {}}>
          Share profile
        </Button>
      </div>
      <TabsProfile user={user} />
    </div>
  );
}
