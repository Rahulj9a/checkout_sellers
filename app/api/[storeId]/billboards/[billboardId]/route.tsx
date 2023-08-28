import prisma from "@/libs/prismadb"
import { serverAuth } from "@/libs/serverAuth"
import { NextResponse } from "next/server"

export async function PATCH( req: Request , { params }: { params: {storeId:string, billboardId: string } }) {
    try{

        const {currentUser} = await serverAuth()
        const body = await req.json()
        const {label, imageUrl} = body
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        if(!label){
            return new NextResponse("Label is Required",{status:400})
        }
        if(!imageUrl){
            return new NextResponse("Image is Required",{status:400})
        }

        if(!params.billboardId){
            return new NextResponse("Billboard id is required",{status:400})
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
        const billboard = await prisma.billboard.updateMany({
            where:{
                id:params.billboardId,
        
            },
            data:{
                label, imageUrl
            }
        });
        return NextResponse.json(billboard)

    }catch(error){
        console.log("[Billboard_patch]", error)
        return new NextResponse('internal error',{status:500})
    }
};

export async function DELETE( req: Request , { params }: { params: { storeId: string, billboardId:string } }) {
    try{

        const {currentUser} = await serverAuth()
        
        
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        

        if(!params.storeId){
            return new NextResponse("Store id is required",{status:400})
        }
        
        if(!params.billboardId){
            return new NextResponse("Billboard id is required",{status:400})
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
        const billboard = await prisma.billboard.deleteMany({
            where:{
                id:params.billboardId,
                
            },
             
        });
        return NextResponse.json(billboard)

    }catch(error){
        console.log("[Billboard_delete]", error)
        return new NextResponse('internal error',{status:500})
    }
};

export async function GET( req: Request , { params }: { params: { billboardId:string } }) {
    try{
        if(!params.billboardId){
            return new NextResponse("Billboard id is required",{status:400})
        }
         
        const billboard = await prisma.billboard.findUnique({
            where:{
                id:params.billboardId,
                
            },
             
        });
        return NextResponse.json(billboard)

    }catch(error){
        console.log("[Billboard_Get]", error)
        return new NextResponse('internal error',{status:500})
    }
};