import React from 'react';
import { Icon } from '@iconify/react';

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 h-20 z-30 bg-white flex justify-between px-14 items-center shadow-md">
      
      {/* Brand */}
      <div className='cursor-pointer'>
        <img src="/Uoons_Ads_logo.png" alt="Uoons-Ads Logo" className="w-48" />
      </div>
      
      {/* Nav Links */}
      <div className="flex gap-4 text-2xl items-center">
        {/* <Icon icon="hugeicons:menu-square" className="hover:text-orange-600 cursor-pointer" />
        <Icon icon="material-symbols-light:live-help-outline" className="hover:text-orange-600 cursor-pointer" /> */}
        
        {/* Sign in / Register Button */}
        <a
          href="#_"
          className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-lg"
        >
          <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute rounded-lg"></span>
          <span className="relative p-2 py-0 text-base transition-all ease-out bg-white rounded-lg group-hover:bg-opacity-0 duration-400">
            <span className="relative">Sign in / Register</span>
          </span>
        </a>


      </div>
    </nav>
  );
};

export default Navbar;
