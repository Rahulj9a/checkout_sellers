import prisma from "@/libs/prismadb"
import { serverAuth } from "@/libs/serverAuth"
import { NextResponse } from "next/server"

export async function PATCH( req: Request , { params }: { params: {storeId:string, sizeId: string } }) {
    try{

        const {currentUser} = await serverAuth()
        const body = await req.json()
        const {name, value} = body
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        if(!name){
            return new NextResponse("Label is Required",{status:400})
        }
        if(!value){
            return new NextResponse("Billboard is Required",{status:400})
        }

        if(!params.sizeId){
            return new NextResponse("Category id is required",{status:400})
        }
        if(!params.storeId){
            return new NextResponse("Store id is required",{status:400})
        }
        const storeByUserId = await prisma.store.findFirst({
            where:{
                id:params.storeId,
                ownerId:currentUser.id
            }
        });
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status:400})
        }
        const size = await prisma.size.updateMany({
            where:{
                id:params.sizeId,
        
            },
            data:{
               name, value
            }
        });
        return NextResponse.json(size)

    }catch(error){
        console.log("[Size_patch]", error)
        return new NextResponse('internal error',{status:500})
    }
};

export async function DELETE( req: Request , { params }: { params: { storeId: string, sizeId:string } }) {
    try{

        const {currentUser} = await serverAuth()
        
        
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        

        if(!params.storeId){
            return new NextResponse("Store id is required",{status:400})
        }
        
        if(!params.sizeId){
            return new NextResponse("Category id is required",{status:400})
        }
        const storeByUserId = await prisma.store.findFirst({
            where:{
                id:params.storeId,
                ownerId:currentUser.id
            }
        });
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status:400})
        }
        const size = await prisma.size.deleteMany({
            where:{
                id:params.sizeId,
                
            },
             
        });
        return NextResponse.json(size)

    }catch(error){
        console.log("[Category_delete]", error)
        return new NextResponse('internal error',{status:500})
    }
};

export async function GET( req: Request , { params }: { params: { sizeId:string } }) {
    try{
        if(!params.sizeId){
            return new NextResponse("Category id is required",{status:400})
        }
         
        const size = await prisma.size.findUnique({
            where:{
                id:params.sizeId,
                
            },
             
        });
        return NextResponse.json(size)

    }catch(error){
        console.log("[Size_Get]", error)
        return new NextResponse('internal error',{status:500})
    }
};