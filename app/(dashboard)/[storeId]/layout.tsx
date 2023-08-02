import Navbar from "@/components/modals/Navbar";
import prismadb from "@/libs/prismadb";
import { redirect } from "next/navigation";
 
import Sidebar from "@/components/modals/Sidebar/sidebar";



export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string }

}) {

    const store = await prismadb.store.findUnique({
        where: {
            id: params.storeId
        }
    })

    if (!store) {
        redirect("/")
    }

     
    return (
        <>

            
            <div className=" md:flex ">
                <Sidebar />
                <div className="md:ml-[250px]">
                    {children}
                </div>

            </div>
        </>
    )

}