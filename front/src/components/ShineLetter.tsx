"use client";
import React, { FC } from 'react';
import { motion, MotionStyle } from 'framer-motion';

interface ShineTextProps {
  text: string;
  shineColor?: string; // Color of the shine effect
  textColor?: string;   // Normal text color
  textShadow?: string;
  duration?: number;    // Duration of one shine sweep
  delay?: number;       // Initial delay before the animation starts
  repeatDelay?: number; // Delay between each shine repetition
  fontSize?: string;    // CSS font-size property
  fontWeight?: string | number; // CSS font-weight property
}

const ShineText: FC<ShineTextProps> = ({
  text,
  shineColor = '#fff', // Default bright white
  textColor = '#888',   // Default dark grey
  textShadow = '1vw black',
  duration = 2.5,
  delay = 0.5,
  repeatDelay = 1,
  fontSize = '3em',
  fontWeight = 'bold'
}) => {

  // The base style for the text element
  const textBaseStyle: React.CSSProperties = {
    fontSize: fontSize,
    fontWeight: fontWeight,
    display: 'inline-block', // Crucial for inline text to have a width for gradient
    position: 'relative',
    textShadow: textShadow,
    color: textColor, // Fallback color if background-clip isn't supported or for normal parts
    // We'll apply the gradient background with animation below
  };

  // Motion style for the shine effect
  // This uses a linear-gradient for the background and clips it to the text.
  // The 'background-size' is important to make the gradient wider than the text,
  // allowing it to fully sweep across.
  const shineMotionStyle: MotionStyle = {
    backgroundImage: `linear-gradient(90deg, ${textColor} 0%, ${textColor} 20%, ${shineColor} 50%, ${textColor} 80%, ${textColor} 100%)`,
    backgroundSize: '200% auto', // Make gradient wider than text to allow full sweep
    WebkitBackgroundClip: 'text', // Clip background to text
    WebkitTextFillColor: 'transparent', // Make text transparent to show clipped background
    backgroundClip: 'text', // Standard property
    color: 'transparent', // Standard property
    position: 'relative', // Necessary for z-index or other positioning if needed
    display: 'inline-block' // Ensure it behaves like a block for sizing, but inline for flow
  };

  return (
    <motion.span
      style={{ ...textBaseStyle, ...shineMotionStyle }}
      initial={{ backgroundPositionX: '200%' }} // Start the gradient off-screen right
      animate={{ backgroundPositionX: ['200%', '-200%'] }} // Animate it to off-screen left
      transition={{
        duration: duration,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: repeatDelay,
        delay: delay,
      }}
    >
      {text}
    </motion.span>
  );
};

export default ShineText;