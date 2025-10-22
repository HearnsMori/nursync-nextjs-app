"use client";
import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import "./globals.css";

//components
import Header from "../components/AppHeader";
import TypingAnimation from "../components/TypingAnimation";
import ScrollHint from "../components/ScrollHint";

export default function Home() {
  const toggleChat = () => {
    const chatBox = document.getElementById('chatBox');
    if (chatBox) {
      chatBox.style.display = chatBox.style.display === 'none' || chatBox.style.display === '' ? 'flex' : 'none';
    }
  };
  return (
    <div
      className="screen">
      <Header isLoggedIn={false} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'nowrap',
          width: '100vw',
          marginTop: '-10vw',
        }}>
        <div
          style={{
            position: 'absolute',
            top: '11vw',
            left: '43vw',
            zIndex: 3,
            fontSize: '2.3vw',
            fontWeight: '600',
            opacity: 0.9,
          }}
        >
          WELCOME TO
        </div>
        <div
          style={{
            position: 'absolute',
            top: '26vw',
            left: '33vw',
            zIndex: 3,
            fontSize: '3.1vw',
            fontWeight: '700',
          }}
        >
          <TypingAnimation words={['Seek Your Nursing Capability']} />
          <ScrollHint
            text="Discover more content below"
            hideThreshold={300} // Hide hint after scrolling 300px
          />
        </div>
        <Image
          src="/welcometo.png"
          alt="Welcome Image"
          width={600}
          height={400}
          style={{
            width: '100vw',
            height: 'auto',
          }}
        />
      </div>
      <div
        style={{
          marginTop: '-26vw',
          paddingTop: '28vw',
          backgroundImage: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
          fontSize: '2vw',
          fontWeight: '500',
          textAlign: 'center',
          height: 'auto',
          width: '100vw',
          zIndex: 2,
        }}>
        <div
          className="flexC"
          style={{
            background: 'blue',
            width: '100vw',
          }}>
          <div className="flexR"
            style={{
              background: 'red',
              width: '100vw',
              height: '38vw',
            }}>
            <div>

            </div>
            <div>

            </div>
          </div>
          <div
            style={{
              background: 'green',
              width: '100vw',
              height: '8vw',
            }}>

          </div>
        </div>
      </div>


    </div>
  );
}
