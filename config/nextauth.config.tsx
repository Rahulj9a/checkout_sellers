import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/libs/prismadb';
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
        name: "credentials",
        credentials: {
             email: { label: "email", type: "text" },
             password: { label: "password", type: "password" },
        },

        async authorize(credentials) {
             if (!credentials?.email || !credentials?.password) {
                  throw new Error("Invalid credentials");
             }

             const user = await prisma.user.findUnique({
                  where: {
                       email: credentials.email,
                  },
             });
             if (!user || !user?.hashedPassword) {
                  throw new Error("Invalid credentials");
             }

             const isCorrectPassword = await bcrypt.compare(
                  credentials.password,
                  user.hashedPassword,
             );
             if (!isCorrectPassword) {
                  throw new Error("Invlaid credentials");
             }

             return user;
        },
   }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET, 
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export { authOptions };
