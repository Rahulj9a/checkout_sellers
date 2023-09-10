import React from "react";
import prisma from "@/libs/prismadb";
import ProductForm from "./components/productForm";

const ProductPage = async ({
  params,
}: {
  params: { productId: string, storeId: string };
}) => {
  const product =
    params.productId === "new"
      ? null
      : await prisma.product.findUnique({
        where: {
          id: params.productId,
        },
        include: {
          image: true
        }
      });

  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId
    }
  })
  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId
    }
  })
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {product != null ? <ProductForm initialData={product} categories={categories} sizes={sizes} colors={colors} /> : <ProductForm categories={categories} sizes={sizes} colors={colors} />}
      </div>
    </div>
  );
};

export default ProductPage;
