import { Skeleton } from "@/components/ui/skeleton";

// app/home/loading.tsx
export default function Loading() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-1 lg:justify-start justify-center flex-wrap  gap-1 ">
        <Skeleton className="w-56 flex m-6 hover:bg-slate-200 cursor-pointer justify-center items-center h-40   rounded-md shadow-lg     hover:shadow-2xl " />

        <Skeleton className="w-56 flex m-6 hover:bg-slate-200 cursor-pointer justify-center items-center h-40   rounded-md shadow-lg     hover:shadow-2xl " />
      </div>
    </div>
  );
}
