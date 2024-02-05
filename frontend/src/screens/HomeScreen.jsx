import React from 'react'
import { Button } from '@material-tailwind/react'
import bus from '../assests/bus.png'
import { Link } from '@mui/material'

const HomeScreen = () => {
  return (
    <>
     <section>
      <div className='container flex flex-col-reverse mx-auto py-6 lg:flex-row lg:mb-0'>
        <div className='flex flex-col space-y-10 lg:mt-16 lg:w-1/2'>
          <h1 className='text-3xl font-semibold text-center lg:text-6xl lg:text-left'>Convenient Bus Tickets</h1>
          <p className='max-w-md mx-auto text-lg text-center text-gray-400 lg:text-2xl lg:text-left lg:mt-0 lg:mx-0'>
          Book your bus tickets hassle-free with our user-friendly website.
          </p>
          {/* button */}
          <div  className='flex items-center justify-center w-full space-x-4 lg:justify-start'>
            <Link href="/SearchScreen">
            <Button className='p-4 text-sm font-semibold text-white bg-blue-600 rounded shadow-md border-2 border-blue-600 md:text-base hover:bg-white hover:text-blue-900'>Get Started</Button>
            </Link></div>
        </div>
        {/* image */}
        <div className='relative mx-auto lg:mb-0 lg:w-1/2'>
          {/* <div className='bg-hero'></div>
      <img src={bus} alt="#" className='relative z-10 lg:top-30 xl:top-0 overflow-x-visible' /> */}
      </div>
      </div>
    </section>
    </>
  )
}

export default HomeScreen