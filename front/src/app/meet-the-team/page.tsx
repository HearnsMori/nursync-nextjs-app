"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Suspense } from 'react';
//components
import Header from "@/components/AppHeader";
import Footer from "@/components/AppFooter";
import LoadingPage from "@/components/LoadingPage";
import Learn from "@/components/Learn";
import Flyout from "@/components/Flyout";
import ChatAI from "@/components/ChatAI";
import { User, UsersRound } from "lucide-react";
import "../globals.css";

export default function MainHome() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Home />
        </Suspense>
    )
}

function Home() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const searchParams = useSearchParams();
    const idRaw = searchParams.get('id'); // Get query string 'id'
    const idAsInteger = idRaw ? parseInt(idRaw, 10) : -1;

    useEffect(() => {
        // run on client only; check token in localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        if (token && token.trim() !== '') {
            setAuthorized(true);
        } else {
            // redirect to /login if no token
            setTimeout(() => {
                localStorage.clear();
                router.replace('/login');
                setAuthorized(false);
            }, 370);
        }
    }, [router]);

    // while we determine auth, render nothing (or show a loader)
    if (authorized === null) {
        return (
            <LoadingPage />
        );
    }

    const changeId = (newId: Number) => {
        // Create new search params based on current ones
        const params = new URLSearchParams(searchParams);
        params.set('id', newId.toString());

        // Update the URL without refreshing page
        router.push(`/meet-the-team?${params.toString()}`);
    };

    // authorized === true -> show page
    return (
        <div className='screenWithFlyout'>
            <Suspense fallback={<div>Loading...</div>}>

                <Header isLoggedIn={true} />
                <div style={{
                    marginTop: '4vw',
                }}>
                    <div style={{
                        display: "flex",
                        flexFlow: "row nowrap",
                    }}>
                        <div style={{
                            width: '73px', // or use '15.625rem'
                            minWidth: '73px', // Add minWidth to prevent shrinking
                        }}>
                            <Flyout />
                        </div>
                        <div style={{ flex: 1, width: '100%', minHeight: '100vh' }}>
                            {/*Main Content Here*/}

                            {idAsInteger === -1 && (
                                <section style={{
                                    padding: '30px 10px',
                                    backgroundColor: '#fff',
                                    fontFamily: 'sans-serif',
                                    textAlign: 'center',
                                }}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <p style={{ color: '#2e7d32', fontSize: '14px', fontWeight: 'bold', margin: 0 }}>WHO MADE IT?</p>
                                        <h1 style={{
                                            color: '#2e7d32',
                                            fontSize: '48px',
                                            fontWeight: 'normal',
                                            margin: '10px 0',
                                            textTransform: 'uppercase'
                                        }}>
                                            Meet the Team
                                        </h1>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '20px',
                                        flexWrap: 'wrap',
                                        maxWidth: '1200px',
                                        margin: '0 auto'
                                    }}>
                                        {[
                                            { name: 'SOLIVIO, Kaye', role: 'Lead Visual Designer, Associate UI Specialist & Researcher' },
                                            { name: 'TAMAYO, Mary Chelsea', role: 'Co-Founder, Director of Relations & Researcher' },
                                            { name: 'VARGAS, Sandara Mae', role: 'Founder, Head of Product Systems & Lead Researcher' },
                                            { name: 'MORI, Hearns', role: 'Platform UX Engineer & Lead Developer' },
                                        ].map((member, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                onClick={(e) => { changeId(index) }}
                                                style={{
                                                    width: '173px',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    borderRadius: '4px',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                }}
                                            >
                                                {/* Image Container */}
                                                <div style={{
                                                    width: '100%',
                                                    height: '280px',
                                                    backgroundColor: '#1e3a8a', // Blue background as requested
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <User size={64} color="rgba(255,255,255,0.3)" />
                                                </div>

                                                {/* Overlay Text Content */}
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    padding: '15px',
                                                    background: 'linear-gradient(transparent, rgba(21, 67, 34, 0.95))',
                                                    color: 'white',
                                                    textAlign: 'center'
                                                }}>
                                                    <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                                                        {member.name}
                                                    </h3>
                                                    <p style={{ margin: 0, fontSize: '11px', lineHeight: '1.4', opacity: 0.9 }}>
                                                        {member.role}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}
                            {
                                idAsInteger !== -1 && (
                                    <MeetTheTeam />
                                )
                            }
                        </div>
                    </div>
                </div>

                <Footer isLoggedIn={true} />
                <ChatAI />
            </Suspense>
        </div>
    );
}

import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

const TEAM_DATA = [
    {
        name: "Kaye C. Solivio",
        role: "Lead Visual Designer, Associate UI Specialist & Researcher",
        bio: "She is part of the creative lead responsible for the project's visual identity, specializing in high-fidelity aesthetic design and intuitive user interfaces. Working in close collaboration with the leadership team, she translates complex requirements into polished, engaging visuals.",
        color: "#166534"
    },
    {
        name: "Mary Chelsea Tamayo",
        role: "Co-Founder, Director of Relations & Researcher",
        bio: "Focuses on strategic partnerships and community engagement to ensure the project reaches its target audience effectively.",
        color: "#166534"
    },
    {
        name: "Sandara Mae Vargas",
        role: "Founder, Head of Product Systems & Lead Researcher",
        bio: "Oversees the entire product architecture and research methodology to maintain high standards of system integrity.",
        color: "#166534"
    },
    {
        name: "Hearns Mori",
        role: "Platform UX Engineer & Lead Developer",
        bio: "Bridge the gap between design and technical implementation, ensuring a seamless user experience across all platforms.",
        color: "#166534"
    }
];

function MeetTheTeam() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get ID from URL or default to 0
    const currentId = parseInt(searchParams.get('id') || '0');

    const updateId = (newId: number) => {
        const id = ((newId % 4) + 4) % 4; // Ensures wrapping between 0-3
        router.push(`?id=${id}`, { scroll: false });
    };

    const currentMember = TEAM_DATA[currentId];

    return (
        <div style={{
            fontFamily: 'sans-serif',
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px 10px',
            position: 'relative',
            color: '#333'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '11px', color: '#166534', letterSpacing: '1px' }}>MEET THE TEAM</span>
                <Users size={15} color="#166534" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '40px', minHeight: '137px' }}>

                {/* Navigation Left */}
                <button
                    onClick={() => updateId(currentId - 1)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}
                >
                    <ChevronLeft size={32} color="#166534" />
                </button>

                {/* Main Content Area */}
                <div style={{ flex: 1, display: 'flex', gap: '40px', alignItems: 'center' }}>

                    {/* Main Image Container */}
                    <motion.div
                        key={`img-${currentId}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                            width: '137px',
                            height: '200px',
                            backgroundColor: '#3b82f6',
                            borderRadius: '8px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}
                    >
                        Photo {currentId + 1}
                    </motion.div>

                    {/* Text Content */}
                    <div style={{ flex: 1 }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h1 style={{ fontSize: '37px', margin: '0 0 8px 0', color: '#166534' }}>
                                    {currentMember.name}
                                </h1>
                                <h3 style={{ fontSize: '9px', fontWeight: '400', margin: '0 0 24px 0', color: '#4ade80' }}>
                                    {currentMember.role}
                                </h3>
                                <p style={{ lineHeight: '1.6', fontSize: '11px', color: '#4b5563', maxWidth: '500px' }}>
                                    {currentMember.bio}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Right */}
                <button
                    onClick={() => updateId(currentId + 1)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}
                >
                    <ChevronRight size={32} color="#166534" />
                </button>
            </div>

            {/* Thumbnails Footer */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '60px',
                borderTop: '1px solid #eee',
                paddingTop: '30px'
            }}>
                {TEAM_DATA.map((member, index) => (
                    <div
                        key={index}
                        onClick={() => updateId(index)}
                        style={{
                            textAlign: 'center',
                            cursor: 'pointer',
                            opacity: currentId === index ? 1 : 0.6,
                            transition: 'opacity 0.2s',
                            width: '120px'
                        }}
                    >
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#3b82f6',
                            margin: '0 auto 12px',
                            border: currentId === index ? '3px solid #166534' : 'none'
                        }} />
                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#166534' }}>{member.name}</div>
                        <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>{member.role.split(',')[0]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}