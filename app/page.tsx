import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Links from "@/components/Links";

const EXPIRATION_BUFFER_MS = 10000;

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signIn");
  }

  const expiredToken = Date.now() >= (session?.token_expires_at - EXPIRATION_BUFFER_MS);
  if (expiredToken) {
    redirect("/signIn");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-10 h-screen">
      <span className="font-semibold text-6xl text-center leading-18"> Spotify Wrapped <br /> Frequently</span>
      <Links />
    </div>
  );
}
