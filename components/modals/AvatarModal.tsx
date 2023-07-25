import React from "react";
import {Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import usecurrentUser from "@/hooks/useCurrentUser";

const AvatarModal = () => {

  const {data:currentUser} = usecurrentUser()
  const enterprise =  currentUser.enterprise
  return (
    <div>
      <Avatar className=" p-1  flex items-center justify-center">
        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
        <AvatarFallback className="bg-black text-white text-lg">{enterprise[0]}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarModal;
