import React, { useState } from "react";
import {Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import usecurrentUser from "@/hooks/useCurrentUser";
import { redirect, useRouter } from "next/navigation";

interface AvatarModalProps {
   

}

const AvatarModal:React.FC<AvatarModalProps> = ( ) => {
const router = useRouter()
  
  const {data:currentUser,isLoading} = usecurrentUser()
  if(isLoading){
    return <div></div>
  }
  
  if(!currentUser && !isLoading){
   
    redirect("/")
  }
   
  const handleClick = ()=>{
    router.push('/profile')
  }
/*   const enterprise =  currentUser.enterprise */
  
  return (
    <div>
      
      <Avatar className="cursor-pointer p-1  flex items-center justify-center" onClick={handleClick}>
        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
        <AvatarFallback className="bg-black text-white text-lg">{currentUser.logo || currentUser.enterprise[0]}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarModal;
