"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, ChevronDown, ListFilter, LayoutGrid, CreditCard, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { patients, Patient } from './data/patients';

export default function PatientCaseCard() {
  const router = useRouter();
  const [currentPatient, setCurrentPatient] = useState<Patient>(patients[0]);

  const handleRandomCase = () => {
    const remaining = patients.filter(p => p.id !== currentPatient.id);
    const random = remaining[Math.floor(Math.random() * remaining.length)];
    if (random) setCurrentPatient(random);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      paddingTop: '10px',
      justifyContent: 'center',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '20px',
      background: '#e2e8f0', // Placeholder background for your image container
      fontFamily: 'sans-serif'
    },
    card: {
      width: '100%',
      maxWidth: '900px',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      backgroundColor: '#fff'
    },
    header: {
      backgroundColor: '#065f46',
      color: '#fff',
      padding: '20px'
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      gap: '10px'
    },
    searchContainer: {
      flex: 1,
      position: 'relative' as const,
    },
    input: {
      width: '100%',
      background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '20px',
      padding: '8px 15px 8px 35px',
      color: 'white',
      outline: 'none'
    },
    patientInfoGrid: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr 1fr',
      gap: '20px',
      fontSize: '0.85rem'
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: '#fca5a5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    contentArea: {
      padding: '30px',
      backgroundColor: '#fff'
    },
    caseBox: {
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      padding: '20px',
      lineHeight: '1.6',
      color: '#374151'
    },
    footer: {
      padding: '20px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '15px'
    },
    button: {
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      color: 'white',
      fontSize: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        {/* Top Header Section */}
        <div style={styles.header}>
          <div style={styles.toolbar}>
            <div style={styles.searchContainer}>
              <Search size={16} style={{position: 'absolute', left: 12, top: 10}} />
              <input type="text" style={styles.input} placeholder="Search..." />
            </div>
            <div style={{display: 'flex', gap: '8px'}}>
              <IconButton icon={<Star size={16} />} />
              <IconButton icon={<ChevronDown size={16} />} />
              <IconButton icon={<ListFilter size={14} />} label="Sort" />
              <IconButton icon={<LayoutGrid size={14} />} label="Category" />
              <IconButton icon={<CreditCard size={14} />} label="CC" />
              <button style={{background: 'rgba(255,255,255,0.1)', border: '1px solid white', borderRadius: '8px', padding: '0 10px', fontSize: '0.7rem', color: 'white'}}>Hide Locked</button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPatient.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.patientInfoGrid}
            >
              <div style={styles.avatar}>
                {/* User icon placeholder */}
                <svg width="60" height="60" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <div>
                <p><strong>Name:</strong> {currentPatient.name}</p>
                <p><strong>Age:</strong> {currentPatient.age} years old</p>
                <p><strong>Occupation:</strong> {currentPatient.occupation}</p>
                <p style={{marginTop: '10px'}}><strong>Pre-existing:</strong> {currentPatient.conditions}</p>
              </div>
              <div>
                <p><strong>Civil status:</strong> {currentPatient.civilStatus}</p>
                <p><strong>Allergies:</strong> {currentPatient.allergies.join(', ')}</p>
                <p style={{marginTop: '10px'}}><strong>Medications:</strong> {currentPatient.medications}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Case Description Section */}
        <div style={styles.contentArea}>
          <motion.div 
            key={currentPatient.id + "-desc"}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            style={styles.caseBox}
          >
            {currentPatient.caseDescription}
          </motion.div>
        </div>

        {/* Footer Navigation */}
        <div style={styles.footer}>
          <button 
            onClick={() => router.push('./simulation/patient')}
            style={{...styles.button, backgroundColor: '#3d854d'}}
          >
            BACK
          </button>
          <button 
            onClick={handleRandomCase}
            style={{...styles.button, backgroundColor: '#3d854d'}}
          >
            RANDOM CASE
          </button>
          <button 
            onClick={() => router.push(`./${currentPatient.id}`)}
            style={{...styles.button, backgroundColor: '#3d854d'}}
          >
            START
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function IconButton({ icon, label }: { icon: React.ReactNode, label?: string }) {
  return (
    <button style={{
      background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '8px',
      padding: '5px 10px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '0.75rem'
    }}>
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}