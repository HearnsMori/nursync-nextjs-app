'use client';

import React, { useState, useEffect, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Stethoscope } from 'lucide-react';

//components
import Header from "@/components/AppHeader";
import Footer from "@/components/AppFooter";
import LoadingPage from "@/components/LoadingPage";
import ChatAI from "@/components/ChatAI";
import Flyout from "@/components/Flyout";

import "../../globals.css";

// --- Types ---
interface Subject {
  id: string;
  name: string;
  code: string;
  semester: 'First' | 'Second';
}


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
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flex: 1,
            flexFlow: "row nowrap",
          }}>
            <LevelOnePage />
          </div>
        </div>
      </div>
      <Footer isLoggedIn={true} />
      <ChatAI />
    </div>
  );
}

function LevelOnePage() {
  const router = useRouter();
  const [selectedSemester, setSelectedSemester] = useState<'First' | 'Second'>('First');

  // Sample Data
  // Level 2 Constants
  const subjects: Subject[] = [
    // First Semester
    {
      id: 'l2-s1-1',
      name: 'Community Health Nursing',
      code: 'NP4',
      semester: 'First'
    },
    {
      id: 'l2-s1-2',
      name: 'Nutrition and Diet Therapy',
      code: 'NP5',
      semester: 'First'
    },
    {
      id: 'l2-s1-3',
      name: 'Pharmacology',
      code: 'NP6',
      semester: 'First'
    },
    {
      id: 'l2-s1-4',
      name: 'Care of Mother, Child, Adolescents (Well Clients)',
      code: 'NP7',
      semester: 'First'
    },

    // Second Semester
    {
      id: 'l2-s2-1',
      name: 'Care of Mother, Child at Risk or With Problems',
      code: 'NP9',
      semester: 'Second'
    },
    {
      id: 'l2-s2-2',
      name: 'Nursing Informatics',
      code: 'NP10',
      semester: 'Second'
    },
    {
      id: 'l2-s2-3',
      name: 'CHN 2',
      code: 'NP11',
      semester: 'Second'
    }
  ];

  const filteredSubjects = subjects.filter(s => s.semester === selectedSemester);

  const handleSubjectClick = (name: string) => {
    // Sluggify name: "Anatomy and Physiology" -> "anatomy-and-physiology"
    const slug = name.toLowerCase().replace(/ /g, '-');
    router.push(`./${slug}`);
  };

  // --- Styles ---
  const pageContainer: CSSProperties = {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
    backgroundColor: '#ffffff',
  };

  const sidebarStyle: CSSProperties = {
    width: '320px',
    backgroundColor: '#C9BC92',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const mainContentStyle: CSSProperties = {
    flex: 1,
    padding: '40px 60px',
    position: 'relative',
  };

  const navItemStyle = (isActive: boolean): CSSProperties => ({
    backgroundColor: isActive ? '#6B5A19' : '#D4B95E',
    color: 'white',
    padding: '30px 20px',
    borderRadius: '25px',
    fontSize: '22px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    textAlign: 'left',
    transition: 'background-color 0.2s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  });

  const subjectCardStyle: CSSProperties = {
    backgroundColor: '#D4B95E',
    borderRadius: '35px',
    padding: '25px 35px',
    marginBottom: '20px',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  };

  return (
    <div style={pageContainer}>
      {/* SIDEBAR */}
      <aside style={sidebarStyle}>
        <h1 style={{ color: '#8C7721', fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>
          Flashcards Group
        </h1>

        {/* Level Indicator Badge */}
        <div style={{ position: 'relative', marginBottom: '40px' }}>
          <div style={{
            backgroundColor: '#D4B95E',
            borderRadius: '50px',
            padding: '10px 20px 10px 60px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            marginLeft: '20px'
          }}>
            Level 2
          </div>
          <div style={{
            position: 'absolute',
            top: '-15px',
            left: '0',
            backgroundColor: '#8C7721',
            borderRadius: '50%',
            width: '70px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white'
          }}>
            <Stethoscope color="white" size={35} />
          </div>
        </div>

        {/* Semester Navigation */}
        <button
          style={navItemStyle(selectedSemester === 'First')}
          onClick={() => setSelectedSemester('First')}
        >
          First Semester
        </button>
        <button
          style={navItemStyle(selectedSemester === 'Second')}
          onClick={() => setSelectedSemester('Second')}
        >
          Second Semester
        </button>
      </aside>

      {/* RIGHT SIDE CONTENT */}
      <main style={mainContentStyle}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
          <button
            onClick={() => router.back()}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#8C7721', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
          >
            <ArrowLeft size={20} /> BACK
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSemester}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {filteredSubjects.map((subject) => (
              <motion.div
                key={subject.id}
                whileHover={{ scale: 1.01, backgroundColor: '#373737' }}
                whileTap={{ scale: 0.99 }}
                style={subjectCardStyle}
                onClick={() => handleSubjectClick(subject.name)}
              >
                <div style={{ fontSize: '24px', fontWeight: '500', marginBottom: '4px' }}>
                  {subject.name}
                </div>
                <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px', opacity: 0.9 }}>
                  {subject.code}
                </div>
                <span style={{
                  backgroundColor: '#6B5A19',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {subject.semester} Semester
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}