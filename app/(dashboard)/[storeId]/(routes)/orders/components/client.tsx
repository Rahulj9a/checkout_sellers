"use client"


import { Heading } from '@/components/ui/heading'


import React from 'react'
import { OrderColumn, columns } from './columns'
import { Separator } from '@radix-ui/react-separator'
import { DataTable } from '@/components/ui/dataTable'


interface OrderClientProps {
   data: OrderColumn[]
}

const OrdersClient: React.FC<OrderClientProps> = ({ data }) => {

   return (
      <>
         <div className='flex items-center justify-between'>
            <Heading title={`Orders (${data.length})`} description='Manage orders for your products' />


         </div>
         <Separator />
         <DataTable columns={columns} data={data} searchKey='products' />
      </>
   )
}

export default OrdersClient