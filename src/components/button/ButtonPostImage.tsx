import { LucideUpload } from "lucide-react";
import Link from "next/link";

export default function ButtonPostImage() {
  return (
    <Link href={"/posting"}>
      <div className="gap-1 items-center bg-primary rounded-full px-5 py-2 text-xs font-bold hidden md:flex w-fit text-center text-white [&_svg]:w-5 [&_svg]:h-5">
        <LucideUpload />
        Posting
      </div>
    </Link>
  );
}
