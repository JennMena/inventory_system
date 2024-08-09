"use client"
import { BellRing, CirclePlus, FolderOpen, ImageUp, PackageOpen, Shield, ShoppingBag } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function SideNav({ closeSideBar }) {
    const menuList = [
        {
            id: 1,
            name: 'Add items',
            icon: CirclePlus,
            path: '/upload'
        },
        {
            id: 2,
            name: 'My Stock List',
            icon: PackageOpen,
            path: '/stock-list'
        },
        {
            id: 3,
            name: 'Remainders',
            icon: BellRing,
            path: '/remainders'
        },
        {
            id: 6,
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