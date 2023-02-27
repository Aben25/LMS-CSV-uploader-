import React, { useState } from 'react';
import EmailPopup from './EmailPopup';

export default function Nav() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                <div className="container-fluid">
                    <a className="text-xl text-black" href="#">LMS CSV Uploader</a>
                </div>
                <div>
                    <button onClick={() => setShowPopup(true)} className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Download
                    </button>
                </div>
            </div>
            {showPopup && <EmailPopup onClose={() => setShowPopup(false)} />}
        </nav>
    );
}
