 
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let categories;
    categories = await prisma.category.findMany({
       include:{
        product:true,
        billboard:true,
        store:true
       },
       orderBy: {
        createAt: "desc",
    },
    });
    if (!categories) {
      return NextResponse.json(null);
    }
     
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log("[Store_GETALL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}