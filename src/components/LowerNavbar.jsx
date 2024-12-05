import React from 'react'

// component
import ListComponentHome from "./ListComponentHome";


const LowerNavbar = () => {
  return (
    <div className='relative shadow-md bg-white duration-200'>
      {/* lower Navbar */}
      <div className="flex justify-center items-center">
          
        <ListComponentHome/>
              
      </div>
    </div>
  )
}

export default LowerNavbar
