import "./globals.css";
import type { Metadata } from "next";
import { QueryClient,QueryClientProvider } from "react-query";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checkout sellers",
  description: "Control your checkout products",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
        <NextAuthProvider>{children}</NextAuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
