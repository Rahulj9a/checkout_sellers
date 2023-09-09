"use client"

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
 
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import {  ColorColumn, columns } from './columns'
import { Separator } from '@radix-ui/react-separator'
import { DataTable } from '@/components/ui/dataTable'


interface ColorClientProps{
   data: ColorColumn[]
}

const ColorsClient:React.FC<ColorClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
  return (
     <>
     <div className='flex items-center justify-between'>
        <Heading title={`Colors (${data.length})`}description='Manage colors for your products' />
        <Button variant="outline" onClick={()=>router.push(`/${params.storeId}/colors/new`)}>
            <Plus className='w-4 h-4 mr-2'/>
            Add new
        </Button>

     </div>
     <Separator/>
     <DataTable columns={columns} data={data} searchKey='name'/>
     </>
  )
}

export default ColorsClient