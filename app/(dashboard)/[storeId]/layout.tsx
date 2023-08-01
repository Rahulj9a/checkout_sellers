import Header from "@/components/modals/Header";
import prismadb from "@/libs/prismadb";
import { redirect } from "next/navigation";
import { StoresNav } from "@/components/modals/StoresNav";
 


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

    const storeNav = <div className="flex w-fit items-center gap-4 mx-4">

        <StoresNav className=' ' />
    </div>
    return (
        <>
        
            <Header {...store} body={storeNav} />
            {children}
        </>
    )

}