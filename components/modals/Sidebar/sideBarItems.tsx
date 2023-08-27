import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface sideBarItemsProps {
    label: string;
    href?: string;
    className?: string
    active?: boolean
}
const SideBarItem: React.FC<sideBarItemsProps> = ({
    label, href, className, active
}) => {
    const router = useRouter()
    const handleClick = () => {
        if (href) {
            router.push(href)
        }

    }
    return (
        <>


            <Button variant='ghost' className={cn("flex flex- p-2 my-2 w-[220px] hover:bg-lime-100", active?"w-[242px] rounded-l-full bg-lime-100" :"w-[220px]", className)}>
                <p className='text-lg md:text-xl' onClick={handleClick}>
                    {label}
                </p>
                 
            </Button>

        </>
    )
}

export default SideBarItem