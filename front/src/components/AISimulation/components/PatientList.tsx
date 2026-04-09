'use client';

import React, { CSSProperties, useState, useMemo } from 'react';
import Link from 'next/link';
import { Star, ListFilter, MessageSquare, ChevronUp, ChevronDown, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { patients as INITIAL_DATA, Patient } from '../data/patients';

// ─── Types ────────────────────────────────────────────────────────────────────
type PatientType = 'male' | 'female';
type CCType = 'all' | 'pain' | 'overdose' | 'respiratory' | 'other';
type CategoryType = 'all' | PatientType;
type SortDir = 'none' | 'asc' | 'desc';

// Extend the original Patient type to include our new states
interface ExtendedPatient extends Patient {
  isFavorite?: boolean;
  isLocked?: boolean;
}

const CATEGORIES: CategoryType[] = ['all', 'male', 'female'];
const CC_OPTIONS: CCType[] = ['all', 'pain', 'overdose', 'respiratory', 'other'];
const PAGE_SIZE = 3;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cycleSortDir(current: SortDir): SortDir {
  if (current === 'none') return 'asc';
  if (current === 'asc') return 'desc';
  return 'none';
}

function cycleIndex<T>(arr: T[], current: number): number {
  return (current + 1) % arr.length;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
interface SortArrowProps {
  dir: SortDir;
}

const SortArrow: React.FC<SortArrowProps> = ({ dir }) => {
  if (dir === 'asc') return <ChevronUp size={13} />;
  if (dir === 'desc') return <ChevronDown size={13} />;
  return (
    <span style={{ fontSize: 12, lineHeight: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <ChevronUp size={10} style={{ marginBottom: -3 }} />
      <ChevronDown size={10} />
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const PatientList: React.FC = () => {
  // Initialize with extended properties
  const [patients, setPatients] = useState<ExtendedPatient[]>(() => 
    INITIAL_DATA.map(p => ({ ...p, isFavorite: false, isLocked: false }))
  );
  
  const [sortDir, setSortDir] = useState<SortDir>('none');
  const [catIndex, setCatIndex] = useState<number>(0);
  const [ccIndex, setCcIndex] = useState<number>(0);
  const [favOnly, setFavOnly] = useState<boolean>(false);
  const [hideLocked, setHideLocked] = useState<boolean>(false);
  const [pageOffset, setPageOffset] = useState<number>(0);

  // ── Derived filtered + sorted list ──────────────────────────────────────────
  const filteredPatients = useMemo<ExtendedPatient[]>(() => {
    let result = [...patients];

    if (favOnly) result = result.filter((p) => p.isFavorite);
    if (hideLocked) result = result.filter((p) => !p.isLocked);

    const selectedCategory = CATEGORIES[catIndex];
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.type === selectedCategory);
    }

    const selectedCC = CC_OPTIONS[ccIndex];
    if (selectedCC !== 'all') {
      result = result.filter((p) => p.cc === selectedCC);
    }

    if (sortDir === 'asc') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortDir === 'desc') result.sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [patients, sortDir, catIndex, ccIndex, favOnly, hideLocked]);

  const visiblePatients = filteredPatients.slice(pageOffset, pageOffset + PAGE_SIZE);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleSortClick = () => {
    setSortDir((prev) => cycleSortDir(prev));
    setPageOffset(0);
  };
  
  const handleCategoryClick = () => {
    setCatIndex((prev) => cycleIndex(CATEGORIES, prev));
    setPageOffset(0);
  };
  
  const handleCCClick = () => {
    setCcIndex((prev) => cycleIndex(CC_OPTIONS, prev));
    setPageOffset(0);
  };
  
  const handleFavToggle = () => {
    setFavOnly((prev) => !prev);
    setPageOffset(0);
  };
  
  const handleHideLocked = () => {
    setHideLocked((prev) => !prev);
    setPageOffset(0);
  };
  
  const handleScrollUp = () => {
    setPageOffset((prev) => Math.max(0, prev - PAGE_SIZE));
  };
  
  const handleScrollDown = () => {
    setPageOffset((prev) =>
      Math.min(prev + PAGE_SIZE, Math.max(0, filteredPatients.length - PAGE_SIZE))
    );
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const toggleLock = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isLocked: !p.isLocked } : p))
    );
  };

  // ── Styles ───────────────────────────────────────────────────────────────────
  const styles: Record<string, any> = {
    container: {
      padding: '20px',
      width: '650px',
      height: '33vw',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#fff',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
    } as CSSProperties,
    toolbar: {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px',
      alignItems: 'center',
      flexWrap: 'wrap',
    } as CSSProperties,
    tbBtn: (isActive: boolean): CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      padding: '7px 11px',
      borderRadius: '8px',
      border: isActive ? '1px solid #2D6A4F' : '1px solid #CBD5E0',
      backgroundColor: 'white',
      color: isActive ? '#2D6A4F' : '#333',
      fontSize: '13px',
      fontWeight: 500,
      cursor: 'pointer',
    }),
    hideBtn: {
      marginLeft: 'auto',
      padding: '7px 16px',
      borderRadius: '20px',
      border: '1px solid #2D6A4F',
      backgroundColor: 'transparent',
      color: '#2D6A4F',
      fontStyle: 'italic',
      fontSize: '13px',
      cursor: 'pointer',
    },
    cardList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    } as CSSProperties,
    card: (isLocked: boolean): CSSProperties => ({
      display: 'flex',
      gap: '14px',
      padding: '14px',
      borderRadius: '12px',
      cursor: isLocked ? 'not-allowed' : 'pointer',
      backgroundColor: 'transparent',
      border: '1px solid transparent',
      textDecoration: 'none',
      color: 'inherit',
      opacity: isLocked ? 0.5 : 1,
      transition: 'opacity 0.2s',
      alignItems: 'center',
    }),
    avatar: (color: string): CSSProperties => ({
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      position: 'relative',
    }),
    cardText: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3px',
      flex: 1,
    } as CSSProperties,
    cardTitle: {
      fontWeight: 700,
      fontSize: '15px',
      margin: 0,
    },
    cardDesc: {
      fontSize: '13px',
      lineHeight: 1.45,
      margin: 0,
      color: '#4A5568',
    },
    actionButtons: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      paddingRight: '8px',
    } as CSSProperties,
    iconButton: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    } as CSSProperties,
    bottomNav: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginTop: '12px',
    },
    navArrow: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: '1px solid #CBD5E0',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
  };

  const selectedCategory = CATEGORIES[catIndex];
  const selectedCC = CC_OPTIONS[ccIndex];
  const canGoUp = pageOffset > 0;
  const canGoDown = pageOffset + PAGE_SIZE < filteredPatients.length;

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div style={styles.container}>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          style={styles.tbBtn(favOnly)}
          onClick={handleFavToggle}
          title="Favourites"
        >
          <Star size={16} fill={favOnly ? '#2D6A4F' : 'none'} stroke="#2D6A4F" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          style={styles.tbBtn(sortDir !== 'none')}
          onClick={handleSortClick}
        >
          <ListFilter size={14} />
          Sort
          <SortArrow dir={sortDir} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          style={styles.tbBtn(selectedCategory !== 'all')}
          onClick={handleCategoryClick}
        >
          Category
          {selectedCategory !== 'all' && (
            <span style={{ fontSize: 11, color: '#2D6A4F' }}>{selectedCategory}</span>
          )}
          <SortArrow dir={selectedCategory === 'all' ? 'none' : catIndex % 2 === 1 ? 'asc' : 'desc'} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          style={styles.tbBtn(selectedCC !== 'all')}
          onClick={handleCCClick}
        >
          CC
          {selectedCC !== 'all' && (
            <span style={{ fontSize: 11, color: '#2D6A4F' }}>{selectedCC}</span>
          )}
          <SortArrow dir={selectedCC === 'all' ? 'none' : ccIndex % 2 === 1 ? 'asc' : 'desc'} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          style={styles.hideBtn}
          onClick={handleHideLocked}
        >
          {hideLocked ? 'Show Locked' : 'Hide Locked'}
        </motion.button>
      </div>

      {/* Card List */}
      <div style={styles.cardList}>
        <AnimatePresence mode="popLayout">
          {visiblePatients.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: 13, color: '#718096', textAlign: 'center', padding: '20px 0' }}
            >
              No patients match the current filters.
            </motion.p>
          ) : (
            visiblePatients.map((patient) => {
              // Convert name to a URL-friendly slug (e.g., "John Doe" -> "john-doe")
              const slug = patient.name.toLowerCase().replace(/\s+/g, '-');
              
              return (
                <Link 
                  key={patient.id + patient.name}
                  href={patient.isLocked ? '#' : `./simulation/${slug}`}
                  onClick={(e) => {
                    if (patient.isLocked) e.preventDefault();
                  }}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    whileHover={patient.isLocked ? {} : { scale: 1.01, backgroundColor: '#E5E9E6', border: '1px solid #A0AEC0' }}
                    whileTap={patient.isLocked ? {} : { scale: 0.98 }}
                    style={styles.card(patient.isLocked)}
                  >
                    <div style={styles.avatar(patient.color)}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>

                    <div style={styles.cardText}>
                      <h3 style={styles.cardTitle}>{patient.name}</h3>
                      <p style={styles.cardDesc}>{patient.description}</p>
                    </div>

                    <div style={styles.actionButtons}>
                      {/* Star (Favorite) Action */}
                      <div 
                        style={styles.iconButton} 
                        onClick={(e) => toggleFavorite(e, patient.id)}
                      >
                        <Star 
                          size={20} 
                          fill={patient.isFavorite ? '#F59E0B' : 'none'} 
                          stroke={patient.isFavorite ? '#F59E0B' : '#A0AEC0'} 
                        />
                      </div>
                      
                      {/* Lock Action */}
                      <div 
                        style={styles.iconButton} 
                        onClick={(e) => toggleLock(e, patient.id)}
                      >
                        {patient.isLocked ? (
                          <Lock size={18} color="#E53E3E" />
                        ) : (
                          <Unlock size={18} color="#A0AEC0" />
                        )}
                      </div>
                    </div>

                  </motion.div>
                </Link>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Up / Down Navigation */}
      <div style={styles.bottomNav}>
        <motion.div
          whileTap={canGoUp ? { scale: 0.88, y: -2 } : {}}
          style={{
            ...styles.navArrow,
            opacity: canGoUp ? 1 : 0.35,
            cursor: canGoUp ? 'pointer' : 'default',
          }}
          onClick={handleScrollUp}
        >
          <ChevronUp size={21} color="#000" />
        </motion.div>

        <motion.div
          whileTap={canGoDown ? { scale: 0.88, y: 2 } : {}}
          style={{
            ...styles.navArrow,
            opacity: canGoDown ? 1 : 0.35,
            cursor: canGoDown ? 'pointer' : 'default',
          }}
          onClick={handleScrollDown}
        >
          <ChevronDown size={21} color="#000" />
        </motion.div>
      </div>
    </div>
  );
};

export default PatientList;