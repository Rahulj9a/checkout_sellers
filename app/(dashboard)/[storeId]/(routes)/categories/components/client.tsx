"use client"

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Billboard } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { CategoryColumn, columns } from './columns'
import { Separator } from '@radix-ui/react-separator'
import { DataTable } from '@/components/ui/dataTable'


interface CategoryClientProps{
   data: CategoryColumn[]
}

const CategoryClient:React.FC<CategoryClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
  return (
     <>
     <div className='flex items-center justify-between'>
        <Heading title={`Categories (${data.length})`}description='Manage Categories for your store' />
        <Button variant="outline" onClick={()=>router.push(`/${params.storeId}/categories/new`)}>
            <Plus className='w-4 h-4 mr-2'/>
            Add new
        </Button>

     </div>
     <Separator/>
     <DataTable columns={columns} data={data} searchKey='name'/>
     </>
  )
}

export default CategoryClient