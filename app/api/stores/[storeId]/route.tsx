import prisma from "@/libs/prismadb"
import { serverAuth } from "@/libs/serverAuth"
import { NextResponse } from "next/server"

export async function PATCH( req: Request , { params }: { params: { storeId: string } }) {
    try{

        const {currentUser} = await serverAuth()
        const body = await req.json()
        const {name} = body
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        if(!name){
            return new NextResponse("Name is Required",{status:400})
        }

        if(!params.storeId){
            return new NextResponse("Store id is required",{status:400})
        }
        const store = await prisma.store.updateMany({
            where:{
                id:params.storeId,
                ownerId:currentUser.id
            },
            data:{
                name
            }
        });
        return NextResponse.json(store)

    }catch(error){
        console.log("[Store_patch]", error)
        return new NextResponse('internal error',{status:500})
    }
};

export async function DELETE( req: Request , { params }: { params: { storeId: string } }) {
    try{

        const {currentUser} = await serverAuth()
        
        
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        

        if(!params.storeId){
            return new NextResponse("Store id is required",{status:400})
        }
        const store = await prisma.store.deleteMany({
            where:{
                id:params.storeId,
                ownerId:currentUser.id
            },
             
        });
        return NextResponse.json(store)

    }catch(error){
        console.log("[Store_delete]", error)
        return new NextResponse('internal error',{status:500})
    }
};
export async function GET( req: Request , { params }: { params: { storeId: string } }) {
    try {
      let store;
      store = await prisma.store.findUnique({
         where:{
            id:params.storeId
         }
      });
      if (!store) {
        return NextResponse.json(null);
      }
       
      return NextResponse.json(store, { status: 200 });
    } catch (error) {
      console.log("[Store_GETALL]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
