import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { cn } from "@/lib/utils";

export default function CardContentDashboard({
  className,
  icon,
  titleCard,
  content,
}) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{titleCard}</CardTitle>
        <div className="[&_svg]:h-4 [&_svg]:w-4">{icon}</div>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
