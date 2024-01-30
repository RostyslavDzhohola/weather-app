import React from 'react'
import { CiSun } from 'react-icons/ci'
import { FaLocationCrosshairs } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import SearchBox from './SearchBox'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <p className='flex items-center justify-center gap-2'>
          <h2 className='text-gray-500 text-3xl'>Weather</h2>
          <CiSun className='text-5xl mt-1 text-yellow-400 '/>
        </p>
        <section className='flex gap-2 items-center'>
          <FaLocationCrosshairs className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer' />
          <GrMapLocation className='text-3xl text-gray-800 hover:opacity-80 cursor-pointer '/>
          <p className="text-slate-900/80 text-sm">  </p>
          <div>
            <SearchBox />
          </div>
        </section>
      </div>
    </nav>
  )
}