
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

        const { name, image, price, categoryId, sizeId, colorId, isArchived, isFeatured } = body;

        if (!ownerId) {
            return new NextResponse("Unauthenticated", { status: 400 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!price) {
            return new NextResponse("Price is required", { status: 400 });
        }
        if (!categoryId) {
            return new NextResponse("category Id is required", { status: 400 });
        }
        if (!sizeId) {
            return new NextResponse("size Id is required", { status: 400 });
        }
        if (!colorId) {
            return new NextResponse("color Id is required", { status: 400 });
        }
        if (!image || !image.length) {
            return new NextResponse("image is required", { status: 400 });
        }


        const storeByUserId = await prisma.store.findFirst({
            where: {
                id: storeId,
                ownerId
            }
        });
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }
        const product = await prisma.product.create({
            data: {
                name, 
                image:{
                    createMany:{
                        data: [...image.map((eachImage:{url:string})=>eachImage)]
                    }
                },
                price, 
                categoryId, 
                sizeId, 
                colorId, 
                isArchived, 
                isFeatured,
                storeId:params.storeId
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        console.log("[Product_Post]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {

    try {
        const{searchParams} = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const isFeatured = searchParams.get("isFeatured")


        if (!params.storeId) {
            return new NextResponse("Store is required", { status: 403 })
        }


        const product = await prisma.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured?true:undefined,
                isArchived:false
            },
            include:{
                image:true,
                color:true,
                size:true,
                category:true
            },

            orderBy: {
                createAt: "desc",
            },

        });

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.log("[Products_Get]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}