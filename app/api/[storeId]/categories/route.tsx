
//these API handle fetching all the stores and creating a new store

import prisma from "@/libs/prismadb";
import { serverAuth } from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    const { currentUser } = await serverAuth();
    const storeId = params.storeId
    if (!currentUser) {
        return new NextResponse("Something went wrong", { status: 400 });
    }
    try {
        const body = await req.json();
        const ownerId = currentUser.id;

        const { name, billboardId } = body;

        if (!ownerId) {
            return new NextResponse("Unauthenticated", { status: 400 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!billboardId) {
            return new NextResponse("Billboard Id is required", { status: 400 });
        }
        if (!storeId) {
            return new NextResponse("Store Id is required", { status: 400 });
        }

        const storeByUserId = await prisma.store.findFirst({
            where:{
                id:storeId,
                ownerId
            }
        });
        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status:403})
        }
        const category = await prisma.category.create({
            data: {
                name,
                billboardId,
                storeId
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        console.log("[Category_Post]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req:Request, {params}:{params:{storeId:string}}) {
     
    try {
        
        if(!params.storeId){
            return new NextResponse("Store is required", {status:403})
        }

        
        const category = await prisma.category.findMany({
            where: {
                storeId: params.storeId,
            },
            include:{
                billboard:true
            },

            orderBy: {
                createAt: "asc",
            },

        });
         
        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.log("[Category_Get]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}