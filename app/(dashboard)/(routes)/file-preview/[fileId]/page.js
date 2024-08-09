"use client"
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { app } from '../../../../../firebaseConfig';
import Link from 'next/link';
import { ArrowLeftSquareIcon } from 'lucide-react';
import FileInfo from './_components/FileInfo';

function FilePreviewPage({ params }) {

    const db = getFirestore(app);
    const [file, setFile] = useState();

    useEffect(() => {
        params?.fileId && getFileInfo();
    }, []);

    const getFileInfo = async () => {
        const docRef = doc(db, 'uploadedFile', params?.fileId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setFile( docSnap.data());
        } else {
            //SHOW 404 PAGE
            console.log("No such document!");
        }
    }


    return (
        <div className='py-10 px-20'>
            <div>
                <Link href='/upload' className='flex gap-3'> <ArrowLeftSquareIcon/> Go back </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
                <FileInfo file={file}/>
              
            </div>
        </div>
    )
}

export default FilePreviewPage