 
import prisma from '@/libs/prismadb'

const getProductInStock = async( storeId:string) => {
    const stockCount = await prisma.product.count({
        where:{
            storeId,
            isArchived:false
        },
        
    });

    return stockCount
}

export default getProductInStock