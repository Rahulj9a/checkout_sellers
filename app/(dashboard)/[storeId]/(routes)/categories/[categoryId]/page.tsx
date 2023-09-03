import React from "react";
import prisma from "@/libs/prismadb";
import CategoryForm from "./components/categoryForm";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string, storeId: string };
}) => {
  const category =
    params.categoryId === "new"
      ? null
      : await prisma.category.findUnique({
        where: {
          id: params.categoryId,
        },
      });
  
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {category != null ? <CategoryForm billboards={billboards} initialData={category} /> : <CategoryForm billboards={billboards}/>}
      </div>
    </div>
  );
};

export default CategoryPage;
