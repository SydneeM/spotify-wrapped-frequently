import { Session } from "next-auth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import SignOut from "./SignOut";
import Links from "./Links";

interface HeaderProps {
  session: Session;
}

export default async function Header({ session }: HeaderProps) {
  return (
    <div className="flex flex-col items-center p-8 border-b-1 border-foreground/15 relative mx-20">
      <div className="absolute top-9 left-0">
        {session.user &&
          <div className="flex flex-col w-30">
            <Menu>
              <MenuButton>
                <img className="h-12 rounded-3xl cursor-pointer" src={session.user.image ? session.user.image : "/placeholder.png"} alt={"Profile picture"} />
              </MenuButton>
              <MenuItems anchor="bottom" className="w-30">
                <MenuItem>
                  <SignOut />
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        }
      </div>
      <div className="flex flex-col gap-y-6 w-fit">
        <span className="flex font-semibold text-7xl">Spotify Wrapped</span>
        <Links />
      </div>
    </div>
  );
} 
