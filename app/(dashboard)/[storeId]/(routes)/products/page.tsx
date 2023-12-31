import {format} from "date-fns"
 
import prisma from '@/libs/prismadb'
import { ProductColumn } from './components/columns'
import { formatter } from "@/libs/utils"
import ProductClient from "./components/client"


const Products = async({params}:{params:{storeId:string}}) => {
  const  products = await prisma.product.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      category:true,
      size:true,
      color:true
    },
    orderBy:{
      createAt:'desc'
    }
  })

  const formattedProducts: ProductColumn[] = products.map((item)=>({
        id: item.id,
        name:item.name,
        isFeatured:item.isFeatured,
        isArchived:item.isArchived,
        price: formatter.format(item.price),
        category:item.category.name,
        size:item.size.name,
        color:item.color.value,
        createdAt: format(item.createAt, 'MMMM do, yyyy')
  }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ProductClient data={formattedProducts}/>

        </div>

    </div>
  )
}

export default Products