import Link from "next/link";

export default function ButtonPostImage() {
  return (
    <Link href={"/posting"}>
      <div className="bg-primary rounded-full px-6 py-2 text-xs font-bold hidden md:block w-fit text-center text-white">
        Posting
      </div>
    </Link>
  );
}
