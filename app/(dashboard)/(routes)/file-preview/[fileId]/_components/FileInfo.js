"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function FileInfo({ file }) {
    const [fileType, setFileType] = useState();
    useEffect(() => {
        file && setFileType(file?.fileType.split('/')[0]);
        console.log(fileType);
    }, [file])
    return file && (
        <div className='text-center border flex justify-center m-4 flex-col items-center p-2 rounded-lg border-blue-200'>
            <Image src={fileType == 'image' ? file?.fileUrl : '/file.png'}
                width={300} height={300} style={{ width: 300, height: 300 }}
                className='rounded-md object-contain'>
            </Image>
            <div>
                <h2 className='text-[14px]'>{file.fileName}</h2>
                <h2 className='text-gray-400 text-[12px]'>{file.fileType} / {file.fileSize}</h2>
            </div>


        </div>
    )
}

export default FileInfo