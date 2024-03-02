import { cn } from "@/lib/utils";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

export default function ButtonDownloadImage({ className, imageUrl, filename }) {
  const saveFile = () => {
    saveAs(imageUrl, filename);
  };

  return (
    <div
      onClick={() => saveFile()}
      className={cn(
        `flex flex-col gap-1 items-center cursor-pointer`,
        className
      )}
    >
      <Download />
      <p className="text-foreground">Download</p>
    </div>
  );
}
