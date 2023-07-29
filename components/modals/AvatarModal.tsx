import React, { useState } from "react";
import {Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import usecurrentUser from "@/hooks/useCurrentUser";

interface AvatarModalProps {
  enterprise: string;
  logo?: string

}

const AvatarModal:React.FC<AvatarModalProps> = ({enterprise,logo}) => {

  
  const {data:currentUser} = usecurrentUser()
  
/*   const enterprise =  currentUser.enterprise */
  
  return (
    <div>
      <Avatar className=" p-1  flex items-center justify-center">
        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
        <AvatarFallback className="bg-black text-white text-lg">{logo || enterprise[0]}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarModal;
