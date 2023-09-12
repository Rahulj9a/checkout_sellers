import prisma from "@/libs/prismadb"
import { serverAuth } from "@/libs/serverAuth"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { storeId: string, productId: string } }) {
    try {

        const { currentUser } = await serverAuth()
        const body = await req.json()
        const { name, image, price, categoryId, sizeId, colorId, isArchived, isFeatured } = body
        if (!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!price) {
            return new NextResponse("Price is required", { status: 400 });
        }
        if (!categoryId) {
            return new NextResponse("Category Id is required", { status: 400 });
        }
        if (!sizeId) {
            return new NextResponse("Size Id is required", { status: 400 });
        }
        if (!colorId) {
            return new NextResponse("Color Id is required", { status: 400 });
        }
        if (!image || !image.length) {
            return new NextResponse("Image is required", { status: 400 });
        }
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }
        const storeByUserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                ownerId: currentUser.id
            }
        });
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }
        await prisma.product.update({
            where: {
                id: params.productId,
                
            },
            data: {
                name,
                image: {
                     deleteMany:{}
                },
                price,
                categoryId,
                sizeId,
                colorId,
                isArchived,
                isFeatured,
                storeId: params.storeId
            }
        });
        const product = await prisma.product.update({
            where:{
                id:params.productId
            },
            data:{
                image:{
                    createMany:{
                        data:[...image.map((eachImage:{url:string})=>eachImage)]
                    }
                }
            }
        })
        return NextResponse.json(product)

    } catch (error) {
        console.log("[Product_patch]", error)
        return new NextResponse('internal error', { status: 500 })
    }
};

export async function DELETE(req: Request, { params }: { params: { storeId: string, productId: string } }) {
    try {

        const { currentUser } = await serverAuth()


        if (!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }


        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 })
        }
        const storeByUserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                ownerId: currentUser.id
            }
        });
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }
        const product = await prisma.product.deleteMany({
            where: {
                id: params.productId,

            },

        });
        return NextResponse.json(product)

    } catch (error) {
        console.log("[Product_delete]", error)
        return new NextResponse('internal error', { status: 500 })
    }
};

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