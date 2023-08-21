
//these API handle fetching all the stores and creating a new store

import prisma from "@/libs/prismadb";
import { serverAuth } from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { currentUser } = await serverAuth();
  if (!currentUser) {
    return new NextResponse("Something went wrong", { status: 400 });
  }
  try {
    const body = await req.json();
    const ownerId = currentUser.id;
    
    const { name } = body;

    if (!ownerId) {
      return new NextResponse("Can't detect Owner", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prisma.store.create({
      data: {
        name,
        ownerId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[Store_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  const { currentUser } = await serverAuth();
  if (!currentUser) {
    return new NextResponse("Something went wrong", { status: 400 });
  }
  try {
    const userId = currentUser.id;


    if (!userId) {
      return new NextResponse("Something went wrong", { status: 400 });
    }
    let stores;
    stores = await prisma.store.findMany({
      where: {
        ownerId: userId,
      },
      
          orderBy: {
            createAt: "asc",
          },
        
    });
    if (!stores) {
      return NextResponse.json(null);
    }
    return NextResponse.json(stores, { status: 200 });
  } catch (error) {
    console.log("[Store_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
