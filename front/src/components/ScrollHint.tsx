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
      {/* Downward arrow element */}
      <div style={styles.arrow} className="scroll-hint-arrow">
        &#8595; {/* Unicode character for a downward arrow */}
      </div>

      {/* Internal CSS for the animation (using <style jsx> or global CSS is usually cleaner) */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-5px);
          }
          60% {
            transform: translateY(-3px);
          }
        }
        .scroll-hint-arrow {
          animation: bounce 2s infinite;
        }
      `}</style>
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