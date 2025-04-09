import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("spotify", { redirectTo: "/artists" });
      }}
    >
      <button
        className="flex rounded-lg bg-foreground/5 justify-center w-40 p-3 font-semibold text-lg cursor-pointer hover:bg-foreground/10"
        type="submit">
        Sign In
      </button>
    </form>
  )
} 
