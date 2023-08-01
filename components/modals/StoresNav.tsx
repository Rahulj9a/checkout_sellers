'use client'
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/libs/utils";
import Link from "next/link";
import StoreSwitcher from "@/components/modals/StoreSwitcher";
import useGetStores from "@/hooks/useGetStores";

export   function StoresNav({
    className,
    ...props
}:React.HTMLAttributes<HTMLElement>){
const pathname = usePathname()
const params = useParams()
const { data: User,isLoading } = useGetStores();


const routes = [
    {
        href:`/`,
        label: 'Home'
        
    }
]
return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
        {!isLoading?<StoreSwitcher items={User.stores} />:""}
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
             
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
)
}