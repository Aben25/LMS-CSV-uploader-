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
        setUploadMessage('');
        setLoading(true);

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('file', selectedFiles[i]);
        }

        axios.post('http://127.0.0.1:8080/upload', formData, {
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
        <div className="flex flex-col container">
            <input className="py-2 px-3 border border-gray-400 rounded-lg" type="file" onChange={handleFileChange} multiple />
            <button className={`py-2 px-3 bg-black text-white rounded-lg my-2 hover:bg-gray-600 ${loading ? 'cursor-not-allowed' : ''}`} onClick={handleUpload} disabled={loading}>
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
