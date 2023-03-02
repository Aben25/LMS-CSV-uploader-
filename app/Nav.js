
import axios from 'axios';
import React, { useState } from 'react';
import EmailPopup from './EmailPopup';

export default function Nav() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // build URL parameter string from form data
    const formData = {
      email: email,
      url: window.location.href,
      // add other form fields as needed
    };
    const urlParams = Object.keys(formData)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
      .join('&');

    // send POST request using fetch
    fetch('https://b4qyaiouscte5mtek47e3piaaq0hdnls.lambda-url.us-east-1.on.aws/?email=' + email + '&url=' + window.location.href + '&filename=' + '&LMS_report.pdf' + '&subjectLine=' + '&LMS Report' + '&body=' + 'Please find attached the LMS report',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Success') {
          setFormStatus('success');
          setFormMessage('PDF has been sent to your email address!');
        } else {
          setFormStatus('error');
          setFormMessage('An error occurred while submitting the form. Please refresh the page and try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setFormStatus('error');
        setFormMessage('An error occurred while submitting the form. Please refresh the page and try again.');
      });
  };


  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <div className="container-fluid">
          <a className="text-xl text-black" href="#">LMS CSV Uploader</a>
        </div>
        <div>
          {/* A form with email inpute and a button called send me report aligned side by side*/}
          <form className="flex flex-row items-center justify-center w-full gap-3" >
            <input className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleSubmit} className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Send me report
            </button>
          </form>
          {formStatus === 'success' && (
            <p className="text-green-500">{formMessage}</p>
          )}
          {formStatus === 'error' && (
            <p className="text-red-500">{formMessage}</p>
          )}



        </div>
      </div>
    </nav>
  );
}
