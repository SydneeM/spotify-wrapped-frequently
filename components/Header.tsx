import { auth } from "@/auth";
import SignOut from "./SignOut";
import Links from "./Links";

export default async function Header() {
  const session = await auth();
  if (!session?.user) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center p-8 border-b-1 border-foreground/20 relative">
      <div className="absolute top-4 left-4">
        {session.user &&
          <SignOut />
        }
      </div>
      <div className="flex flex-col gap-y-6 w-fit">
        <span className="flex font-semibold text-8xl">Spotify Wrapped</span>
        <Links />
      </div>
    </div>
  );
} 
