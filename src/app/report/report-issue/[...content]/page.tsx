"use client";

import { useContentReported } from "@/app/api/resolver/contentResolver";
import { useCreateReportIssue } from "@/app/api/resolver/reportIssueResolver";
import LoadingOval from "@/components/common/loader/LoadingOval";
import NavbarComponent from "@/components/homepage/NavbarComponent";
import ContentReportIssue from "@/components/report/ContentReportIssue";
import MultipleSelector from "@/components/ui/MultipleSelector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { REPORTISSUES } from "@/constants/data";
import { useUserData } from "@/hooks/useUserData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReportIssue({ params }) {
  const { toast } = useToast();
  const { user_id } = useUserData();
  const [issues, setIssues] = useState([]);
  const [reportMessage, setReportMessage] = useState();
  const { push } = useRouter();
  const content_type = params.content[0];
  const content_id = params.content[1];

  const { mutateAsync: generateReportIssue, isPending } =
    useCreateReportIssue();

  const getValueItem = (selectedItems) => {
    const valuesOnly = selectedItems.map((item) => item.value);
    setIssues(valuesOnly);
  };

  const onSubmit = async () => {
    try {
      const data = {
        user_id,
        content_type,
        content_id,
        issue: issues,
        report_message: reportMessage,
      };

      await generateReportIssue(data);
      toast({
        title: "We have received your report",
        description: "Your report will be considered immediately",
      });
      push("/gallery");
    } catch (error) {
      console.log("error:", error);
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${error.response?.data?.message || "Failed to create album"}`,
        });
      }
    }
  };

  return (
    <div className="md:container grid gap-6">
      <div className="border border-border rounded-lg w-full h-fit p-1">
        <ContentReportIssue
          content_type={content_type}
          content_id={content_id}
        />
      </div>
      <p className="font-semibold text-sm">Content type: {content_type}</p>
      <div className="flex flex-col justify-between min-h-[70vh] w-full">
        <div className="space-y-3">
          <div className="flex w-full flex-col">
            <Label>What kind of problem you are reporting?</Label>
            <MultipleSelector
              onChange={getValueItem}
              maxSelected={5}
              onMaxSelected={(maxLimit) => {
                toast({
                  title: `You can only choose ${maxLimit} issues`,
                });
              }}
              defaultOptions={REPORTISSUES}
              placeholder="Select the issue you want to report..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no issues found.
                </p>
              }
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="report_message">Report message</Label>
            <Textarea
              placeholder="Type your report message here."
              id="report_message"
              value={reportMessage}
              onChange={(e) => setReportMessage(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Your message will be copied to the support team.
            </p>
          </div>
        </div>
        <Button
          disabled={isPending}
          onClick={onSubmit}
          className="w-full md:w-fit md:absolute md:top-3 bottom-0 md:right-5 z-50 border"
        >
          {isPending && <LoadingOval className={"mr-3"} />}
          Submit report
        </Button>
      </div>
    </div>
  );
}
