"use client"
import React, { useState, useEffect } from 'react'

import { app } from "../../../../firebaseConfig";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

import UploadForm from './_components/UploadForm'
import StorageAlert from './_components/StorageAlert';
import { useUser } from '@clerk/nextjs';
import {generateRandomstring} from '../../../_utils/GenerateRandomString';

function Upload() {
    const storage = getStorage(app);
    const db = getFirestore(app);

    const{user}=useUser();

    const [progress, setProgress] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    const uploadFile = (file) => {
        const metadata = {
            contentType: file.type,
        };
        const imageRef = ref(storage, 'file-upload/' + file.name);
        const uploadTask = uploadBytesResumable(imageRef, file, metadata);
        // Listen for state changes
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progressWork = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progressWork);

                if (progressWork === 100) {
                    // Now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setShowAlert(true);
                        setTimeout(() => setShowAlert(false), 3500);
                        saveInfo(file, downloadURL)
                    });
                }

            });
    }

    const saveInfo = async (file, fileURL) => {
        const docId = Date.now().toString();

        // Add a new document in collection "uploadedFile"
        await setDoc(doc(db, "uploadedFile", docId), {
            fileName: file.name,
            fileSize: file.size,
            fileUrl: fileURL,
            userEmail: user.primaryEmailAddress.emailAddress,
            userName: user.fullName,
            password: '',
            shortUrl: process.env.NEXT_PUBLIC_BASE_URL+ generateRandomstring(),
        }).then(resp => console.log(resp));
    }

    return (
        <div className='relative'>

            {showAlert && (
                <div className='absolute left-1/2 transform -translate-x-1/2 mt-[-60px]'>
                    <StorageAlert msg={'Your files were uploaded correctly.'} />
                </div>
            )}
            <h2 className='text-[20px] font-bold text-center m-5'>Start <strong className='text-primary'>Uploading</strong> Your Stock</h2>
            <div>
                <UploadForm uploadClick={(file) => uploadFile(file)} progress={progress} showAlert={showAlert} />
            </div>
        </div>
    )
}

export default Upload