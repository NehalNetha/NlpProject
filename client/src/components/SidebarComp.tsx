import { Plus, Search, Settings, Sidebar, User, UserCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'



interface SidebarProps {
    toggleSidebar: () => void;
    CreateNewSession: () => void;
  
}



const SidebarComp = ({toggleSidebar, CreateNewSession}: SidebarProps) => {
  return (
    <div>
        <div className='flex flex-row justify-between'>
          <Link href={"/"} className=' text-[19px] font-semibold'>Diagnosis</Link>
          <button onClick={toggleSidebar}>
              <Sidebar />
          </button>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='flex flex-row justify-between items-center mt-[3rem]'>
            <div className='flex flex-row items-center gap-2'>
                <button className=''>
                  <UserCircle />
                </button>
              <h1>Nehal Netha </h1>

            </div>

            <button className='text-gray-500'>
              <Settings  className='w-[12] h-[18px]'/>
            </button>
          </div>

          <div className="relative">
              <input
                type="text"
                placeholder="Search for chats.."
                className="w-full py-1 pl-8 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder:text-xs placeholder:text-gray-400"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
          </div>
          
        </div>


        <div className='mt-[3rem] flex flex-col justify-start items-start w-full gap-3'>
          <p className='text-gray-400 text-[12px]'>
            PINNED
          </p>
          <div className='flex flex-col items-start w-full gap-3'>
            <button className='text-left truncate w-full text-gray-500 hover:text-black py-1 rounded text-[14px]'>
              what is encoder only architecture?
            </button>
            <button className='text-left truncate w-full text-gray-500 hover:text-black py-1 rounded text-[14px]'>
              what is decoder only architecture?
            </button>
            <button className='text-left truncate w-full text-gray-500 hover:text-black py-1 rounded text-[14px]'>
              are both the same only architecture?
            </button>
            <button className='text-left truncate w-full text-gray-500 hover:text-black py-1 rounded text-[14px]'>
              everything is dead only architecture?
            </button>
          </div>
         </div>

         <div className='mt-[2rem] flex flex-col justify-start items-start w-full gap-3'>
          <p className='text-gray-400 text-[12px]'>
            History
          </p>
          <div className='flex flex-col items-start w-full gap-3'>
            <button className='text-left truncate w-full text-gray-500 hover:text-black py-1 rounded text-[14px]'>
              what is encoder only architecture?
            </button>
            <button className='text-left truncate w-full text-gray-500 hover:text-black py-1 rounded text-[14px]'>
              what is decoder only architecture?
            </button>
            <button className='text-left truncate w-full text-gray-500 hover:text-black py-1 rounded text-[14px]'>
              are both the same only architecture?
            </button>
            <button className='text-left truncate w-full text-gray-500 hover:text-black py-1 rounded text-[14px]'>
              everything is dead only architecture?
            </button>
          </div>
         </div>

        
        <button 
          className='  flex flex-row justify-center items-center gap-1 w-full py-2 bg-blue-600 text-white rounded-md mt-[8rem] md:mt-[4rem]'
          onClick={CreateNewSession}
        >
          <Plus className='w-4 h-4'/>

            <p>
              Start new chat
            </p>
        </button>

    </div>
  )
}

export default SidebarComp