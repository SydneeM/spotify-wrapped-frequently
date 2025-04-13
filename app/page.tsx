import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignIn from "@/components/SignIn";
import Links from "@/components/Links";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center gap-y-10 h-screen">
      <span className="font-semibold text-6xl text-center leading-18"> Spotify Wrapped <br /> Frequently</span>
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
