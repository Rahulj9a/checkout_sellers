 'use client'

 

import AddStoreColumn from "@/components/modals/Store/AddStoreColumn";
import ExistingStoreColumn from "@/components/modals/Store/ExistingStoreColumn";
import usecurrentUser from "@/hooks/useCurrentUser";

import useGetStores from "@/hooks/useGetStores";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";
 


const Home=()=> {
   

  
  const {data:currentUser,isLoading:loadingUser} = usecurrentUser()
  
  useEffect(()=>{
    if(!currentUser&&!loadingUser){
      redirect('/auth')
    }
  })

  
  const { data:Stores,isLoading } = useGetStores();
  if (isLoading || loadingUser) {
     return (<Loading/>)
  }
  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-1 lg:justify-start justify-center flex-wrap  gap-1 ">
        
          { Stores.map((store: any, index: number) => {
            return <ExistingStoreColumn {...store} key={index} />;
          })}
         
        <AddStoreColumn />
      </div>
    </div>
  );
}
export default Home
