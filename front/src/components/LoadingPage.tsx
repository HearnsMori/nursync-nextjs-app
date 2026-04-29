"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
//components
import Header from "@/components/AppHeader";
import Footer from "@/components/AppFooter";
import Flyout from "@/components/Flyout";

import "../app/globals.css";


export default function Home() {
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
          <div style={{ flex: 1, }}>
            <div style={{
                paddingBottom: '100vh',
                background: 'white',
            }}>
            </div> 
          </div>
        </div>
      </div>
      <Footer isLoggedIn={true} />
    </div>
  );
}