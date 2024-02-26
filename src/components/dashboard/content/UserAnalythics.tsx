"use client";
import { useUserAnalythics } from "@/app/api/resolver/dashboardResolver";
import SkeletonAnalythic from "@/components/common/skeleton/SkeletonAnalythic";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function UserAnalythics() {
  const { data: userAnalythicData, isLoading } = useUserAnalythics();
  if (isLoading) return <SkeletonAnalythic />;

  const data = userAnalythicData.data.data;
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
        />
        <YAxis stroke="#888888" fontSize={12} tickLine={true} axisLine={true} />
        <Bar
          dataKey="user_created"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
