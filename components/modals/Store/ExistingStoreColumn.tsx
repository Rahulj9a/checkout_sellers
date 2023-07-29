"use client"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

interface ExistingStoreColumnProps {
  id: number;
  name: string;
  coverImage?: string;
}

const ExistingStoreColumn: React.FC<ExistingStoreColumnProps> = ({
  coverImage,
  name,
  id,
}) => {
   
  const router = useRouter()
  const handleClick = () => {
    router.push(`/${id}`)
    
  };
  return (
    <div
      onClick={handleClick}
      className="w-56 flex m-6 hover:bg-slate-200 cursor-pointer justify-center items-center h-40   rounded-md shadow-lg     hover:shadow-2xl "
    >
      <div
        className={`h-full rounded-md flex items-center justify-center w-full ${
          coverImage ? `bg-[${coverImage}]` : "bg-white"
        }`}
      >
        <h1 className="uppercase font-semibold text-xl text-black">{name}</h1>
      </div>
    </div>
  );
};

export default ExistingStoreColumn;
