 

import Sidebar from "@/components/modals/Sidebar/sidebar";
import { serverAuth } from "@/libs/serverAuth";

export default async function DashboardLayout({
  children,
 
}: {
  children: React.ReactNode;
 
}) {
 /*  const { currentUser } = await serverAuth(); */
   
  

  return (
    <>
       
       {children} 
       
    </>
  );
}