import { auth } from "@/auth";
import ArtistsData from "@/components/ArtistsData";

export default async function Artists() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div>
        User not signed in
      </div>
    );
  }

  return (
    <ArtistsData session={session} />
  );
} 
