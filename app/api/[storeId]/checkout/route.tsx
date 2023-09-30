import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/libs/stripe";
import prisma from "@/libs/prismadb";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    const { productId } = await req.json();
    if (!productId || productId.length === 0) {
        return new NextResponse("Product Ids are required", { status: 400 });
    }
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });
    if(!product){
        return new NextResponse("Product can't be found", { status: 401 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    line_items.push({
        quantity: 1,
        price_data: {
            currency: 'USD',
            product_data: {
                name: product?.name as string,
            },
            unit_amount: product?.price * 100
        }
    });

    const order = await prisma.order.create({
        data: {
            storeId: params.storeId,
            isPaid: false,
            orderItems: {
                create: {
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }
            }
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: 'required',
        phone_number_collection: {
            enabled: true
        },
        success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
        metadata: {
            orderId: order.id
        }
    });

    return NextResponse.json({ url: session.url }, {
        headers: corsHeaders
    });
}
