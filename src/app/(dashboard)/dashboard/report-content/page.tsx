"use client";
import { useAllReportIssues } from "@/app/api/resolver/reportIssueResolver";
import EmptyStateComponent from "@/components/common/EmptyStateComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  MessageCircleOff,
  TimerReset,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReportContentPage() {
  const [sorting, setSorting] = useState([]);
  const { push } = useRouter();
  const { data: reportIssues, isLoading } = useAllReportIssues();
  const reports = reportIssues?.data?.data;

  const columns = [
    {
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Content type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        );
      },
      accessorKey: "content_type",
    },
    {
      header: "Report message",
      accessorKey: "report_message",
      cell: ({ row }) => {
        return (
          <p className="w-72">
            {row.original.report_message.substring(0, 100)}
          </p>
        );
      },
    },
    {
      header: "Issues",
      accessorKey: "issue",
      cell: ({ row }) => {
        const issues = row?.original.issue;
        const sliceIssues = issues.slice(0, 2);
        const moreIssues = issues.length - sliceIssues.length;
        return (
          <div className="space-x-1 space-y-1 w-64 overflow-x-auto">
            {sliceIssues.map((issue, index) => (
              <Badge key={index}>{issue}</Badge>
            ))}
            {moreIssues > 2 && (
              <p className="text-xs inline-flex bg-secondary text-secondary-foreground p-1 rounded-full">
                +{moreIssues}
              </p>
            )}
          </div>
        );
      },
    },
    {
      header: ({ column }) => {
        return (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        );
      },
      accessorKey: "status_report",
      cell: ({ row }) => {
        const status = row.original.status_report;
        if (status === "pending") {
          return (
            <div className="flex items-center gap-1 text-green-500">
              <TimerReset className="w-4 h-4" />
              <p>pending</p>
            </div>
          );
        } else if (status === "closed") {
          return (
            <div className="flex items-center gap-1 text-gray-400">
              <MessageCircleOff className="w-4 h-4" />
              <p>closed</p>
            </div>
          );
        } else if (status === "deleted") {
          return (
            <div className="flex items-center gap-1 text-destructive">
              <TrashIcon className="w-4 h-4" />
              <p>deleted</p>
            </div>
          );
        }
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const status = row.original.status_report;
        const contentType = row.original.content_type;
        const contentId = row.original.content_id;
        const idReport = row.original.id;
        if (status === "pending") {
          return (
            <Button
              size={"default"}
              onClick={() =>
                push(
                  `/dashboard/report-content/response/${idReport}/${contentType}/${contentId}`
                )
              }
            >
              Response
            </Button>
          );
        } else if (status === "closed" || status === "deleted") {
          return (
            <Button
              size={"default"}
              variant={"outline"}
              onClick={() => push(`/report/${idReport}`)}
            >
              Review
            </Button>
          );
        }
      },
    },
  ];

  const table = useReactTable({
    data: reports,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div>
      {!isLoading ? (
        reports.length !== 0 ? (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="font-medium">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyStateComponent
            illustration={"/assets/svg/empty-report.svg"}
            titleMessage={"No content reported yet"}
            descriptionMessage={"User hasn't reported anything yet"}
            withButton={false}
          />
        )
      ) : (
        <p>load..</p>
      )}
    </div>
  );
}
