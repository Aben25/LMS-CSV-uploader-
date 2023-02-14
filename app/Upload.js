import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    }

    const handleUpload = () => {
        setLoading(true);

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('file', selectedFiles[i]);
        }

        axios.post('//awseb-e-2-awsebloa-qeesm5o2k5oe-1888775464.us-east-1.elb.amazonaws.com/upload', formData, {
            onUploadProgress: (progressEvent) => {
            },
            responseType: 'json',
        })
            .then(response => {
                console.log(response.data);
                setUploadMessage(response.data);
                setLoading(false);
                const url = window.URL.createObjectURL(new Blob([response.data]));
            })
            .catch(error => {
                console.log(error);
                setUploadMessage('Upload failed');
                setLoading(false);
            });
    }

    return (
        <div className="flex flex-col items-center">
            <input className="py-2 px-3 border border-gray-400 rounded-lg" type="file" onChange={handleFileChange} multiple />
            <button className={`py-2 px-3 bg-indigo-500 text-white rounded-lg my-2 hover:bg-indigo-600 ${loading ? 'cursor-not-allowed' : ''}`} onClick={handleUpload} disabled={loading}>
                {loading ? (
                    <>
        
                        Processing...
                    </>
                ) : (
                    'Upload'
                )}
            </button>
            {uploadMessage}
        </div>

    );
};

export default FileUploader;
