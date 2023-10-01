 
import prisma from '@/libs/prismadb'

const getSalesCount = async( storeId:string) => {
    const salesCount = await prisma.order.findMany({
        where:{
            storeId,
            isPaid:true
        },
        
    });

    return salesCount
}

export default getSalesCount