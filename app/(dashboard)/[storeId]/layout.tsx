import Header from "@/components/modals/Header";
import prismadb from "@/libs/prismadb";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
}:{
    children: React.ReactNode;
    params:{storeId:string}

}){

    const store = await prismadb.store.findUnique({
        where:{
            id:params.storeId
        }
    })

    if(!store){
        redirect("/")
    }
    console.log(store)
    return(
    <>
    <Header ownerId={store.ownerId} storeId={store.id} storeName={store.name}/>
    {children}
    </>
    )

}