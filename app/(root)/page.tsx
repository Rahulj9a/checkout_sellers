"use client";
 
import Header from "@/components/modals/Header";
 
import AddStoreColumn from "@/components/modals/Store/AddStoreColumn";
import usecurrentUser from "@/hooks/useCurrentUser";
import { useLoginModal } from "@/hooks/useLoginModal";

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const loginModal = useLoginModal();
  const { data: currentUser } = usecurrentUser();
  useEffect(() => {
    if (!currentUser && !loginModal.isOpen) {
      loginModal.onOpen();
    }else if(currentUser && loginModal.isOpen){
      loginModal.onClose()
    }
  }, [currentUser, loginModal ]);
  
  if(!currentUser){
    return null
  }
  return (
    <>
      <Header/>
      <div>
        <AddStoreColumn/>
      </div>
       
    </>
  );
}
