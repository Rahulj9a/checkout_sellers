import usecurrentUser from "@/hooks/useCurrentUser";
import prismadb from "@/libs/prismadb";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import SettingsForm from "./components/settings-form";

interface SettingPageProps {
    params: {
        storeId: string;
    }
}
const SettingsPage: React.FC<SettingPageProps> = async ({ params }) => {

    const Store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        }
    })
    if(!Store){
        redirect('/home')
    }

    return (<div className="flex-col w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SettingsForm initialData={Store}/>

        </div>

    </div>)
}

export default SettingsPage