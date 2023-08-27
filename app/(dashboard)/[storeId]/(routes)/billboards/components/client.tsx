"use client"

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const BillboardClient = () => {
    const router = useRouter()
    const params = useParams()
  return (
     <>
     <div className='flex items-center justify-between'>
        <Heading title='Billboards (0)' description='Manage billboards for your store' />
        <Button variant="outline" onClick={()=>router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className='w-4 h-4 mr-2'/>
            Add new
        </Button>

     </div>
     </>
  )
}

export default BillboardClient