"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ButtonPostImage() {
  const { data: session } = useSession();
  const { push } = useRouter();

  return (
    <Link href={"/posting"}>
      <div className="bg-primary rounded-full px-6 py-2 text-xs font-bold hidden md:block w-fit text-center text-white">
        Posting
      </div>
    </Link>
  );
}
