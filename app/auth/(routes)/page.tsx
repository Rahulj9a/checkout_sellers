"use client";
import { LoginModal } from "@/components/modals/LoginModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
import usecurrentUser from "@/hooks/useCurrentUser";
import { useLoginModal } from "@/hooks/useLoginModal";

import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const loginModal = useLoginModal();
  

  const { data: currentUser, isLoading, refetch } = usecurrentUser();

  useEffect(() => {
    if (currentUser) {
      redirect("/home");
}

    if (!currentUser && !loginModal.isOpen) {
      loginModal.onOpen();
    }
  }, [currentUser, loginModal, isLoading]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="font-bold text-2xl">Loading...</p>
      </div>)
  }

  return (
    <div>
      <LoginModal refetch={refetch} />
      <RegisterModal refetch={refetch} />
    </div>
  );
};

export default page;
