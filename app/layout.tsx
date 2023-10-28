
import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/providers/nextAuthProvider";
import { ModalProvider } from "@/providers/modalProvider";
import { ReactQueryProvider } from "@/providers/reactQueryProvider";
import { ToasterProvider } from "@/providers/toast-provider";
 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checkout sellers",
  description: "Control your checkout products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <NextAuthProvider>

            <ToasterProvider />
            <ModalProvider />

            {children}

          </NextAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
