import React from "react";
import prisma from "@/libs/prismadb";
import SizeForm from "./components/sizeForm"

const SizePage = async ({
  params,
}: {
  params: { sizeId: string };
}) => {
  const size =
    params.sizeId === "new"
      ? null
      : await prisma.size.findUnique({
          where: {
            id: params.sizeId,
          },
        });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {size!=null? <SizeForm initialData={size}/>:<SizeForm/>}
      </div>
    </div>
  );
};

export default SizePage;
