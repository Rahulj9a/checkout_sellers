
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

        const { name, value } = body;

        if (!ownerId) {
            return new NextResponse("Unauthenticated", { status: 400 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!value) {
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
        const size = await prisma.size.create({
            data: {
                name,
                value,
                storeId
            },
        });
        return NextResponse.json(size);
    } catch (error) {
        console.log("[Size_Post]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req:Request, {params}:{params:{storeId:string}}) {
     
    try {
        
        if(!params.storeId){
            return new NextResponse("Store is required", {status:403})
        }

        
        const size = await prisma.size.findMany({
            where: {
                storeId: params.storeId,
            },

            orderBy: {
                createAt: "asc",
            },

        });
         
        return NextResponse.json(size, { status: 200 });
    } catch (error) {
        console.log("[Size_Get]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}