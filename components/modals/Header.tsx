"use client"
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
import { redirect } from "next/navigation";

interface HeaderProps{
  storeId?: string,
  storeName?:string
  ownerId?:string
}

const Header:React.FC<HeaderProps> =  ({storeId, storeName,ownerId}) => {

const {data:currentUser,isLoading,isError} = usecurrentUser()
 


if(!currentUser){
  redirect("/auth")
}
if(storeId){
   if(ownerId!=currentUser.id){
      redirect("/")
   }
}
 
  return (
     
      <Menubar className="flex">
        <div className="flex-1 ">
            <div className="flex items-center justify-center">
                  {currentUser.enterprise} {storeName||""}
            </div>
        </div>
        <div className="flex-none">
          <MenubarMenu >
            <MenubarTrigger className="px-0 py-0 rounded-full mx-4">
              <AvatarModal enterprise={currentUser.enterprise} logo={currentUser.logo||null}/>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Profile</MenubarItem>
              <MenubarItem>Edit Profile</MenubarItem>

              <MenubarSeparator />
              <MenubarItem onClick={() => {console.log('signing out'); signOut()}}>Logout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </div>
      </Menubar>
     
  );
}

export default Header