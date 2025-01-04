"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const Navbar = () => {


    const pathName=usePathname()

  return (
<div className=''>
<div className='container'>
      <div className='flex justify-between items-center py-4'>
      <div>
            <h1 className='h3'>Manage</h1>
        </div>
        <div className='flex space-x-4'>
            <Link className={`${pathName=="/"?'text_primary':""}`} href='/'>
                <p>Home</p>
            </Link>
            <Link className={`${pathName=="/about"?'text_primary':""}`} href='/about'>
                <p>About</p>
            </Link>
            <Link className={`${pathName=="/services"?'text_primary':""}`} href='/services'>
                <p>Services</p>
            </Link>
            <Link className={`${pathName=="/contact"?'text_primary':""}`} href='/contact'>
                <p>Contact</p>
            </Link>
            </div>

            {/* sign in */}
            <div>
            <Link href='/signin'>
                <p>Sign In</p>
            </Link>
            </div>
      </div>

      
    </div>
</div>
  )
}

export default Navbar
