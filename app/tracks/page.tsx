import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import TracksData from "@/components/TracksData";

const EXPIRATION_BUFFER_MS = 10000;

export default async function Tracks() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signIn");
  }

  const expiredToken = Date.now() >= (session?.token_expires_at - EXPIRATION_BUFFER_MS);
  if (expiredToken) {
    redirect("/signIn");
  }

  return (
    <div>
      <Header session={session} />
      <TracksData session={session} />
    </div>
  );
} 
