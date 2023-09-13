import { format } from "date-fns"
import OrdersClient from './components/client'
import prisma from '@/libs/prismadb'
import { OrderColumn } from './components/columns'
import { formatter } from "@/libs/utils"


const Orders = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }

    },
    orderBy: {
      createAt: 'desc'
    }
  })

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems.map((orderItem)=> orderItem.product.name).join(', '),
    totalPrice: formatter.format(order.orderItems.reduce((total, item)=>{
        return total + Number(item.product.price)
    },0)),
    isPaid:order.isPaid,
    createdAt: format(order.createAt, 'MMMM do, yyyy')
  }))
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <OrdersClient data={formattedOrders} />

      </div>

    </div>
  )
}

export default Orders