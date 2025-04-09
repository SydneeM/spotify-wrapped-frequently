import { auth } from "@/auth";
import SignIn from "@/components/SignIn";
import Links from "@/components/Links";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 h-screen">
      <span className="font-semibold text-6xl"> Welcome to Spotify Wrapped</span>
      {
        !session?.user ? (
          <SignIn />
        ) : (
          <Links />
        )
      }
    </div>
  );
}
