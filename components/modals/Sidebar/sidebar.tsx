'use client'
import { Button } from '@/components/ui/button'
import { useSideBar } from '@/hooks/useSideBar'
import SideBarItem from '@/components/modals/Sidebar/sideBarItems'
import { SidebarClose, SidebarOpen } from 'lucide-react'
import { redirect, useParams, usePathname } from 'next/navigation'
import React from 'react'
import useGetStores from '@/hooks/useGetStores'
import StoreSwitcher from '@/components/modals/StoreSwitcher'
 



const Sidebar =   ( )=> {
  const pathname = usePathname()
  const params = useParams()
  
  const { data:Stores, isLoading } = useGetStores();
  const sidebar = useSideBar()
  
  
  
  
  
 
  
  
  const routes = [{
    label: "Home",
    href: `/home`,


  },
  {
    label: "Dashboard",
    href: `/${params.storeId}`,
    active: pathname === `/${params.storeId}`

  }, {
    label: "Settings",
    href: `/${params.storeId}/settings`,
    active: pathname === `/${params.storeId}/settings`

  },
  {
    label: "Billboards",
    href: `/${params.storeId}/billboards`,
    active: pathname === `/${params.storeId}/billboards`

  },]


  

  const toggleVisiblity = () => {
    if ( sidebar.isOpen) {
      sidebar.onClose()
    } else {
      sidebar.onOpen()
    }
  }
  return (
    <nav className={`w-[250px] h-screen pt-3  duration-150 z-10 fixed bg-lime-200  ${!sidebar.isOpen ? '-translate-x-[250px] md:translate-x-0' : ''}`}>
      <Button className='absolute  block md:hidden m-auto -right-9 ' variant='ghost' onClick={toggleVisiblity}>
        {sidebar.isOpen ? <SidebarClose className='h-7 w-7 bg-lime-200' /> : <SidebarOpen className='h-7 w-7 bg-lime-200' />}
      </Button>
      <div className=' pl-2 flex flex-col items-center justify-center'>
        <div className=" ">
          {!isLoading ? <StoreSwitcher items={Stores} /> : ""}
        </div>
        {routes.map((route) => {
          return (
            <SideBarItem {...route} key={route.href} />
          )
        })}
      </div>
    </nav>
  )
}

export default Sidebar