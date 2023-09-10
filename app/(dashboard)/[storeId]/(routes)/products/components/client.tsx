"use client"

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Product } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ProductColumn, columns } from './columns'
import { Separator } from '@radix-ui/react-separator'
import { DataTable } from '@/components/ui/dataTable'


interface ProductClientProps{
   data: ProductColumn[]
}

const  ProductClient:React.FC<ProductClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
  return (
     <>
     <div className='flex items-center justify-between'>
        <Heading title={`Products (${data.length})`}description='Manage products for your store' />
        <Button variant="outline" onClick={()=>router.push(`/${params.storeId}/products/new`)}>
            <Plus className='w-4 h-4 mr-2'/>
            Add new
        </Button>

     </div>
     <Separator/>
     <DataTable columns={columns} data={data} searchKey='label'/>
     </>
  )
}

export default ProductClient