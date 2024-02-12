import UserRegisterForm from "@/components/form/UserRegisterForm";

export const metadata: Metadata = {
  title: "Create new account | Radsnaps",
  description: "Authentication forms built using the components.",
};

export default function RegisterPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create new account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your data below to create account
        </p>
      </div>
      <UserRegisterForm />
    </>
  );
}
