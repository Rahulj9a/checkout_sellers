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
import { ReactElement } from "react";


interface HeaderProps{
  id?: string,
  name?:string
  ownerId?:string
  body?:ReactElement
}

const Header:React.FC<HeaderProps> =  ({body, ...store}) => {

const {data:currentUser,isLoading,isError} = usecurrentUser()
 
if(isLoading){
  return <div></div>
}

if(!currentUser&& !isLoading){
 
  redirect("/auth")
}
if(store.id){
   if(store.ownerId!=currentUser.id){
     redirect('/')
   }
}

 
  return (
     
      <Menubar className="flex  bg-white">
        <div className="flex-1 ">
            <div className="flex items-center justify-start">
                  {body}
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
              <MenubarItem onClick={() => {signOut();redirect('/auth')}}>Logout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </div>
      </Menubar>
     
  );
}

export default Header