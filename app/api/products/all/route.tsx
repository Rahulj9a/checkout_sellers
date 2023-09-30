import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    try {
        const{searchParams} = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const isFeatured = searchParams.get("isFeatured")
        const storeId = searchParams.get("storeId")||undefined


         


        const product = await prisma.product.findMany({
            where: {
                storeId,
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