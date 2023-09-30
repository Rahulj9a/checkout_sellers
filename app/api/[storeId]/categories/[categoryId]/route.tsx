import prisma from "@/libs/prismadb"
import { serverAuth } from "@/libs/serverAuth"
import { NextResponse } from "next/server"

export async function PATCH( req: Request , { params }: { params: {storeId:string, categoryId: string } }) {
    try{

        const {currentUser} = await serverAuth()
        const body = await req.json()
        const {name, billboardId} = body
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        if(!name){
            return new NextResponse("Label is Required",{status:400})
        }
        if(!billboardId){
            return new NextResponse("Billboard is Required",{status:400})
        }

        if(!params.categoryId){
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
        const category = await prisma.category.updateMany({
            where:{
                id:params.categoryId,
        
            },
            data:{
               name, billboardId
            }
        });
        return NextResponse.json(category)

    }catch(error){
        console.log("[Category_patch]", error)
        return new NextResponse('internal error',{status:500})
    }
};

export async function DELETE( req: Request , { params }: { params: { storeId: string, categoryId:string } }) {
    try{

        const {currentUser} = await serverAuth()
        
        
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        

        if(!params.storeId){
            return new NextResponse("Store id is required",{status:400})
        }
        
        if(!params.categoryId){
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
        const category = await prisma.category.deleteMany({
            where:{
                id:params.categoryId,
                
            },
             
        });
        return NextResponse.json(category)

    }catch(error){
        console.log("[Category_delete]", error)
        return new NextResponse('internal error',{status:500})
    }
};

export async function GET( req: Request , { params }: { params: { categoryId:string } }) {
    try{
        if(!params.categoryId){
            return new NextResponse("Category id is required",{status:400})
        }
         
        const category = await prisma.category.findUnique({
            where:{
                id:params.categoryId,
                
            },include:{
                billboard:true,
                store:true
            }
             
        });
        return NextResponse.json(category)

    }catch(error){
        console.log("[Category_Get]", error)
        return new NextResponse('internal error',{status:500})
    }
};