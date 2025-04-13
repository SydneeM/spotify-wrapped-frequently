import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import ArtistsData from "@/components/ArtistsData";

const EXPIRATION_BUFFER_MS = 10000;

export default async function Artists() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const expiredToken = Date.now() >= (session?.token_expires_at - EXPIRATION_BUFFER_MS);
  if (expiredToken) {
    redirect("/signIn");
  }

  return (
    <div>
      <Header session={session} />
      <ArtistsData session={session} />
    </div>
  );
} 
