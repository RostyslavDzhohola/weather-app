/** @format */

import React from 'react'
import { MdOutlineSearch } from "react-icons/md";
import { cn } from '../utils/cn'

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

export default function SearchBox(props: Props) {
  return (
    <form 
      onSubmit={props.onSubmit} 
      className={cn("flex relative items-center justify-center h-10", props.className )}>
      <input 
        type="text"
        value={props.value}
        onChange={props.onChange}
        className='w-[230px] border border-gray-300 rounded-l-md px-3 py-2 h-full focus:outline-none focus:border-blue-500' 
        placeholder='Search for a city' 
      />
      <button className='px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full '>
        <MdOutlineSearch />
      </button>
    </form>
  )
}