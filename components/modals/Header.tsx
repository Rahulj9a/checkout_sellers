import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import AvatarModal from "@/components/modals/AvatarModal";
import { signOut } from "next-auth/react";

export default function Header() {
  return (
     
      <Menubar className="flex">
        <div className="flex-1">

        </div>
        <div className="flex-none">
          <MenubarMenu>
            <MenubarTrigger>
              <AvatarModal />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Profile</MenubarItem>
              <MenubarItem>Edit Profile</MenubarItem>

              <MenubarSeparator />
              <MenubarItem onClick={() => signOut()}>Logout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </div>
      </Menubar>
     
  );
}
