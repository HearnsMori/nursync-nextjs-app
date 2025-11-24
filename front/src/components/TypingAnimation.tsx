'use client'; // 👈 Must be a client component for state and effects

import React, { useState, useEffect } from 'react';

// --- Configuration Constants ---
const TYPING_SPEED = 150; // Milliseconds per character
const DELETING_SPEED = 100; // Milliseconds per character
const PAUSE_DURATION = 2000; // Milliseconds to pause before deleting/next word

interface TypingAnimationProps {
  /** An array of strings to be typed and deleted repeatedly. */
  words: string[];
}

export default function TypingAnimation({ words }: TypingAnimationProps) {
  // 1. State for the animation logic
  const [wordIndex, setWordIndex] = useState(0); // Which word in the array is current
  const [displayedText, setDisplayedText] = useState(''); // The text currently visible
  const [isDeleting, setIsDeleting] = useState(false); // Whether the animation is typing or deleting

  // NEW: only run animation after client mount so server and initial client markup match
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Client-only blinking cursor state (keeps server and initial client markup identical)
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setShowCursor((s) => !s), 500);
    return () => clearInterval(id);
  }, [mounted]);
  
  // 2. Effect Hook to control the animation cycle
  useEffect(() => {
    if (!mounted) return; // don't start timers until we've mounted on client

    const currentWord = words[wordIndex % words.length];

    // --- Typing Logic ---
    if (!isDeleting && displayedText.length < currentWord.length) {
      // Set a timeout to add the next character
      const timer = setTimeout(() => {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
      }, TYPING_SPEED);

      return () => clearTimeout(timer); // Cleanup
    }

    // --- Deleting Logic ---
    if (isDeleting && displayedText.length > 0) {
      // Set a timeout to remove the last character
      const timer = setTimeout(() => {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
      }, DELETING_SPEED);

      return () => clearTimeout(timer); // Cleanup
    }

    // --- Transition Logic (Paused) ---
    if (displayedText.length === currentWord.length && !isDeleting) {
      // Word is fully typed: wait, then start deleting
      const timer = setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_DURATION);

      return () => clearTimeout(timer); // Cleanup
    }

    if (displayedText.length === 0 && isDeleting) {
      // Word is fully deleted: stop deleting, move to the next word
      setIsDeleting(false);
      setWordIndex((prevIndex) => prevIndex + 1);
    }
    
    // Dependencies: Rerun effect when state changes
  }, [displayedText, isDeleting, wordIndex, words, mounted]); 

  // 3. Render the component
  // The server and initial client render will show the same minimal markup (mounted === false)
  return (
    <div style={{ color: 'white', fontSize: '2.6rem', textShadow: '20px green', fontWeight: '600', minHeight: '3rem' }}>
      {displayedText}
      {/* Blinking cursor implemented via client-only state to avoid hydration mismatch */}
      <span
        className="cursor"
        style={{ textShadow: '20px green', borderRight: '0.1em solid', borderRightColor: showCursor ? 'black' : 'transparent' }}
      >
        {'\u00A0'}
      </span>
      
    </div>
  );
}