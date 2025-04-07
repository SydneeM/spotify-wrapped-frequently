import { auth } from "@/auth";
import TracksData from "@/components/TracksData";

export default async function Tracks() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div>
        User not signed in
      </div>
    );
  }

  return (
    <TracksData session={session} />
  );
} 
