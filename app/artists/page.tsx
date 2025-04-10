import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import ArtistsData from "@/components/ArtistsData";

export default async function Artists() {
  const session = await auth();
  if (session?.error === "RefreshTokenError" || !session?.user) {
    redirect("/signIn");
  }

  return (
    <div>
      <Header session={session} />
      <ArtistsData session={session} />
    </div>
  );
} 
