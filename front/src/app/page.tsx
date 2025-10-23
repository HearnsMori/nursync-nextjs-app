"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import "./globals.css";

//components
import Header from "@/components/AppHeader";
import Footer from "@/components/AppFooter";
import TypingAnimation from "@/components/TypingAnimation";
import ScrollHint from "@/components/ScrollHint";

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
            hideThreshold={237} // Hide hint after scrolling 300px
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
            width: '100vw',
          }}>
          <div className="flexR"
            style={{
              justifyContent: 'space-evenly',
              width: '95vw',
              height: '33vw',
            }}>
            <div
              className={styles.featuresBox}
              style={{
                flex: 10,
              }}>
              <div
                className={styles.featuresTitle}>
                EXPLORE OUR FEATURES
              </div>
              <ul
                className={styles.featuresUl}>
                <li
                  className={styles.featuresListText}>
                  <b>Interactive Study Tools:</b>
                  Engage with dynamic flashcards, quizzes, and simulations to reinforce learning.
                </li>
                <li
                  className={styles.featuresListText}>
                  <b>Progress Tracking: </b>
                  Monitor your academic journey with personalized dashboards and analytics.
                </li>
                <li
                  className={styles.featuresListText}>
                  <b>Curriculum-Aligned Content: </b>
                  Access materials tailored to your nursing program's requirements.
                </li>
                <li
                  className={styles.featuresListText}>
                  <b>Resource Library: </b>
                  Utilize a vast collection of lecture notes, topic reviewers, and case studies.
                </li>
              </ul>
            </div>
            <div
              className={styles.featuresBox}
              style={{
                flex: 8,
              }}>
              <div
                className={styles.featuresTitle}>
                WHY CHOOSE NURSYNC?
              </div>
              <ul
                className={styles.featuresUl}>
                <li
                  className={styles.featuresListText}>
                  <b>Empowerment: </b>
                  Develop self-efficacy and clinical decision-making skills through structured learning.
                </li>
                <li
                  className={styles.featuresListText}>
                  <b>Flexibility: </b>
                  Learn at your own pace with 24/7 access to resources.
                </li>
                <li
                  className={styles.featuresListText}>
                  <b>Community Support: </b>
                  Join a network of nursing students and professionals for collaboration and guidance.
                </li>
              </ul>
            </div>
          </div>
          <div
            className="flexC"
            style={{
              alignItems: 'top',
              justifyContent: 'left',
              width: '95vw',
              height: '8vw',
            }}>
            <div
              className="flexR"
              role="region"
              aria-label="Account actions"
              style={{
                width: '98%',
                margin: '-2vw 1vw 1vw 1vw',
                height: '11vw',
                border: '5px solid #026e2c',
                borderRadius: '1vw',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#026e2c',
                fontWeight: 600,
                padding: '0 5rem',
                gap: '1rem',
                boxSizing: 'border-box',
                flexWrap: 'wrap',
                minHeight: '7rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <span style={{ whiteSpace: 'nowrap' }}>Don't have an account yet?</span>
                <Link
                  className={styles.button}
                  href="/signup"
                  style={{
                    background: '#026e2c',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '0.6rem 1rem',
                    borderRadius: '0.6rem',
                    fontWeight: 700,
                  }}
                >
                  Sign up
                </Link>
              </div>

              <div
                aria-hidden="true"
                style={{
                  width: '1px',
                  height: '2.6rem',
                  background: '#026e2c',
                  opacity: 0.25,
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  flex: 1,
                  justifyContent: 'flex-end',
                  minWidth: 0,
                }}
              >
                <span style={{ whiteSpace: 'nowrap' }}>Already have an account?</span>
                <Link
                  className={styles.button}
                  href="/login"
                  style={{
                    border: '2px solid #026e2c',
                    color: '#026e2c',
                    textDecoration: 'none',
                    padding: '0.5rem 0.9rem',
                    borderRadius: '0.6rem',
                    fontWeight: 700,
                    background: 'transparent',
                  }}
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer isLoggedIn={false} />
        {/*Add here*/}
      </div>


    </div>
  );
}
