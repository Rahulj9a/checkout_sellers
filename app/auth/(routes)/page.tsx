"use client";
import { LoginModal } from "@/components/modals/LoginModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
import usecurrentUser from "@/hooks/useCurrentUser";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const loginModal = useLoginModal();
  const [loading,setIsLoading] = useState(false)
  
  const {data:currentUser} = usecurrentUser();

  
  useEffect(() => {
    if(currentUser){
      setIsLoading(true)
      redirect('/')
       
    }
    
    if (!currentUser && !loginModal.isOpen ) {
      setIsLoading(true)
      loginModal.onOpen();
      setIsLoading(false)
    }
  }, [currentUser, loginModal]);


  
  return (
    <div>
      <LoginModal  />
      <RegisterModal />
    </div>
  );
};

export default page;
