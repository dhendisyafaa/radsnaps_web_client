import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonReportIssue({
  className,
  content_type,
  content_id,
  withTitle = true,
}) {
  const { push } = useRouter();
  return (
    <div
      onClick={() => push(`/report/report-issue/${content_type}/${content_id}`)}
      className={cn(
        `flex flex-col gap-1 items-center text-[8px] cursor-pointer`,
        className
      )}
    >
      <Flag />
      {withTitle && <p className="text-primary-foreground">Report</p>}
    </div>
  );
}
