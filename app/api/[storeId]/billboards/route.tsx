
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

        const { label, imageUrl } = body;

        if (!ownerId) {
            return new NextResponse("Unauthenticated", { status: 400 });
        }
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }
        if (!imageUrl) {
            return new NextResponse("Image is required", { status: 400 });
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
        const billboard = await prisma.billboard.create({
            data: {
                label,
                imageUrl,
                storeId
            },
        });
        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[Billboards_Post]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req:Request, {params}:{params:{storeId:string}}) {
     
    try {
        
        if(!params.storeId){
            return new NextResponse("Store is required", {status:403})
        }

        
        const billboard = await prisma.billboard.findMany({
            where: {
                storeId: params.storeId,
            },

            orderBy: {
                createAt: "asc",
            },

        });
         
        return NextResponse.json(billboard, { status: 200 });
    } catch (error) {
        console.log("[Billboard_Get]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}