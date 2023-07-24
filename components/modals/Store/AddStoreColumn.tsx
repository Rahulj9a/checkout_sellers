import { useStoreModal } from "@/hooks/useStoreModal";
import React from "react";

const AddStoreColumn = () => {
    const storeModal = useStoreModal()

    const handleClick = ()=>{
        storeModal.onOpen()
    }
  return (
    <div onClick={handleClick} className="w-36 flex m-6 hover:bg-slate-200 cursor-pointer justify-center items-center h-24 border-2 border-dotted border-black">
      <div className="rounded-3xl flex items-center justify-center p-2 border-[1px]  border-black">
        <span className="text-xs">Create new Store</span>
      </div>
    </div>
  );
};

export default AddStoreColumn;
