import React from "react";
import prisma from "@/libs/prismadb";
import BillboardForm from "./components/billboardForm";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard =
    params.billboardId === "new"
      ? null
      : await prisma.billboard.findUnique({
          where: {
            id: params.billboardId,
          },
        });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm/>
      </div>
    </div>
  );
};

export default BillboardPage;
