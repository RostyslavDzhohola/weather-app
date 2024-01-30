import React from 'react'
import { MdOutlineSearch } from "react-icons/md";

type Props = {
  value: string;
  // onChange: 
  // onSubmit:
}

export default function SearchBox({}: Props) {
  return (
    <form className='flex relative items-center justify-center h-10'>
      <input 
        type="text" 
        className='w-[230px] border border-gray-300 rounded-l-md px-3 py-2 h-full focus:outline-none focus:border-blue-500' 
        placeholder='Search for a city' 
      />
      <button className='px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full '>
        <MdOutlineSearch />
      </button>
    </form>
  )
}