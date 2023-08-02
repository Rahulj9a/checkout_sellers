'use client'
import { Button } from '@/components/ui/button'
import usecurrentUser from '@/hooks/useCurrentUser'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {

   const {data:currentUser} = usecurrentUser()
  if(currentUser){
    redirect('/home')
  }
  return (
    <div>
        <div className='flex h-screen w-screen items-center justify-center'>
            <Button onClick={()=>{redirect('/auth')}}>
                   Login                   
            </Button>
            <Button onClick={()=>redirect('/auth')}>
                 Register
            </Button>
        </div>
    </div>
  )
}

export default page