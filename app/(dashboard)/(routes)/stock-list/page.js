"use client"
import React, { useState, useEffect } from 'react'
import Table from './_components/Table';
import { addDoc, collection, getDocs, getFirestore, updateDoc, query, where } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import { app } from "../../../../firebaseConfig";

function page() {
    const db = getFirestore(app);

    const inventoryRef = collection(db, 'inventory');

    const { user } = useUser();

    const [items, setItems] = useState();

    useEffect(() => {
        getAllItems();
    }, []);

    const getAllItems = async () => {

        const userEmail = (user.primaryEmailAddress.emailAddress).toString();
        const q = query(inventoryRef, where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(list);
        setItems(list);
    }

    return (
        <div className='relative'>
            <div>
                <div className='absolute left-1/2 transform -translate-x-1/2 mt-[-60px]'>
                    
                </div>
                <h2 className='text-[20px] font-bold text-center m-5'>Take a look at what is on <strong className='text-primary'>stock</strong>.</h2>
                <div className=' bg-gray-100'>
                    <div className='text-center p-4'>
                        <Table items={items}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page