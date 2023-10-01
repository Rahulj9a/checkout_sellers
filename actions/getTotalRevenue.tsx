 
import prisma from '@/libs/prismadb'

const getTotalRevenue = async( storeId:string) => {
    const PaidOrders = await prisma.order.findMany({
        where:{
            storeId,
            isPaid:true
        },
        include:{
            orderItems:{
                include:{
                    product:true
                }
            }
        }
    });

    const totalRevenue = PaidOrders.reduce((total,order)=>{
        const orderTotal = order.orderItems.reduce((ordersum, item)=>{
            return ordersum+Number(item.product.price)
        },0)
        return total + orderTotal
    },0)
  return totalRevenue
}

export default getTotalRevenue