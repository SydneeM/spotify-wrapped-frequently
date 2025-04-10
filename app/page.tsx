import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignIn from "@/components/SignIn";
import Links from "@/components/Links";

export default async function Home() {
  const session = await auth();
  if (session?.error === "RefreshTokenError") {
    redirect("/signIn");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 h-screen">
      <span className="font-semibold text-6xl text-center"> Spotify Wrapped <br /> Frequently</span>
      {
        !session?.user ? (
          <SignIn />
        ) : (
          <Links />
        )
      }
    </div>
  );
}
