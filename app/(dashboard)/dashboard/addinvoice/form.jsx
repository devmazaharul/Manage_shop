"use client";
import { baseURL } from '@/connection/baseurl';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function InvoicesForm() {

    const [products, setproducts] = useState([])


    useEffect(()=>{

        axios.get(baseURL+'/products').then(res=>{
       
           setproducts(res.data)
        }).catch(err=>{ 
            console.log(err)
        })
    },[])

    const [pdetails, setpdetails] = useState({})

    const handleChnage=(id,index)=>{
       const filterProduct= products.data.find((v,i)=>{
            if(v._id===id){
              return v
            }
        })

 setpdetails({...filterProduct,index})

    }


    const obj={
        name:'',
        price:''
    }
    const [form, setform] = useState([{...obj}])

    const handleClick=()=>{
        setform([...form,obj])
    }



  return (
    <div className='w-[80%] mx-auto'>
      <h1>All products </h1>
    {form.map((v,i)=>{
        return (
            <div key={i} className='flex items-center gap-3 bg-orange-300 p-2 rounded-md justify-normal'>
            <div>
                <select name="name" id="name" onChange={(e)=>handleChnage(e.target.value,i)}>
                    <option value="">Select Product</option>
                    {products.data && products.data.map((v,i)=>{
                        return <option key={i} value={v._id}>{v.name}</option>
                    })}
                </select>
            </div>
            <div>
                <input type="text" value={i==pdetails.index?pdetails.price:''} name="price" id="price" />
            </div>
            <div>
       {i===form.length-1 && <button className='btn_primary' onClick={handleClick}>Add</button>}
       {i!==form.length-1 && <button className='btn_outline '>Remove</button>}
   
    </div>
            </div>
        )
    })}
     
  
    </div>
  )
}
