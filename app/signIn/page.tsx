import SignIn from "@/components/SignIn";

export default async function SignInRedirect() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-6 h-screen">
      <span className="font-semibold text-4xl">Please Sign In to Spotify</span>
      <SignIn />
    </div>
  );
}
