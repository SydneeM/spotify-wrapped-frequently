import { signOut } from "@/auth";

export default function SignOut() {
  return (
    <button
      type="button"
      className="bg-foreground/5 hover:bg-foreground/10 justify-start w-full p-2 mt-2 rounded-lg text-center font-semibold cursor-pointer"
      onClick={async () => {
        "use server";
        await signOut();
      }}
    >
      Log Out
    </button>
  );
}
