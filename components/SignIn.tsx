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
        className="flex rounded-4xl bg-accent text-background justify-center w-40 p-3 font-semibold text-lg cursor-pointer hover:bg-[#3be477]"
        type="submit">
        Sign In
      </button>
    </form>
  )
} 
