"use client";
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
import usecurrentUser from "@/hooks/useCurrentUser";
import { useRouter, redirect } from "next/navigation";
import { ReactElement } from "react";
import useGetStores from "@/hooks/useGetStores";

interface NavbarProps {
  id?: string;
  name?: string;
  ownerId?: string;
  body?: ReactElement;
}

const Navbar: React.FC<NavbarProps> = ({ body, ...store }) => {
  const { data: currentUser, isLoading } = usecurrentUser();

  if (isLoading) {
    return <div></div>;
  }

  if (!currentUser && !isLoading) {
    redirect("/");
  }
  if (store.id) {
    if (store.ownerId != currentUser.id) {
      redirect("/home");
    }
  }

  return (
    <nav className="z-20">
      <Menubar className="flex  bg-white">
        <div className="flex-1 ">
          <div className="flex items-center w-full ">{body}</div>
        </div>
        <div className="flex-none">
          <MenubarMenu>
            <MenubarTrigger className="px-0 py-0 rounded-full mx-4">
              <AvatarModal />
            </MenubarTrigger>
             
          </MenubarMenu>
        </div>
      </Menubar>
    </nav>
  );
};

export default Navbar;
