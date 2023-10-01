'use client'
import { Button } from '@/components/ui/button'
import usecurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
    
    const {data:currentUser} = usecurrentUser()
    useEffect(()=>{
        if(!currentUser){
            redirect('/')
        }
    })
    const handleClick = async () => {
         await signOut()
         
    }
    return (
        <div>
            <div className='flex h-screen w-screen items-center justify-center gap-3'>
                <Button onClick={handleClick}>
                    Logout
                </Button>


            </div>
        </div>
    )
}

export default Page