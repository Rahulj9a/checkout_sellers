import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let stores;
    stores = await prisma.store.findMany({
       include:{
        category:true,
        product:true
       },
       orderBy: {
        createAt: "desc",
    },
    });
    if (!stores) {
      return NextResponse.json(null);
    }
     
    return NextResponse.json(stores, { status: 200 });
  } catch (error) {
    console.log("[Store_GETALL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
