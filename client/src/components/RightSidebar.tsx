import { X } from 'lucide-react'
import React from 'react'

interface RightSidebarProps {
    toggleRightSidebar: () => void;
    imageName: any;
}

function RightSidebar({ toggleRightSidebar, imageName }: RightSidebarProps) {
  return (
    <div className='flex flex-col '>
        <div>
            <button onClick={toggleRightSidebar}>
                <X className='w-4 h-4 text-gray-400 hover:text-gray-600 hover:scale-150 transition-all duration-300' />
            </button>
        </div>

        
        <div className='flex flex-col justify-center items-start gap-3 mt-11 '>
            <div className='w-full'>
                <p className='text-lg font-medium'>Uploaded Images</p>
                <div className="w-full h-px bg-gray-300 my-4"></div>
            </div>
            <div className='px-2 py-2 text-black border border-green-500 bg-green-100  rounded-md gap-5'>
                <p>{imageName}</p>
            </div>
        </div>
    </div>
  )
}

export default RightSidebar