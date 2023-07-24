 
import bcrypt from "bcrypt";

import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  if (req.method == "POST") {
    try {
      const { email, enterprise, password } =await req.json();
       
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const user = await prismadb.user.create({
        data: {
          email,
          hashedPassword,
          enterprise,
        },
      });
  
      return NextResponse.json(user) ;
    } catch (error) {
       
      return new NextResponse("internalError", {status:500});
    }
  } else {
    return new NextResponse("Something went wrong", {status:405})
  }
}



