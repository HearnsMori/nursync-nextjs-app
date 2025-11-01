"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
//components
import Header from "@/components/AppHeader";
import Footer from "@/components/AppFooter";

import "../globals.css";

export default function Home() {



    return (
        <>
            <Header isLoggedIn={true} />
            <div
            style={{

            }}>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
            <Footer isLoggedIn={true} />
        </>
    )
}