"use client";

import {
  useTotalAlbums,
  useTotalImages,
  useTotalUsers,
} from "@/app/api/resolver/dashboardResolver";
import CardContentDashboard from "@/components/dashboard/content/CardContentDashboard";
import CardDashboard from "@/components/dashboard/content/CardDashboard";
import UserAnalythics from "@/components/dashboard/content/UserAnalythics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GalleryHorizontal,
  GalleryHorizontalEnd,
  UsersRound,
} from "lucide-react";

export default function DashboardPage() {
  const { data: totalUsers, isLoading: loadTotalUsers } = useTotalUsers();
  const { data: totalImages, isLoading: loadTotalImages } = useTotalImages();
  const { data: totalAlbums, isLoading: loadTotalAlbums } = useTotalAlbums();

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardDashboard
            titleCard={"Total Users"}
            icon={<UsersRound />}
            content={
              <CardContentDashboard
                content={totalUsers}
                loading={loadTotalUsers}
              />
            }
          />
          <CardDashboard
            titleCard={"All Images"}
            icon={<GalleryHorizontal />}
            content={
              <CardContentDashboard
                content={totalImages}
                loading={loadTotalImages}
              />
            }
          />
          <CardDashboard
            titleCard={"All Albums"}
            icon={<GalleryHorizontalEnd />}
            content={
              <CardContentDashboard
                content={totalAlbums}
                loading={loadTotalAlbums}
              />
            }
          />
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User Analythics</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <UserAnalythics />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
