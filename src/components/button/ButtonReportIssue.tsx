import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonReportIssue({
  className,
  content_type,
  content_id,
  withTitle = true,
  withIcon = true,
  flexColLayout = true,
}) {
  const { push } = useRouter();
  return (
    <div
      onClick={() => push(`/report/report-issue/${content_type}/${content_id}`)}
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
