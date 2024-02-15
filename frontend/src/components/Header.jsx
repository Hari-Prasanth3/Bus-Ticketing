import {Navbar,Button} from '@material-tailwind/react'
import { Link } from '@mui/material'
import React from 'react'


const Header = () => {
  
  return (
    <>
    <Navbar className='flex items-center justify-between p-6 backdrop-blur lg:px-8 bg-gray-400 border-none' >
      <Link href="/" >
      <p  className='text-rose-800'>Bus Ticketing</p></Link>
      <div className=" flex space-x-4 ">
          <a href="/login" variant="text" size="sm" className="inline-block  rounded-md p-2 bg-rose-500 " >
            <span >Sign In</span>
          </a>
          <a href="/register"
            variant="text" 
            size="sm"
            className="inline-block rounded-md p-2 bg-rose-500 "
          >
            <span>Sign Up</span>
          </a>
       
     
        </div>
    </Navbar>
    
    </>
  )
}

export default Header