import prisma from "@/libs/prismadb"
import { serverAuth } from "@/libs/serverAuth"
import { NextResponse } from "next/server"

export async function PATCH( req: Request , { params }: { params: {storeId:string, colorId: string } }) {
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

        if(!params.colorId){
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
        const color = await prisma.color.updateMany({
            where:{
                id:params.colorId,
        
            },
            data:{
               name, value
            }
        });
        return NextResponse.json(color)

    }catch(error){
        console.log("[Color_patch]", error)
        return new NextResponse('internal error',{status:500})
    }
};

export async function DELETE( req: Request , { params }: { params: { storeId: string, colorId:string } }) {
    try{

        const {currentUser} = await serverAuth()
        
        
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        

        if(!params.storeId){
            return new NextResponse("Store id is required",{status:400})
        }
        
        if(!params.colorId){
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
        const color = await prisma.color.deleteMany({
            where:{
                id:params.colorId,
                
            },
             
        });
        return NextResponse.json(color)

    }catch(error){
        console.log("[Color_delete]", error)
        return new NextResponse('internal error',{status:500})
    }
};

export async function GET( req: Request , { params }: { params: { colorId:string } }) {
    try{
        if(!params.colorId){
            return new NextResponse("Category id is required",{status:400})
        }
         
        const color = await prisma.color.findUnique({
            where:{
                id:params.colorId,
                
            },
             
        });
        return NextResponse.json(color)

    }catch(error){
        console.log("[Color_Get]", error)
        return new NextResponse('internal error',{status:500})
    }
};