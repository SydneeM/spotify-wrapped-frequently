import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import TracksData from "@/components/TracksData";

export default async function Tracks() {
  const session = await auth();
  if (session?.error === "RefreshTokenError" || !session?.user) {
    redirect("/signIn");
  }

  return (
    <div>
      <Header session={session} />
      <TracksData session={session} />
    </div>
  );
} 
