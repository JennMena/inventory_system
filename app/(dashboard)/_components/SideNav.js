"use client"
import { BellRing, FolderOpen, ImageUp, Shield, ShoppingBag } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function SideNav({ closeSideBar }) {
    const menuList = [
        {
            id: 1,
            name: 'Upload',
            icon: ImageUp,
            path: '/upload'
        },
        {
            id: 2,
            name: 'Files',
            icon: FolderOpen,
            path: '/files'
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: Shield,
            path: '/upgrade'
        },
        {
            id: 4,
            name: 'Remainders',
            icon: BellRing,
            path: '/remainders'
        },
        {
            id: 5,
            name: 'Shopping List',
            icon: ShoppingBag,
            path: '/shopping-list'
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className='shadow-sm border-r h-full'>
            <div className='p-5'>
                <Link href={menuList[activeIndex].path}>
                    <Image src='/logo.svg' width={150}
                        height={100} alt='logo' />
                </Link>
            </div>
            <div className='flex flex-col float-left w-full'>
                {menuList.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <button
                            key={index}
                            className={`flex gap-2 p-4 px-6
                hover:bg-gray-100 w-full
                text-gray-500
                ${activeIndex == index ? 'bg-blue-50 text-primary' : null}`}
                            onClick={() => { setActiveIndex(index); closeSideBar() }}
                        >
                            <item.icon />
                            <h2>{item.name}</h2>
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav