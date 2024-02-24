"use client";

import { useUserData } from "@/hooks/useUserData";
import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function ButtonReportIssue({
  className,
  content_type,
  content_id,
  withTitle = true,
  withIcon = true,
  flexColLayout = true,
}) {
  const { push } = useRouter();
  const { status } = useUserData();

  const handleReportContent = () => {
    if (status === "authenticated")
      return push(`/report/report-issue/${content_type}/${content_id}`);
    else if (status === "unauthenticated") return signIn();
  };

  return status === "loading" ? (
    <Skeleton className="w-8 h-8 rounded-full" />
  ) : (
    <div
      onClick={() => handleReportContent()}
      className={cn(
        `flex gap-1 items-center text-[8px] cursor-pointer`,
        flexColLayout && "flex-col",
        className
      )}
    >
      {withIcon && <Flag />}
      {withTitle && <p className="text-foreground">Report</p>}
    </div>
  );
}
