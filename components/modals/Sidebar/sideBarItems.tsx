import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface sideBarItemsProps {
    label: string;
    href?:string;
    className?: string
    active?:boolean
}
const SideBarItem: React.FC<sideBarItemsProps> = ({
    label,href, className,active
}) => {
    const router = useRouter()
    const handleClick = () => {
        if (href) {
            router.push(href)
        }

    }
    return (
        <>


            <Button variant='ghost' className={cn("  p-2 my-2 ", active?"w-[242px] rounded-l-full bg-white":"w-[220px]" , className)}>
                <span className='text-lg md:text-xl' onClick={handleClick}>
                    {label}
                </span>
                <span>
                 
                </span>
            </Button>

        </>
    )
}

export default SideBarItem