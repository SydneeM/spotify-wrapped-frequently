import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import TracksData from "@/components/TracksData";

export default async function Tracks() {
  const session = await auth();
  if (session?.error === "RefreshTokenError") {
    await signIn("spotify");
  }

  if (!session?.user) {
    redirect("/");
  }

  return (
    <TracksData session={session} />
  );
} 
