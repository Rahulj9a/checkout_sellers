import { Skeleton } from "@/components/ui/skeleton";

// app/home/loading.tsx
export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-end">
        <div className="w-[250px] h-[180px]">
            <Skeleton className="px-4 py-2 w-full h-10"/>
            <Skeleton className="px-4 py-2 w-full h-10"/>
            <Skeleton className="px-4 py-2 w-20 h-10"/>
        </div>
    </div>
  );
}