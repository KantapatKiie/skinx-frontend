'use client'

import React from 'react'
import Image from 'next/image';

interface Props{
    image:string;
    name:string;
    href:string;
}
const ListItem = ({image,name}:Props) => {
  return (
    <button className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'>
        <div className='relative min-h-[64px] min-w-[64px]'>
            <Image className='object-cover' fill src={image} alt='img'/>
        </div>
        <p className='font-medium truncate py-5'>{name}</p>
    </button>
  )
}

export default ListItem