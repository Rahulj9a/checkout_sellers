 
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
   
    try {
      const { email, enterprise, password } =await req.json();
       
      const hashedPassword = await bcrypt.hash(password, 12);
         
      const user = await prisma.user.create({
        data: {
          email,
          hashedPassword,
          enterprise,
        },
      });
       
      return NextResponse.json(user) ;
    } catch (error) {
      console.log(error,"REGISTER_API")
      return new NextResponse("internalError", {status:500});
    }
    
  }
 



