'use client'
import { useSideBar } from '@/hooks/useSideBar'
import { SidebarClose, SidebarOpen } from 'lucide-react'
import React from 'react'

const Sidebar = () => {
    const sidebar = useSideBar()
  return (
    <div className={`w-[250px] h-screen -translate-y-10 duration-150 -z-10  absolute bg-red-200 ${!sidebar.isOpen?'-translate-x-[250px]':''}`}>
        <div className='absolute m-auto -right-5 top-12'>
             {sidebar.isOpen?<SidebarClose onClick={()=>sidebar.onClose()} className='h-7 w-7 '/>:<SidebarOpen onClick={()=>sidebar.onOpen()} className='h-7 w-7'/>}
        </div>
    </div>
  )
}

export default Sidebar