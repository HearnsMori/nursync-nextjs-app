'use client';

import React, { useState, useEffect } from 'react';

// Define the component's props for type safety
interface ScrollHintProps {
  /** The text prompt displayed above the arrow. */
  text?: string;
  /** The scroll position (in pixels) at which the hint should disappear. */
  hideThreshold?: number;
}

export default function ScrollHint({
  text = 'Scroll to view more',
  hideThreshold = 200,
}: ScrollHintProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Client-only bounce toggle to animate arrow without styled-jsx (keeps SSR output stable)
  const [bounce, setBounce] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setBounce((b) => !b), 900);
    return () => clearInterval(id);
  }, []);

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Check if the vertical scroll position is past the threshold
      const scrolledPastThreshold = window.scrollY > hideThreshold;
      
      // Update visibility state
      if (scrolledPastThreshold && isVisible) {
        setIsVisible(false);
      } else if (!scrolledPastThreshold && !isVisible) {
        setIsVisible(true);
      }
    };

    // Attach the scroll event listener to the window
    window.addEventListener('scroll', handleScroll);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, hideThreshold]); // Re-run effect if isVisible or hideThreshold changes

  if (!isVisible) {
    return null; // Don't render anything if the user has scrolled enough
  }

  return (
    <div style={styles.container}>
      <p style={styles.text}>{text}</p>
      {/* Downward arrow element - animate via inline style to avoid styled-jsx hydration mismatches */}
      <div
        style={{
          ...styles.arrow,
          transform: bounce ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 700ms ease-in-out',
        }}
        aria-hidden
      >
        &#8595; {/* Unicode character for a downward arrow */}
      </div>
    </div>
  );
}

// Inline styles for basic positioning and appearance
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'fixed', // Fixed position relative to the viewport
    bottom: '20px',    // Positioned near the bottom
    left: '50%',       // Centered horizontally
    transform: 'translateX(-50%)',
    textAlign: 'center',
    padding: '10px',
    color: '#ffffff',
    zIndex: 1000,
    cursor: 'default',
    transition: 'opacity 0.3s ease-in-out',
  },
  text: {
    fontSize: '0.9rem',
    margin: '0 0 2px 0',
  },
  arrow: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    lineHeight: 1,
  },
};