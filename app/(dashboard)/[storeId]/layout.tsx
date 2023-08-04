 
import prismadb from "@/libs/prismadb";
import { redirect } from "next/navigation";

import Sidebar from "@/components/modals/Sidebar/sidebar";
import { serverAuth } from "@/libs/serverAuth";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { currentUser } = await serverAuth();
  const store = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
    },
  });

  if (!currentUser) {
    redirect("/");
  }
  if (!store || currentUser.id != store.ownerId) {
    redirect("/home");
  }

  return (
    <>
      <div className=" md:flex ">
        <Sidebar />
        <div className="md:ml-[250px]">{children}</div>
      </div>
    </>
  );
}
