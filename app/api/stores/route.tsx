import usecurrentUser from "@/hooks/useCurrentUser"
import prismadb from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    
    
    
     
    
    
  try {
    const body = await req.json()
    const {name,ownerId} = body
    
    
    if(!ownerId){
        return new NextResponse("Can't detect Owner",{status:400})
    }
    if(!name){
        return new NextResponse("Name is required", {status:400})
    }
    
    const store = await prismadb.store.create({
        data:{
            name,
            ownerId
        }
    })
    return NextResponse.json(store)

  } catch (error) {
    console.log('[Store_POST]', error)
    return new NextResponse('Internal Error',{status:500})
  }
}
