"use client";
import { LoginModal } from "@/components/modals/LoginModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
import usecurrentUser from "@/hooks/useCurrentUser";
import { useLoginModal } from "@/hooks/useLoginModal";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const { data: currentUser, isLoading, refetch } = usecurrentUser();
  const [isMounted, setIsMounted] = useState(false);
   

  /*   useEffect(() => {
    if (currentUser) {
      router.push("/home")
}

    if (!currentUser && !loginModal.isOpen) {
      loginModal.onOpen();
    }
  }, [currentUser, loginModal, isLoading]); */

  /*  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="font-bold text-2xl">Loading...</p>
      </div>)
  } */

  return (
    <div>
      <LoginModal refetch={refetch} />
      <RegisterModal refetch={refetch} />
    </div>
  );
};

export default Page;
