"use client"

import { ChevronRight, Loader2, LogOut, Menu, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import googleIcon from '../assets/googleIcon.png'


interface User {
  profileImage: string;
}

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/status', {
        credentials: 'include',
      });
      const data = await response.json();
      setIsLoggedIn(data.isLoggedIn);
      setUser(data.user);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDropwdown = () => {
      setDropdown(prev => !prev)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      
      if (response.ok) {
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <div className='flex flex-row items-center justify-between md:justify-around p-8 w-full'>
      <span className="text-xl font-bold">GenIdeas</span>
      <div className='hidden md:flex  flex-row items-center gap-10'>
        <span className="cursor-pointer">Product</span>
        <span className="cursor-pointer">Credits</span>
      </div>

     


      {isLoading ? (
              <div className="w-[2.3rem] h-[2.3rem] rounded-3xl flex items-center justify-center bg-gray-200">
                <Loader2 className="animate-spin" size={20} />
              </div>
            ) : !isLoggedIn ? (
                <div className='hidden md:flex flex-row items-center gap-10'>
                  <div className='flex flex-row items-center gap-1 bg-white pr-2 pl-4 py-1 rounded-md cursor-pointer'
                    onClick={() => {
                      window.location.href = "http://localhost:8080/login/federated/google";
                    }}
                  > 
                    <img src={googleIcon.src} alt="Google Logo" className="w-6 h-6" />
                    <span>Sign in with Google</span>
                    <p className='text-sm'> 
                      <ChevronRight className='w-5 h-5 pt-[1.5px]' />
                    </p>
                  </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="w-[2.3rem] h-[2.3rem] rounded-3xl overflow-hidden">
                  {user && user.profileImage ? (
                    <img src={user.profileImage} className='w-full h-full object-cover' alt="Profile" />
                  ) : (
                    <div className='w-full h-full bg-gray-300'></div> // Placeholder
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <LogOut className="inline-block mr-2" size={18} />
                  Logout
                </button>
              </div>
            )}

      <button 
      className="md:hidden relative w-10 h-10 bg-white rounded-md shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 ease-in-out"
      onClick={handleDropwdown}
    >
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${dropdown ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
        <Menu size={24} />
      </div>
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${dropdown ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
        <X size={24} />
      </div>
    </button>

    <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${dropdown ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className='flex flex-row justify-between p-8 '>
            <span className="text-xl font-bold mb-8 pt-1">GenIdeas</span>
              <button  
              onClick={handleDropwdown}
              className="self-end p-2 flex flex-row justify-between rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 mb-8"
            >
              <X size={24} />
            </button>
          </div>
          <div className='flex flex-col gap-8 w-full'>
            <p className="cursor-pointer w-full hover:bg-[#B7E0FF] rounded-sm px-8 py-3">Product</p>
            <p className="cursor-pointer w-full hover:bg-[#B7E0FF] rounded-sm px-8 py-3">Credits</p>
            <p className="cursor-pointer w-full hover:bg-[#B7E0FF] rounded-sm px-8 py-3">Log in</p>
            <div className='cursor-pointer w-full hover:bg-[#B7E0FF] rounded-sm px-8 py-3 flex flex-row items-center gap-2'>
              <span>Sign up</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {dropdown && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleDropwdown}
        ></div>
      )}

    </div>
  )
}

export default Navbar