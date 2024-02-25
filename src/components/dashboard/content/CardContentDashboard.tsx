import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/utils/formatNumber";

export default function CardContentDashboard({ content, loading }) {
  if (loading) return <Skeleton className="w-full h-4" />;
  const contentCard = content.data.data;

  return (
    <div className="">
      <p className="font-bold text-lg md:text-2xl">
        {formatNumber(contentCard)}
      </p>
      <p className="text-xs text-muted-foreground">from this admin created</p>
    </div>
  );
}
