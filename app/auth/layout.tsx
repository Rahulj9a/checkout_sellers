import { serverAuth } from "@/libs/serverAuth";
import { redirect } from "next/navigation";

 
 

 

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   
   const {currentUser} = await serverAuth()
   if(currentUser){
    redirect("/home")
   }
   
     
   

  return (<>{children}</>);
}
