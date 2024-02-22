import { cn } from "@/lib/utils";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function LoadingThreeDoots({ className, color = "#7c3aed" }) {
  return (
    <div className={cn(className)}>
      <ThreeDots
        visible={true}
        height="15"
        width="15"
        color={color}
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
