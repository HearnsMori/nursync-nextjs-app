"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import "../globals.css";


import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

//components 
import CustomAlert from "@/components/CustomAlert";
import ChatAI from "@/components/ChatAI";
import Footer from "@/components/AppFooter";

export default function Recover() {
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

    const closeAlert = useCallback(() => { setIsAlertOpen(false); setAlertMessage(''); }, []);
    const customAlert = useCallback((message: string) => { setAlertMessage(message); setIsAlertOpen(true); }, []);

    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");

    useEffect(() => {
        // run on client only; check token in localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        if (token && token.trim() !== '') {
            // redirect if token
            router.replace('/home');
        }
    }, [router]);
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Regular expression for a common email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === null || email.trim() === "") {
            // Check if the email is null or empty after trimming whitespace
            setEmailError("Email cannot be empty.");
            return;
        } else if (!emailRegex.test(email)) {
            // Test the email against the regular expression
            setEmailError("Invalid email format.");
            return;
        } else {
            setEmailError("");
        }

    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '113vh',
                position: 'relative',
                paddingBottom: '16vw',
            }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: 'url("/recover.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    flex: '1',
                }}
            >
                {/*Form*/}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '48vw',
                        height: '70vh',
                    }}>
                    <div
                        className='bggreen'
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '1vw',
                            height: '17vh',
                            width: '73%',
                            marginBottom: '-3vw',
                            paddingBottom: '1vw',
                            zIndex: 2,
                        }}>
                        <img src="/whitelettering.png" alt="Nursync" style={{ width: '73%', height: 'auto' }} />

                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'white',
                            flex: 1,
                            width: '100%',
                            borderRadius: '1vw',
                            paddingTop: '1vw',
                        }}>
                        <span style={{ marginBottom: '1.2vw', color: 'black', fontWeight: '600', fontSize: '2.3rem' }}>Forgot your Password</span>
                        <span style={{ marginBottom: '1.2vw', width: '37vw', textAlign: 'center', color: '#00000073', fontSize: '1.2rem', }}>Enter the email address associated with your account to reset your password.</span>
                        <input
                            id="email"
                            style={{
                                padding: '0.75rem 1rem',
                                paddingLeft: '2.6rem',
                                borderRadius: '25px',
                                border: '1px solid #cccccc',
                                marginTop: '2vw',
                                color: '#111111',
                                fontSize: '1rem',
                                transition: 'border-color 0.2s',
                                backgroundColor: '#f5f5f5',
                                width: '73%',
                            }}
                            type="email"
                            placeholder="Email"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            onFocus={(e) => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.boxShadow = '0 0 0 2px #34d399'; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                        {emailError && <small style={{ display: 'block', color: '#ef4444', marginTop: '0.25rem', paddingLeft: '1rem', fontWeight: '500' }}>{emailError}</small>}
                        <button
                            className='bggreen'
                            style={{
                                width: '73%',
                                border: 'none',
                                borderRadius: '1vw',
                                padding: '1vw 0',
                                marginTop: '2vw',
                            }}
                            onClick={handleClick}>
                            Request Reset Link
                        </button>
                    </div>

                </div>

            </div>
            <Footer isLoggedIn={false} />
            <ChatAI />
            <CustomAlert message={alertMessage} isOpen={isAlertOpen} onClose={closeAlert} />

        </div>
    )
}