"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Links() {
  const pathname = usePathname();
  return (
    <div className="flex flex-row justify-center gap-x-4">
      <Link className={`flex rounded-lg bg-foreground/5 justify-center w-40 p-3 font-semibold text-lg ${pathname === "/artists" ? "bg-foreground/15" : ""}`} href="/artists">Artists</Link>
      <Link className={`flex rounded-lg bg-foreground/5 justify-center w-40 p-3 font-semibold text-lg ${pathname === "/tracks" ? "bg-foreground/15" : ""}`} href="/tracks">Tracks</Link>
    </div>
  );
} 
