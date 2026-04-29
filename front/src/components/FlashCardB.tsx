'use client';

import React, { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Stethoscope, Activity } from 'lucide-react';

// --- Interfaces ---
interface Level {
  id: number;
  title: string;
  color: string;
  subjects: string[];
  isActive?: boolean;
}

export default function FlashcardsPage() {
  const router = useRouter();

  const levels: Level[] = [
    {
      id: 1,
      title: 'LEVEL 1',
      color: '#5b9271',
      subjects: ['Biochemistry', 'Anatomy and Physiology', 'Theoretical Foundations in Nursing', 'Microbiology and Parasitology', 'Health Assessment', 'Fundamentals of Nursing']
    },
    {
      id: 2,
      title: 'LEVEL 2',
      color: '#a3935b',
      subjects: ['Community Health Nursing', 'Nutrition and Diet Therapy', 'Health Care Ethics (Bioethics)', 'Care of Mother, Child, Adolescents', 'Pharmacology', 'Nursing Informatics']
    },
    {
      id: 3,
      title: 'LEVEL 3',
      color: '#4a72b2',
      subjects: ['Nursing Research', 'Nursing Entrepreneurship', 'Care of Older Adult', 'Medical and Surgical Nursing', 'Psychiatric Nursing'],
    },
    {
      id: 4,
      title: 'LEVEL 4',
      color: '#9b6fb3',
      subjects: ['Nursing Competency Appraisal', 'Decent Work Employment and Transcultural Nursing and Spirituality', 'Nursing Leadership Management', 'Intensive Nursing Practicum', 'Disaster Nursing']
    }
  ];

  const handleNavigate = (id: number): void => {
    router.push(`/tools/level-${id}`);
  };

  // --- Styles Objects ---
  const containerStyle: CSSProperties = {
    padding: '50px',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '50px'
  };

  const levelGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  };

  const getCardStyle = (color: string, isActive?: boolean): CSSProperties => ({
    backgroundColor: color,
    borderRadius: '25px',
    padding: '25px',
    paddingTop: '45px',
    color: 'white',
    position: 'relative',
    minHeight: '340px',
    cursor: 'pointer',
    border: isActive ? '4px solid #6c3483' : 'none',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column'
  });

  const iconCircleStyle: CSSProperties = {
    position: 'absolute',
    top: '-25px',
    left: '20px',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(255,255,255,0.3)',
    backdropFilter: 'blur(4px)'
  };

  const createCardStyle: CSSProperties = {
    backgroundColor: '#8b8b8b',
    borderRadius: '25px',
    padding: '25px',
    paddingTop: '50px',
    position: 'relative',
    color: 'white',
    width: '300px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerStyle}>
        <h1 style={{ color: '#1b4d2e', margin: 0, fontSize: '38px', fontWeight: 'bold' }}>
          Flashcards Group
        </h1>
        <button 
          onClick={() => router.back()}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'none', 
            border: 'none', 
            color: '#1b4d2e', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            fontSize: '18px' 
          }}
        >
          <ArrowLeft size={24} /> BACK
        </button>
      </div>

      {/* Main Flashcard Levels */}
      <div style={levelGridStyle}>
        {levels.map((lvl) => (
          <motion.div
            key={lvl.id}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            style={getCardStyle(lvl.color, lvl.isActive)}
            onClick={() => handleNavigate(lvl.id)}
          >
            <div style={iconCircleStyle}>
              <Stethoscope color="white" size={32} />
            </div>
            <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' }}>
              {lvl.title}
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.5', opacity: 0.95 }}>
              {lvl.subjects.map((s, i) => (
                <div key={i} style={{ marginBottom: '4px' }}>{s}</div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create New / Tokens Row */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {[1, 2, 3].map((idx) => (
          <div key={idx} style={createCardStyle}>
            <div style={{ ...iconCircleStyle, backgroundColor: '#5c5c5c' }}>
              <Activity color="#a0a0a0" size={32} />
            </div>
            <div style={{ position: 'absolute', top: '20px', right: '25px', color: '#ccc', fontWeight: 'bold', fontSize: '18px' }}>
              CREATE NEW
            </div>
            
            <p style={{ marginTop: '20px', fontSize: '14px', color: '#e0e0e0', lineHeight: '1.4' }}>
              Create your own flashcards using this folder.
            </p>

            {idx > 1 && (
              <div style={{ 
                backgroundColor: '#c0c0c0', 
                borderRadius: '30px', 
                padding: '12px', 
                marginTop: '20px', 
                color: '#333', 
                textAlign: 'center' 
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>TOKENS: 10</div>
                <div style={{ fontSize: '11px' }}>
                  Not enough tokens? <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Avail here.</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}