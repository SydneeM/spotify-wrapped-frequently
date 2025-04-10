import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Links from "@/components/Links";

export default async function Home() {
  const session = await auth();
  if (session?.error === "RefreshTokenError" || !session?.user) {
    redirect("/signIn");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 h-screen">
      <span className="font-semibold text-6xl"> Welcome to Spotify Wrapped</span>
      <Links />
    </div>
  );
}
