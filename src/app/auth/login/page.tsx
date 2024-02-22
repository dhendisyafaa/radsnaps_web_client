import UserLoginForm from "@/components/form/UserLoginForm";

export const metadata: Metadata = {
  title: "Login to your account | Radsnaps",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login to <span className="text-primary">Radsnaps</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password below to access gallery
        </p>
      </div>
      <UserLoginForm />
    </>
  );
}
