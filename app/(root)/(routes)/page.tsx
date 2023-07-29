"use client";

import Header from "@/components/modals/Header";

import AddStoreColumn from "@/components/modals/Store/AddStoreColumn";
import ExistingStoreColumn from "@/components/modals/Store/ExistingStoreColumn";
import usecurrentUser from "@/hooks/useCurrentUser";
import useGetStores from "@/hooks/useGetStores";
import { redirect } from "next/navigation";

export default function Home() {
   

  const { data: User } = useGetStores();
  
  if (!User) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="font-bold text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-1 lg:justify-start justify-center flex-wrap  gap-1 ">
        <div className="flex ">
          {User.stores.map((store: any, index: number) => {
            return <ExistingStoreColumn {...store} key={index} />;
          })}
        </div>
        <AddStoreColumn />
      </div>
    </div>
  );
}
