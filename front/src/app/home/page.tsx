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
import Learn from "@/components/Learn";

import "../globals.css";

//In-built
import { fetchData, HttpMethod } from "@/utils/fetchdata";
interface apiResponse {
  msg?: string | null;
  error?: string | null;
};
interface FormData {
  username: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // run on client only; check token in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && token.trim() !== '') {
      setAuthorized(true);
    } else {
      // redirect to /login if no token
      setTimeout(()=>{
        router.replace('/login');
        setAuthorized(false);
      }, 370);
    }
  }, [router]);

  // while we determine auth, render nothing (or show a loader)
  if (authorized === null) {
    return (
        <LoadingPage/>
    );
  }

  // authorized === true -> show page
  return (
    <>
      <Header isLoggedIn={true} />
      <div style={{
        marginTop: '4vw',
      }}>
        <Learn/>
      </div>
      
      <Footer isLoggedIn={true} />
    </>
  );
}