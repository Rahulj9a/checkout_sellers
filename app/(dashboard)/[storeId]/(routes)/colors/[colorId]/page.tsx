import React from "react";
import prisma from "@/libs/prismadb";
import ColorForm from "./components/colorForm"

const SizePage = async ({
  params,
}: {
  params: { colorId: string };
}) => {
  const color =
    params.colorId === "new"
      ? null
      : await prisma.color.findUnique({
          where: {
            id: params.colorId,
          },
        });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {color!=null? <ColorForm initialData={color}/>:<ColorForm/>}
      </div>
    </div>
  );
};

export default SizePage;
