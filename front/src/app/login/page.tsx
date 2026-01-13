"use client";

import dbStorage from "@/utils/dbstorage";
import React, { useState, useCallback, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
//components
import Footer from '@/components/AppFooter';
import ChatAI from '@/components/ChatAI';
import CustomAlert from '@/components/CustomAlert';
import { create } from "domain";

interface FormData {
  username: string;
  password: string;
}

// Placeholder URLs for images (using Noto font for text)
const PLACEHOLDERS = {
  loginBg: 'loginbackground.png',
};

// --- Main App Component ---
const App: React.FC = () => {
  const router = useRouter();
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const closeAlert = useCallback(() => { setIsAlertOpen(false); setAlertMessage(''); }, []);
  const customAlert = useCallback((message: string) => { setAlertMessage(message); setIsAlertOpen(true); }, []);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  useEffect(() => {
    // run on client only; check token in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token && token.trim() !== '') {
      // redirect if token
      router.replace('/home');
    }
  }, [router]);

  // Login Handler (Simulated)
  const handleLogin = useCallback(async () => {
    let isValid: boolean = true;

    // Username Validation
    if (!formData.username.trim()) {
      setUsernameError('Username must not be empty.');
      isValid = false;
    } else if (formData.username.includes(' ')) {
      setUsernameError('Username must not have white space.');
      isValid = false;
    } else if (formData.username.length < 3) {
      setUsernameError('Username must be three (3) characters long.');
      isValid = false;
    } else {
      setUsernameError('');
    }

    // Password Validation
    if (!formData.password.trim()) {
      setPasswordError('Password must not be empty.');
      isValid = false;
    } else if (formData.password.includes(' ')) {
      setPasswordError('Password must not have white space.');
      isValid = false;
    } else if (formData.password.length < 3) {
      setPasswordError('Password must be three (3) characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {

      try {
        const signin = await dbStorage.signin(formData.username, formData.password);
        if (signin) {
          customAlert("Login Successfully.");
          router.push('/home')
        }
      } catch (error) {
        customAlert(error instanceof Error ? error.message : String(error));
      }

    }
  }, [formData, usernameError, passwordError]);

  // Accessibility: handle login on Enter key press in form
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  const mainContainerStyle: React.CSSProperties = {
    minHeight: '100vh',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f9fafb', // bg-gray-50
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingBottom: '16vw',
  };

  const contentAreaStyle: React.CSSProperties = {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem', // p-4
    minHeight: '73vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url('${PLACEHOLDERS.loginBg}')`,
  };

  const cardStyle: React.CSSProperties = {
    width: '100',
    marginLeft: '48vw',
    maxWidth: '30rem', // max-w-6xl
    borderRadius: '1.5rem', // rounded-3xl
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // shadow-2xl
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // bg-white/90
    backdropFilter: 'blur(4px)', // backdrop-blur-sm
    display: 'flex',
    flexDirection: 'column', // mobile default
  };

  const imageSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem', // p-8
    flex: '1 1 50%',
  };

  const formSectionStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '3rem', // p-12
    flex: '1 1 50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1.5rem', // space-y-6
  };

  // Responsive logic for the card (simplified)
  if (typeof window !== 'undefined' && window.innerWidth >= 768) { // Simulate md:
    cardStyle.flexDirection = 'row-reverse';
  }


  return (
    <div style={mainContainerStyle}>
      <Image height={1500} width={2000} alt="Login Illustration" src="/whitelettering.png"
        style={{
          position: 'absolute',
          height: 'auto',
          top: '5vw',
          left: '3vw',
          width: '48vw',
        }} />

      {/* Main Content Area */}
      <div style={contentAreaStyle}>
        {/* Main Login Card Container */}
        <div style={cardStyle}>

          {/* Form Section */}
          <div style={formSectionStyle}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#111827', textAlign: 'center' }}>
              Log-in into <span style={{ color: '#059669' }}>NurSYNC</span>
            </h1>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', textAlign: 'center' }}>
              Don't have an Account? <a href="../signup" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600', transition: 'color 150ms' }}>Sign-up</a>
            </p>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onKeyDown={handleKeyDown}>
              {/* Username Input */}
              <div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', maxWidth: '28rem', margin: '0 auto' }}>
                  <svg style={{ position: 'absolute', left: '0.6rem', width: '2rem', height: '2rem', color: '#6b7280' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="currentColor" xmlSpace="preserve"><path d="M135.832 140.848h-70.9c-2.9 0-5.6-1.6-7.4-4.5-1.4-2.3-1.4-5.7 0-8.6l4-8.2c2.8-5.6 9.7-9.1 14.9-9.5 1.7-.1 5.1-.8 8.5-1.6 2.5-.6 3.9-1 4.7-1.3-.2-.7-.6-1.5-1.1-2.2-6-4.7-9.6-12.6-9.6-21.1 0-14 9.6-25.3 21.5-25.3s21.5 11.4 21.5 25.3c0 8.5-3.6 16.4-9.6 21.1-.5.7-.9 1.4-1.1 2.1.8.3 2.2.7 4.6 1.3 3 .7 6.6 1.3 8.4 1.5 5.3.5 12.1 3.8 14.9 9.4l3.9 7.9c1.5 3 1.5 6.8 0 9.1-1.6 2.9-4.4 4.6-7.2 4.6zm-35.4-78.2c-9.7 0-17.5 9.6-17.5 21.3 0 7.4 3.1 14.1 8.2 18.1.1.1.3.2.4.4 1.4 1.8 2.2 3.8 2.2 5.9 0 .6-.2 1.2-.7 1.6-.4.3-1.4 1.2-7.2 2.6-2.7.6-6.8 1.4-9.1 1.6-4.1.4-9.6 3.2-11.6 7.3l-3.9 8.2c-.8 1.7-.9 3.7-.2 4.8.8 1.3 2.3 2.6 4 2.6h70.9c1.7 0 3.2-1.3 4-2.6.6-1 .7-3.4-.2-5.2l-3.9-7.9c-2-4-7.5-6.8-11.6-7.2-2-.2-5.8-.8-9-1.6-5.8-1.4-6.8-2.3-7.2-2.5-.4-.4-.7-1-.7-1.6 0-2.1.8-4.1 2.2-5.9.1-.1.2-.3.4-.4 5.1-3.9 8.2-10.7 8.2-18-.2-11.9-8-21.5-17.7-21.5z" /></svg>
                  <input
                    id="username"
                    style={{
                      padding: '0.75rem 1rem',
                      paddingLeft: '2.6rem',
                      borderRadius: '25px',
                      border: '1px solid #cccccc',
                      marginRight: '1rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.2s',
                      backgroundColor: '#f5f5f5',
                      width: '100%',
                      color: '#111111',
                    }}
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setFormData(prevFormData => ({
                        ...prevFormData,
                        username: e.target.value,
                      }));
                    }
                    }
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.boxShadow = '0 0 0 2px #34d399'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
                {usernameError && <small style={{ display: 'block', color: '#ef4444', marginTop: '0.25rem', paddingLeft: '1rem', fontWeight: '500' }}>{usernameError}</small>}
              </div>

              {/* Password Input */}
              <div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', maxWidth: '28rem', margin: '0 auto' }}>
                  <svg style={{ position: 'absolute', left: '1rem', width: '1.25rem', height: '1.25rem', color: '#6b7280' }} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="currentColor"><path d="M110.242 30.142a1.748 1.748 0 0 0-1.232-1.487 403.606 403.606 0 0 1-44.289-16.1 1.752 1.752 0 0 0-1.442 0 403.606 403.606 0 0 1-44.289 16.1 1.748 1.748 0 0 0-1.232 1.487 113.456 113.456 0 0 0 2.912 35.942c6.257 25.128 21.05 42.221 42.779 49.431a1.75 1.75 0 0 0 1.1 0c21.729-7.21 36.522-24.3 42.779-49.431a113.456 113.456 0 0 0 2.914-35.942zm-6.309 35.1C97.949 89.271 84.515 105 64 112.007c-20.487-6.994-33.912-22.694-39.909-46.672a113.51 113.51 0 0 1-2.949-33.676A416.349 416.349 0 0 0 64 16.061a416.188 416.188 0 0 0 42.858 15.6 113.25 113.25 0 0 1-2.925 33.577z" /><path d="M101.339 34.655c-17.394-5.5-30.432-10.756-36.655-13.4a1.747 1.747 0 0 0-1.368 0c-6.223 2.641-19.261 7.9-36.655 13.4a1.752 1.752 0 0 0-1.222 1.632 107.971 107.971 0 0 0 3.1 28.292c5.43 21.36 17.149 35.631 34.832 42.415a1.753 1.753 0 0 0 1.254 0c17.683-6.784 29.4-21.055 34.832-42.414a107.986 107.986 0 0 0 3.1-28.293 1.752 1.752 0 0 0-1.218-1.632zm-5.273 29.063C91 83.655 80.211 97.03 64 103.481 47.789 97.03 37 83.655 31.934 63.717A105.7 105.7 0 0 1 28.92 37.61C45.245 32.4 57.633 27.451 64 24.77c6.367 2.681 18.755 7.627 35.08 12.84a105.72 105.72 0 0 1-3.014 26.108z" /><path d="M76.515 51.153V46.6a12.515 12.515 0 1 0-25.03 0v4.555a8.29 8.29 0 0 0-6.3 8.034V76.74a8.291 8.291 0 0 0 8.282 8.282h21.07a8.291 8.291 0 0 0 8.282-8.282V59.187a8.29 8.29 0 0 0-6.304-8.034zM64 37.583a9.025 9.025 0 0 1 9.015 9.017v4.3h-18.03v-4.3A9.025 9.025 0 0 1 64 37.583zM79.319 76.74a4.788 4.788 0 0 1-4.782 4.782H53.463a4.788 4.788 0 0 1-4.782-4.782V59.187a4.789 4.789 0 0 1 4.782-4.787h21.074a4.789 4.789 0 0 1 4.782 4.783z" /><path d="M68.129 60.861a6.191 6.191 0 0 0-10.293 4.026 6.144 6.144 0 0 0 2.079 5.237.464.464 0 0 1 .174.307v3.008a3.911 3.911 0 1 0 7.822 0v-2.98a.512.512 0 0 1 .184-.346 6.188 6.188 0 0 0 .034-9.252zm-2.351 6.629a3.982 3.982 0 0 0-1.367 2.969v2.98a.411.411 0 1 1-.822 0v-3.008a3.926 3.926 0 0 0-1.364-2.937 2.675 2.675 0 0 1-.9-2.283 2.715 2.715 0 0 1 2.364-2.41 2.768 2.768 0 0 1 .311-.018 2.662 2.662 0 0 1 1.794.686 2.688 2.688 0 0 1-.016 4.021z" /></svg>
                  <input
                    id="password"
                    style={{
                      padding: '0.75rem 1rem',
                      paddingLeft: '2.6rem',
                      borderRadius: '25px',
                      border: '1px solid #cccccc',
                      marginRight: '1rem',
                      color: '#111111',
                      fontSize: '1rem',
                      transition: 'border-color 0.2s',
                      backgroundColor: '#f5f5f5',
                      width: '100%',
                    }}
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setFormData(prevFormData => ({
                        ...prevFormData,
                        password: e.target.value,
                      }));
                    }
                    }
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.boxShadow = '0 0 0 2px #34d399'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
                {passwordError && <small style={{ display: 'block', color: '#ef4444', marginTop: '0.25rem', paddingLeft: '1rem', fontWeight: '500' }}>{passwordError}</small>}
              </div>

              <div
                onClick={() => {
                  window.location.href = '../recover';
                }}
                style={{ fontSize: '0.875rem', textAlign: 'center', color: '#2563eb', cursor: 'pointer', fontWeight: '500', transition: 'color 150ms' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#1e40af'}
                onMouseOut={(e) => e.currentTarget.style.color = '#2563eb'}
              >
                Forgot Password?
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                height: '3rem',
                backgroundColor: '#059669', // bg-green-600
                color: 'white',
                fontWeight: '700',
                fontSize: '1.125rem',
                borderRadius: '9999px', // rounded-full
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)', // shadow-lg
                transition: 'background-color 200ms, transform 200ms',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#047857'; e.currentTarget.style.transform = 'scale(1.01)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#059669'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Log-in
            </button>

            {/* OR Separator */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flexGrow: 1, borderTop: '1px solid #d1d5db' }}></div>
              <span style={{ flexShrink: 0, margin: '0 1rem', color: '#6b7280', fontWeight: '500' }}>or</span>
              <div style={{ flexGrow: 1, borderTop: '1px solid #d1d5db' }}></div>
            </div>

            {/* Social Login Icons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              {/* Google */}
              <div
                style={{ width: '2.5rem', height: '2.5rem', padding: '0.25rem', borderRadius: '9999px', cursor: 'pointer', transition: 'transform 200ms' }}
                onClick={() => {
                  setIsAlertOpen(true); setAlertMessage("Microsoft Login (Simulated)")
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
              </div>
              {/* Apple */}
              <div
                style={{ width: '2.5rem', height: '2.5rem', padding: '0.25rem', borderRadius: '9999px', cursor: 'pointer', transition: 'transform 200ms' }}
                onClick={() => {
                  setIsAlertOpen(true); setAlertMessage("Microsoft Login (Simulated)")
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                  <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                </svg>
              </div>
              {/* Microsoft */}
              <div
                style={{ width: '2.5rem', height: '2.5rem', padding: '0.25rem', borderRadius: '9999px', cursor: 'pointer', transition: 'transform 200ms' }}
                onClick={() => {
                  setIsAlertOpen(true); setAlertMessage("Microsoft Login (Simulated)")
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#ff5722" d="M6 6H22V22H6z"></path><path fill="#4caf50" d="M26 6H42V22H26z"></path><path fill="#ffc107" d="M26 26H42V42H26z"></path><path fill="#03a9f4" d="M6 26H22V42H6z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer isLoggedIn={false} />
      <ChatAI />
      <CustomAlert message={alertMessage} isOpen={isAlertOpen} onClose={closeAlert} />

    </div>
  );
};

export default App;
