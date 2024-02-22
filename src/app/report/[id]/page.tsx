"use client";
import { useReportById } from "@/app/api/resolver/reportIssueResolver";
import ContentReportIssue from "@/components/report/ContentReportIssue";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { relativeTimeSuffix } from "@/utils/relativeTime";
import React from "react";

export default function DetailReportIssue({ params }) {
  const { data: detailReport, isLoading } = useReportById(params.id);
  if (isLoading) return <p>load...</p>;

  const report = detailReport.data.data;

  return (
    <div className="space-y-4 p-1 pb-10">
      <div className="border border-border rounded-lg w-full h-fit p-1">
        <ContentReportIssue
          content_type={report.content_type}
          content_id={report.content_id}
        />
      </div>
      <p className="font-semibold text-sm">
        Content type: {report.content_type}
      </p>
      <p className="font-semibold text-sm">
        Report created: {relativeTimeSuffix(report.created_at)}
      </p>
      <div className="flex gap-1 items-center">
        <p className="font-semibold text-sm">Issues:</p>
        <div className="space-x-1 space-y-1">
          {report.issue.map((issue, index) => (
            <Badge key={index}>{issue}</Badge>
          ))}
        </div>
      </div>
      <div className="font-semibold text-sm p-3 border rounded-md">
        <p>Report message</p>
        <div className="font-normal">{report.report_message}</div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-dashed" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Radsnaps&apos; response to your report
          </span>
        </div>
      </div>
      <div className="font-semibold text-sm p-3 border rounded-md">
        {report.response !== null ? (
          <>
            <p>
              Response message{" • "}
              <span className="text-xs text-secondary-foreground">
                {relativeTimeSuffix(report.response.created_at)}
              </span>
            </p>
            <div className="font-normal">
              {report.response.response_message}
            </div>
          </>
        ) : (
          <p className="text-center">No response from radsnaps yet</p>
        )}
      </div>
    </div>
  );
}
