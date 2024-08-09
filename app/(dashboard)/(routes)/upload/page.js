"use client"
import React, { useState, useEffect } from 'react'

import { app } from "../../../../firebaseConfig";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

import UploadForm from './_components/UploadForm'
import StorageAlert from './_components/StorageAlert';
import { useUser } from '@clerk/nextjs';
import { generateRandomstring } from '../../../_utils/GenerateRandomString';
import { useRouter } from 'next/navigation';
import ItemUpload from './_components/ItemUpload';

function Upload() {
    const storage = getStorage(app);
    const db = getFirestore(app);

    const inventoryRef = collection(db, 'inventory');

    const { user } = useUser();

    const [fileDocId, setFileDocId] = useState(false);
    const [uploadCompleted, setUploadCompleted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    const router = useRouter();

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
                        setTimeout(() => {setShowAlert(false); setUploadCompleted(true)}, 3500);
                        saveInfo(file, downloadURL)
                    });
                }

            });
    }

    const saveInfo = async (file, fileURL) => {
        const docId = generateRandomstring().toString();

        // Add a new document in collection "uploadedFile"
        await setDoc(doc(db, "uploadedFile", docId), {
            fileName: file?.name,
            fileSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
            fileUrl: fileURL,
            fileType: file?.type,
            userEmail: user.primaryEmailAddress.emailAddress,
            userName: user.fullName,
            password: '',
            id: docId,
            shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
        });
        setFileDocId(docId);
    }

    useEffect(() => {
        if(uploadCompleted){
            setUploadCompleted(false);
            router.push('/file-preview/' + fileDocId);
        }
    }, [uploadCompleted == true]);

    const saveItemInfo = async (formData) => {
        const id = `${user.primaryEmailAddress.emailAddress}_${formData.name.toLowerCase().trim()}`; 
        const itemRef = doc(inventoryRef, id);
    
        try {
            const docSnap = await getDoc(itemRef);
            if (!docSnap.exists()) {
                // If the document doesn't exist, add a new one
                const newData = {
                    ...formData,
                    userEmail: user.primaryEmailAddress.emailAddress,
                };
                await setDoc(itemRef, { ...newData, id });
                console.log('Item information saved successfully');
            } else {
                // If the document exists, update the quantity
                const existingData = docSnap.data();
                const newData = {
                    ...formData,
                    quantity: Number(existingData.quantity) + Number(formData.quantity),
                    userEmail: user.primaryEmailAddress.emailAddress,
                };
                await updateDoc(itemRef, newData);
                console.log('Item information modified successfully');
            }
            
        } catch (error) {
            console.error('Error saving item information: ', error);
        }
    };
    
    return (
        <div className='relative'>
            {!uploadCompleted ?
                <div>
                    {showAlert && (
                        <div className='absolute left-1/2 transform -translate-x-1/2 mt-[-60px]'>
                            <StorageAlert msg={'Your files were uploaded correctly.'} />
                        </div>
                    )}
                    <h2 className='text-[20px] font-bold text-center m-5'>Start <strong className='text-primary'>Growing</strong> Your Stock</h2>
                    <div className=' bg-gray-100'>
                    <div className='text-center'>
                        <ItemUpload saveItemInfo={saveItemInfo}/>
                    </div>
                    <div>
                        <UploadForm uploadClick={(file) => uploadFile(file)} progress={progress} showAlert={showAlert} />
                    </div>
                    </div>
                </div>
                : null}
        </div>
    )
}

export default Upload