"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '../app/globals.css';
import styles from '../app/page.module.css';
import Link from 'next/link';

export default function Header({
    isLoggedIn,
}: { isLoggedIn: boolean }) {
    return (
        <header
        className='bggreen'
        style={{
            width: '100%',
            height: '4vw',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99,
            padding: '0 3vw',
        }}>
            <div
            style={{
                height: '100%',
                width: '10vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    src="/logo.png"
                    alt="Logo"
                    height={1000}
                    width={150}
                    style={{
                        height: '3vw',
                        width: 'auto',
                    }}
                />
            </div>
            <div
            style={{
                flex: '1',
            }}>

            </div>
            <div
            className='bggreen txtblack'
            style={{
                height: '4vw',
                width: '8vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {isLoggedIn ? (
                    <></>
                ):(
                    <Link
                    className="bgwhite txtblack button"
                    href="/signup"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '1vw',
                        height: '2.3vw',
                        width: '7vw',
                        border: 'none',
                        margin: '1vw',
                    }}>Sign-up</Link>
                )}
            </div>
            <div
            style={{
                height: '100%',
                width: '4vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>
        </header>
    );
}