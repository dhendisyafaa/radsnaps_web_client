import CardContentDashboard from "@/components/dashboard/content/CardContentDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GalleryHorizontal,
  GalleryHorizontalEnd,
  UsersRound,
} from "lucide-react";

export default function page() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardContentDashboard
            titleCard={"Total Users"}
            icon={<UsersRound />}
            content={"sdsd"}
          />
          <CardContentDashboard
            titleCard={"All Images"}
            icon={<GalleryHorizontal />}
            content={"sdsd"}
          />
          <CardContentDashboard
            titleCard={"All Albums"}
            icon={<GalleryHorizontalEnd />}
            content={"sdsd"}
          />
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
          <CardContentDashboard className="col-span-4" />
          <CardContentDashboard className="col-span-4 md:col-span-3" />
        </div>
      </TabsContent>
    </Tabs>
  );
}
