import SignIn from "@/components/SignIn";

export default async function SignInRedirect() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-10 h-screen">
      <span className="font-semibold text-6xl">Welcome Back</span>
      <SignIn />
    </div>
  );
}
