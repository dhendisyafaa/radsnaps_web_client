"use client";

import { useDeleteContentReported } from "@/app/api/resolver/contentResolver";
import {
  useCreateResponseReport,
  useReportById,
} from "@/app/api/resolver/responseReportResolver";
import ContentReportIssue from "@/components/report/ContentReportIssue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateResponseReport({ params }) {
  const report_id = params.content[0];
  const content_type = params.content[1];
  const content_id = params.content[2];
  const {
    mutateAsync: generateResponseReport,
    isPending: loadingGenerateResponse,
  } = useCreateResponseReport();
  const {
    mutateAsync: deleteContentReported,
    isPending: loadingDeleteContent,
  } = useDeleteContentReported();
  const { data: reportData, isLoading } = useReportById(report_id);
  const { toast } = useToast();
  const { push } = useRouter();
  const [dialogDeleteContent, setDialogDeleteContent] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const { user_id } = useUserData();

  const handleCloseReport = async () => {
    try {
      const data = {
        admin_id: user_id,
        response_message: responseMessage,
        change_status: "closed",
        report_id,
      };
      await generateResponseReport(data);
      toast({
        title: "Report was closed successfully!",
      });
      push("/dashboard/report-content");
    } catch (error) {
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${error.response?.data?.message || "Report failed to close"}`,
        });
      }
    }
  };

  const handleDeleteContent = async () => {
    try {
      const data = {
        admin_id: user_id,
        response_message: responseMessage,
        change_status: "deleted",
        report_id,
      };
      await generateResponseReport(data);
      await deleteContentReported({
        endpoint: content_type,
        id: content_id,
      });
      toast({
        title: "Report was closed successfully!",
        description: "Corresponding content has been deleted",
      });
      push("/dashboard/report-content");
    } catch (error) {
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${
            error.response?.data?.message ||
            "response failed to be created and content cannot be deleted"
          }`,
        });
      }
    }
  };

  if (isLoading) return <p>load...</p>;

  const report = reportData?.data?.data;

  return (
    <>
      <AlertDialog
        open={dialogDeleteContent}
        onOpenChange={setDialogDeleteContent}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={loadingGenerateResponse || loadingDeleteContent}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={loadingGenerateResponse || loadingDeleteContent}
              onClick={handleDeleteContent}
              className={buttonVariants({
                variant: "destructive",
              })}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="space-y-6 p-1 pb-10">
        <div className="border border-border rounded-lg w-full h-fit p-1">
          <ContentReportIssue
            content_type={content_type}
            content_id={content_id}
          />
        </div>
        <p className="font-semibold text-sm">Content type: {content_type}</p>
        <div className="flex gap-1 items-center">
          <p className="font-semibold text-sm">Issues:</p>
          <div className="space-x-1 space-y-1">
            {report.issue.map((issue, index) => (
              <Badge key={index}>{issue}</Badge>
            ))}
          </div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Report message</Label>
          <Textarea
            disabled
            value={report.report_message}
            className="min-h-72 md:min-h-44 resize-none"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-dashed" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Give feedback on this report
            </span>
          </div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Your response message</Label>
          <Textarea
            disabled={loadingGenerateResponse || loadingDeleteContent}
            placeholder="Type your response message here."
            onChange={(e) => setResponseMessage(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-1">
          <Button
            variant={"secondary"}
            onClick={handleCloseReport}
            disabled={loadingGenerateResponse || loadingDeleteContent}
          >
            Close report
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => setDialogDeleteContent(true)}
            disabled={loadingGenerateResponse || loadingDeleteContent}
          >
            Delete content
          </Button>
        </div>
      </div>
    </>
  );
}
