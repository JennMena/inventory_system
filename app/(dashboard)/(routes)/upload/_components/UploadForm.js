import { React, useState } from 'react'
import AlertMsg from './AlertMsg';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';

function UploadForm({ uploadClick, progress, showAlert}) {
    const [file, setFile] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const onFileSelect = (file) => {
        if (file && file.size > 2000000) {
            setErrorMessage('Maximum file upload size is 2MB.');
            return;
        }
        setErrorMessage(null);
        setFile(file);

    }

    return (
        <div className='p-5 px-8 md:px-28 text-center'>
            <h3 className='text-xl mb-4 font-bold'>Or upload a photo for easier logging</h3>

            <div className="flex items-center justify-center w-full">
                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-blue-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-12 h-12 mb-4 text-blue-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-lg md:text-xl text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                                <strong>Click to upload</strong></span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 2MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={(event) => onFileSelect(event.target.files[0])} />
                </label>
            </div>
            {errorMessage ? <AlertMsg msg={errorMessage} /> : null}
            {file ? <FilePreview file={file} removeFile={() => setFile(null)} /> : null}
            {showAlert && progress > 0 ? <ProgressBar progress={progress} /> : null}
            {showAlert == false || progress > 0 ? <div className="flex justify-center mt-5"><button disabled={!file} className='p-2 bg-primary text-white w-[30%] rounded-full disabled:bg-gray-400' onClick={() => {uploadClick(file); setFile(null)}}>
                Upload
            </button></div> : null}


        </div>
    )
}

export default UploadForm