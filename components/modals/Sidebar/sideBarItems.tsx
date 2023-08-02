import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { useRouter } from 'next/navigation';
import React from 'react'

interface sideBarItemsProps {
    label: string;
    href?:string;
    className?: string
}
const SideBarItem: React.FC<sideBarItemsProps> = ({
    label,href, className
}) => {
    const router = useRouter()
    const handleClick = () => {
        if (href) {
            router.push(href)
        }

    }
    return (
        <>


            <Button variant='ghost' className={cn("w-full p-2 my-3", className)}>
                <span className='text-lg md:text-xl' onClick={handleClick}>
                    {label}
                </span>
            </Button>

        </>
    )
}

export default SideBarItem