"use client";

import React, { useState } from 'react';
import { ChevronDown, Menu, BookOpen, FileText, ClipboardCheck, X, Activity, Stethoscope, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface TopicData {
  id: string;
  category: string;
  title: string;
  definition: string;
  classifications: Record<string, string[]>;
  trivia: string;
  image: string;
}

const TOPICS: TopicData[] = [
  // ---------------- RESPIRATORY ----------------
  {
    id: "asthma",
    category: "RESPIRATORY SYSTEM",
    title: "Asthma",
    definition: "A chronic inflammatory airway disease characterized by bronchoconstriction, mucus production, and reversible airflow obstruction.",
    classifications: {
      severity: [
        "Intermittent",
        "Mild Persistent",
        "Moderate Persistent",
        "Severe Persistent"
      ]
    },
    trivia: "Asthma attacks can be triggered by allergens, cold air, exercise, or stress.",
    image: "https://img.freepik.com/free-vector/lungs-anatomy-diagram_1308-103348.jpg"
  },
  {
    id: "copd",
    category: "RESPIRATORY SYSTEM",
    title: "Chronic Obstructive Pulmonary Disease (COPD)",
    definition: "A progressive lung disease characterized by airflow limitation that is not fully reversible.",
    classifications: {
      types: [
        "Chronic Bronchitis",
        "Emphysema"
      ]
    },
    trivia: "Smoking is the leading cause of COPD.",
    image: "https://img.freepik.com/free-vector/lung-disease-diagram_1308-103348.jpg"
  },

  // ---------------- CARDIOVASCULAR ----------------
  {
    id: "myocardial-infarction",
    category: "CARDIOVASCULAR SYSTEM",
    title: "Myocardial Infarction",
    definition: "Occurs when blood flow to a part of the heart is blocked, causing damage to heart muscle.",
    classifications: {
      types: [
        "STEMI",
        "NSTEMI"
      ]
    },
    trivia: "Time is muscle—early treatment saves heart tissue.",
    image: "https://img.freepik.com/free-vector/heart-attack-diagram_1308-103093.jpg"
  },
  {
    id: "heart-failure",
    category: "CARDIOVASCULAR SYSTEM",
    title: "Heart Failure",
    definition: "A condition where the heart cannot pump enough blood to meet the body's needs.",
    classifications: {
      types: [
        "Left-sided",
        "Right-sided",
        "Congestive Heart Failure"
      ]
    },
    trivia: "Fluid overload is a hallmark sign of heart failure.",
    image: "https://img.freepik.com/free-vector/heart-diagram_1308-103093.jpg"
  },

  // ---------------- NEUROLOGICAL ----------------
  {
    id: "stroke",
    category: "NEUROLOGICAL SYSTEM",
    title: "Stroke (CVA)",
    definition: "A sudden interruption of blood supply to the brain causing neurological deficits.",
    classifications: {
      types: [
        "Ischemic Stroke",
        "Hemorrhagic Stroke",
        "Transient Ischemic Attack (TIA)"
      ]
    },
    trivia: "FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency.",
    image: "https://img.freepik.com/free-vector/brain-stroke-diagram_1308-103348.jpg"
  },
  {
    id: "epilepsy",
    category: "NEUROLOGICAL SYSTEM",
    title: "Epilepsy",
    definition: "A neurological disorder characterized by recurrent seizures.",
    classifications: {
      types: [
        "Focal Seizures",
        "Generalized Seizures"
      ]
    },
    trivia: "Not all seizures involve convulsions.",
    image: "https://img.freepik.com/free-vector/brain-diagram_1308-103348.jpg"
  },

  // ---------------- GASTROINTESTINAL ----------------
  {
    id: "peptic-ulcer",
    category: "GASTROINTESTINAL SYSTEM",
    title: "Peptic Ulcer Disease",
    definition: "Open sores that develop on the lining of the stomach or duodenum.",
    classifications: {
      types: [
        "Gastric Ulcer",
        "Duodenal Ulcer"
      ]
    },
    trivia: "Often caused by H. pylori infection or NSAID use.",
    image: "https://img.freepik.com/free-vector/stomach-diagram_1308-103348.jpg"
  },
  {
    id: "hepatitis",
    category: "GASTROINTESTINAL SYSTEM",
    title: "Hepatitis",
    definition: "Inflammation of the liver commonly caused by viral infections.",
    classifications: {
      types: [
        "Hepatitis A",
        "Hepatitis B",
        "Hepatitis C"
      ]
    },
    trivia: "Vaccines are available for Hepatitis A and B.",
    image: "https://img.freepik.com/free-vector/liver-diagram_1308-103348.jpg"
  },

  // ---------------- RENAL ----------------
  {
    id: "ckd",
    category: "RENAL SYSTEM",
    title: "Chronic Kidney Disease",
    definition: "Progressive loss of kidney function over time.",
    classifications: {
      stages: [
        "Stage 1 (Normal)",
        "Stage 2 (Mild)",
        "Stage 3 (Moderate)",
        "Stage 4 (Severe)",
        "Stage 5 (End-stage renal disease)"
      ]
    },
    trivia: "Dialysis is needed in advanced stages.",
    image: "https://img.freepik.com/free-vector/kidney-diagram_1308-103348.jpg"
  },

  // ---------------- ENDOCRINE ----------------
  {
    id: "diabetes",
    category: "ENDOCRINE SYSTEM",
    title: "Diabetes Mellitus",
    definition: "A metabolic disorder characterized by high blood glucose levels.",
    classifications: {
      types: [
        "Type 1 Diabetes",
        "Type 2 Diabetes",
        "Gestational Diabetes"
      ]
    },
    trivia: "Type 2 diabetes is strongly linked to lifestyle factors.",
    image: "https://img.freepik.com/free-vector/pancreas-diagram_1308-103348.jpg"
  },
  {
    id: "hyperthyroidism",
    category: "ENDOCRINE SYSTEM",
    title: "Hyperthyroidism",
    definition: "Overproduction of thyroid hormones leading to increased metabolism.",
    classifications: {
      causes: [
        "Graves’ Disease",
        "Thyroid Nodules"
      ]
    },
    trivia: "Common symptoms include weight loss and palpitations.",
    image: "https://img.freepik.com/free-vector/thyroid-diagram_1308-103348.jpg"
  },

  // ---------------- MUSCULOSKELETAL ----------------
  {
    id: "fracture",
    category: "MUSCULOSKELETAL SYSTEM",
    title: "Bone Fracture",
    definition: "A break in the continuity of a bone.",
    classifications: {
      types: [
        "Closed Fracture",
        "Open Fracture",
        "Comminuted Fracture",
        "Greenstick Fracture"
      ]
    },
    trivia: "Children commonly get greenstick fractures due to softer bones.",
    image: "https://img.freepik.com/free-vector/bone-fracture-diagram_1308-103348.jpg"
  },

  // ---------------- MATERNAL ----------------
  {
    id: "preeclampsia",
    category: "MATERNAL AND CHILD HEALTH",
    title: "Preeclampsia",
    definition: "A pregnancy complication characterized by high blood pressure and organ damage.",
    classifications: {
      severity: [
        "Mild",
        "Severe"
      ]
    },
    trivia: "Can progress to eclampsia (seizures).",
    image: "https://img.freepik.com/free-vector/pregnancy-diagram_1308-103348.jpg"
  },

  // ---------------- PEDIATRIC ----------------
  {
    id: "measles",
    category: "PEDIATRIC NURSING",
    title: "Measles",
    definition: "A highly contagious viral disease characterized by rash and fever.",
    classifications: {
      stages: [
        "Prodromal Stage",
        "Rash Stage"
      ]
    },
    trivia: "Preventable by MMR vaccine.",
    image: "https://img.freepik.com/free-vector/virus-diagram_1308-103348.jpg"
  },

  // ---------------- MENTAL HEALTH ----------------
  {
    id: "depression",
    category: "MENTAL HEALTH",
    title: "Major Depressive Disorder",
    definition: "A mood disorder causing persistent sadness and loss of interest.",
    classifications: {
      types: [
        "Mild",
        "Moderate",
        "Severe"
      ]
    },
    trivia: "Affects both emotional and physical health.",
    image: "https://img.freepik.com/free-vector/mental-health-diagram_1308-103348.jpg"
  },
  {
    id: "schizophrenia",
    category: "MENTAL HEALTH",
    title: "Schizophrenia",
    definition: "A chronic brain disorder characterized by distorted thinking and perception.",
    classifications: {
      symptoms: [
        "Positive Symptoms",
        "Negative Symptoms",
        "Cognitive Symptoms"
      ]
    },
    trivia: "Hallucinations are a common symptom.",
    image: "https://img.freepik.com/free-vector/brain-diagram_1308-103348.jpg"
  }
];

export default function MedicalApp() {
  const [view, setView] = useState<'menu' | 'lesson'>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentTopic = TOPICS[currentIndex];

  // --- Inline Styles ---
  const styles = {
    screen: {
      fontFamily: 'Inter, system-ui, sans-serif',
      backgroundColor: '#f8faf8',
      minHeight: '100vh',
      color: '#333',
      width: '100%',
    },
    menuContainer: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '80px 20px',
    },
    menuGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      marginTop: '40px',
    },
    topicCard: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      border: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '15px',
      transition: 'transform 0.2s ease',
    },
    lessonContainer: {
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      padding: '40px 60px',
    },
    accentBar: {
      width: '6px',
      height: '50px',
      backgroundColor: '#1b5e20',
      borderRadius: '4px',
    },
    actionBtn: (color = '#1b5e20') => ({
      backgroundColor: color,
      color: 'white',
      border: 'none',
      borderRadius: '30px',
      padding: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
    }),
    fab: {
      position: 'fixed' as const,
      bottom: '90px',
      right: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#1b5e20',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 10px 25px rgba(27, 94, 32, 0.3)',
      zIndex: 100,
    }
  };

  // --- Components ---

  const TopicSelection = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      style={styles.menuContainer}
    >
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#1a3a1c' }}>Medical Library</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>Select a topic to begin your lesson</p>
      </div>

      <div style={styles.menuGrid}>
        {TOPICS.map((topic, index) => (
          <motion.div
            key={topic.id}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
            onClick={() => {
              setCurrentIndex(index);
              setView('lesson');
            }}
            style={styles.topicCard}
          >
            <div style={{ backgroundColor: '#e8f5e9', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Stethoscope color="#2e7d32" />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#2e7d32', fontWeight: '700', letterSpacing: '0.5px' }}>{topic.category}</span>
              <h3 style={{ fontSize: '22px', margin: '5px 0' }}>{topic.title}</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.4' }}>{topic.definition.substring(0, 80)}...</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const LessonView = () => (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      style={styles.lessonContainer}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <nav style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>
          LESSON / {currentTopic.category} / <span style={{ color: '#1b5e20', fontWeight: 'bold' }}>{currentTopic.title}</span>
        </nav>
        <button 
          onClick={() => setView('menu')}
          style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: '#666', fontWeight: '600' }}
        >
          <ArrowLeft size={16} /> Back to Menu
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
        <div style={styles.accentBar} />
        <h1 style={{ fontSize: '48px', fontWeight: '800', margin: 0 }}>{currentTopic.title}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '60px' }}>
        <section>
          <h3 style={{ color: '#2e7d32', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>Definition <ChevronDown size={18} /></h3>
          <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#444' }}>{currentTopic.definition}</p>

          <h3 style={{ color: '#2e7d32', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', marginTop: '40px' }}>Classification <ChevronDown size={18} /></h3>
          {Object.entries(currentTopic.classifications).map(([key, items]) => (
            <div key={key} style={{ marginTop: '20px' }}>
              <strong style={{ textTransform: 'capitalize', fontSize: '15px' }}>According to {key}</strong>
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                {items.map((item, i) => <li key={i} style={{ marginBottom: '10px', color: '#444' }}>{item}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <aside>
          <div style={{ border: '2px solid #9c27b0', borderRadius: '16px', padding: '20px' }}>
            <img src={currentTopic.image} alt="Diagram" style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button style={styles.actionBtn()}>Generate Quiz</button>
              <button style={styles.actionBtn()}>Generate Flashcards</button>
              <button style={styles.actionBtn('#004d40')}>Access E-library</button>
            </div>
          </div>
        </aside>
      </div>

      <div style={{ backgroundColor: '#e8f5e9', borderRadius: '16px', padding: '24px', marginTop: '50px' }}>
        <span style={{ color: '#2e7d32', fontWeight: '800', fontStyle: 'italic', display: 'block', marginBottom: '10px' }}>Did You Know?</span>
        <p style={{ margin: 0, lineHeight: '1.6' }}>{currentTopic.trivia}</p>
      </div>
    </motion.div>
  );

  return (
    <div style={styles.screen}>
      <AnimatePresence mode="wait">
        {view === 'menu' ? <TopicSelection key="menu" /> : <LessonView key="lesson" />}
      </AnimatePresence>

      {/* Persistent Toggle Menu */}
      <motion.div 
        style={styles.fab} 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={28} />
      </motion.div>

      {/* Sidebar Navigation Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 101, backdropFilter: 'blur(4px)' }}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '320px', backgroundColor: '#fff', zIndex: 9999, padding: '40px 25px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Topics</h2>
                <X style={{ cursor: 'pointer' }} onClick={() => setIsSidebarOpen(false)} />
              </div>
              {TOPICS.map((t, i) => (
                <div 
                  key={t.id}
                  onClick={() => { setView('lesson'); setCurrentIndex(i); setIsSidebarOpen(false); }}
                  style={{ 
                    padding: '15px', borderRadius: '12px', cursor: 'pointer', marginBottom: '10px',
                    backgroundColor: currentIndex === i && view === 'lesson' ? '#e8f5e9' : 'transparent',
                    color: currentIndex === i && view === 'lesson' ? '#1b5e20' : '#444'
                  }}
                >
                  <div style={{ fontWeight: '700' }}>{t.title}</div>
                  <div style={{ fontSize: '11px', opacity: 0.6 }}>{t.category}</div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}