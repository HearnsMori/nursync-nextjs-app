"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
//components
import Header from "@/components/AppHeader";
import Footer from "@/components/AppFooter";
import LoadingPage from "@/components/LoadingPage";
import AISimulation from "@/components/AISimulation/AISimulation.tsx";
import Flyout from "@/components/Flyout";

import "../globals.css";


export default function Home() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // run on client only; check token in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token && token.trim() !== '') {
      setAuthorized(true);
    } else {
      // redirect to /login if no token
      setTimeout(() => {
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

  // authorized === true -> show page
  return (
    <div className='screenWithFlyout'>
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
          <div style={{ flex: 1, display: "flex", flexFlow: "row nowrap", }}>
            <AISimulation />
          </div>
        </div>
      </div>

      <Footer isLoggedIn={true} />
    </div>
  );
}