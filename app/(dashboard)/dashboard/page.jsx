'use client'
import Link from 'next/link'
import React from 'react'

const page = () => {

    const handleClick=(v)=>{
        alert(v)
    }

   



  return (
    <div>
      <h1>HEllow world</h1>
     <div className='grid gap-2 grid-cols-3 w-[80%] mx-auto'>
      <Link  className='btn_primary' href='/dashboard/addinvoice'>
      Add Invoice
      </Link>

     </div>
    </div>
  )
}

export default page
