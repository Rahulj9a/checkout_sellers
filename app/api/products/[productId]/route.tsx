import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
export async function GET(req: Request, { params }: { params: { productId: string } }) {
    try {
        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 })
        }

        const products = await prisma.product.findUnique({
            where: {
                id: params.productId,

            },
            include:{
                image:true,
                category:true,
                size:true,
                color:true
            }

        });
        return NextResponse.json(products)

    } catch (error) {
        console.log("[Product_Get]", error)
        return new NextResponse('internal error', { status: 500 })
    }
};