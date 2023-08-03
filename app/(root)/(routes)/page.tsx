'use client'
import { Button } from '@/components/ui/button'
import {   useRouter } from 'next/navigation'
import React from 'react'

const  page = () => {
  const router = useRouter()
   
  const handleClick = () =>{
     
    router.push('/auth')
  }
  return (
    <div>
        <div className='flex h-screen w-screen items-center justify-center gap-3'>
            <Button onClick={handleClick}>
                   Login                   
            </Button>
             
             
        </div>
    </div>
  )
}

export default page