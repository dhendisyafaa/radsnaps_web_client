import Image from "next/image";
import Link from "next/link";

export default function LayoutAuth({ children }) {
  return (
    <div className="h-screen w-full grid md:grid-cols-2">
      <div className="relative hidden md:block">
        <Image
          src="/assets/image/login-bg.jpg"
          fill
          quality={1}
          alt="Authentication"
          className="object-cover"
        />
      </div>
      <div className="container grid place-items-center overflow-y-auto">
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px] py-12">
          {children}
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
