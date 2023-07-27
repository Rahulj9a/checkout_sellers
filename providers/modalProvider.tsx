"use client"

/* import { LoginModal } from "@/components/modals/LoginModal"
import { RegisterModal } from "@/components/modals/RegisterModal" */
import { AddStoreModal } from "@/components/modals/Store/AddStoreModal"
 
/* to ensure that their is no hydration error, as our layout is server side and using login/register rendering can cause the hydration error */
import { useEffect,useState } from "react"


export const ModalProvider = ()=>{
    const [isMounted, setIsMounted] = useState(false)
    useEffect(()=>{setIsMounted(true)},[])

    /* will ensure that until the life-cycle run which can only happen in client componant, it will return null, and then if we are in server side rendering there will be no hydration error*/

    if(!isMounted){
        return null
    }

    //but if we are on client side it will render the login/registerstore modal (until we want)-
    return(
        <>
      {/*   <LoginModal/>
        <RegisterModal/>  */}
        <AddStoreModal/>
        </>
    )
}