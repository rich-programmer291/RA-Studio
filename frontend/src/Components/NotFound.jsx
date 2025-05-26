import React from 'react'
import pnf from '../assets/404-new.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <div className='min-h-screen flex flex-col justify-center p-6 items-center bg-gray-100 normal text-blue-700'>
                <p className='text-[12rem] mb-2'>404</p>
                <p className='mt-[-3.5rem] mb-[1.5rem]'>_______________________________________________________________________</p>
                <p className='font-bold tracking-wide text-lg'>ERROR 404 : <span className='font-semibold'>Page Not Found</span></p>
                <p className='mt-1 text-sm tracking-wide text-center'>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <Link to='/' className='mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300'>Home</Link>
            </div>
        </>
    )
}

export default NotFound