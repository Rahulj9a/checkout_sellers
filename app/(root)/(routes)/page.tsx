"use client";
 
import Header from "@/components/modals/Header";
 
import AddStoreColumn from "@/components/modals/Store/AddStoreColumn";
import usecurrentUser from "@/hooks/useCurrentUser";
import { redirect } from "next/navigation";
 

 
 

export default  function Home() {
  
   
  const {data:currentUser} = usecurrentUser()

   
   
    if (!currentUser) {
      redirect("/auth")
    } 
  /* const loginModal = useLoginModal(); */
  /* const { data: currentUser } = usecurrentUser(); */
  
    
    
  return (
    <>
      <Header/>
      <div>
           
        <AddStoreColumn/>
      </div>
       
    </>
  );
}
