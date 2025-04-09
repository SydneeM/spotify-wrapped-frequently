import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import ArtistsData from "@/components/ArtistsData";

export default async function Artists() {
  const session = await auth();
  if (session?.error === "RefreshTokenError") {
    await signIn("spotify");
  }

  if (!session?.user) {
    redirect("/");
  }

  return (
    <ArtistsData session={session} />
  );
} 
