import {format} from "date-fns"
import SizesClient from './components/client'
import prisma from '@/libs/prismadb'
import { SizeColumn } from './components/columns'


const Sizes = async({params}:{params:{storeId:string}}) => {
  const  sizes = await prisma.size.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createAt:'desc'
    }
  })

  const formattedSizes: SizeColumn[] = sizes.map((item)=>({
        id: item.id,
        name: item.name,
        value:item.value,
        createdAt: format(item.createAt, 'MMMM do, yyyy')
  }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SizesClient data={formattedSizes}/>

        </div>

    </div>
  )
}

export default Sizes