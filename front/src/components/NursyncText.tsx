import React, { FC } from 'react';
import { motion, MotionStyle } from 'framer-motion';

// --- Props for the component ---
interface NursyncLogoTextProps {
  text?: string; // Default to "NURSYNC"
  customFontFamily?: string; // Name of your custom font-family
  baseColor?: string;      // The main color of the letters (white in the image)
  shineColor?: string;     // Color of the shine effect (light green/blue in the image)
  glowColor?: string;      // The subtle glow color around the text
  animationDuration?: number; // Duration for one shine sweep
  animationDelay?: number;    // Initial delay for the animation
  repeatAnimationDelay?: number; // Delay between shine repetitions
  fontSize?: string;       // Overall font size
}

const NursyncLogoText: FC<NursyncLogoTextProps> = ({
  text = "NURSYNC",
  customFontFamily = "Arial, sans-serif", // Replace with your actual custom font-family
  baseColor = "#FFFFFF", // White, as in the image
  shineColor = "#19f0ffff", // Bright green for the shine effect
  glowColor = "rgba(45, 177, 177, 1)", // Subtle green glow
  animationDuration = 2.5,
  animationDelay = 0.5,
  repeatAnimationDelay = 1,
  fontSize = "5em", // Large for desktop logo
}) => {

  // Base style for the entire text container
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: customFontFamily,
    fontSize: fontSize,
    top:'50%',
    left:'50%',
    transform: 'translate(-50%, -50%)',
    fontWeight: '900', // Very bold
    letterSpacing: '0.05em', // Slightly spaced out
    textShadow: `0 0 15px ${glowColor}`, // Overall subtle glow
    position: 'absolute', // For positioning connection elements if added
  };

  // Motion style for the shine effect, similar to the previous ShineText component
  const shineMotionStyle: MotionStyle = {
    backgroundImage: `linear-gradient(90deg, ${baseColor} 0%, ${baseColor} 20%, ${shineColor} 50%, ${baseColor} 80%, ${baseColor} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block', // Crucial for gradient to apply
  };

  return (
    <div style={containerStyle}>
      <motion.span
        style={shineMotionStyle}
        initial={{ backgroundPositionX: '200%' }}
        animate={{ backgroundPositionX: ['200%', '-200%'] }}
        transition={{
          duration: animationDuration,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: repeatAnimationDelay,
          delay: animationDelay,
        }}
      >
        {text}
      </motion.span>

      {/* Attempting to add connecting elements with pure divs would look something like this.
        However, it will be very rigid and not integrate seamlessly with the font shapes.
        This is an illustration of the *limitation* of pure divs for this specific logo.

        For example, a horizontal bar between 'R' and 'S':
      */}
      {text === "NURSYNC" && ( // Only apply if the default text is used
        <>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '28%', // Adjust based on font and letter spacing
                width: '3%', // Width of the connection
                height: '4px',
                backgroundColor: baseColor,
                borderRadius: '2px',
                boxShadow: `0 0 8px ${glowColor}`,
                transform: 'translateY(-50%)',
            }} />
             <div style={{
                position: 'absolute',
                top: '40%', // Adjust vertically
                left: '60%', // Between S and Y
                width: '3%', // Width of the connection
                height: '4px',
                backgroundColor: baseColor,
                borderRadius: '2px',
                boxShadow: `0 0 8px ${glowColor}`,
                transform: 'translateY(-50%)',
            }} />
            {/* The circular element on the 'Y' or 'C' would be a positioned div */}
            <div style={{
                position: 'absolute',
                top: '65%',
                left: '68%', // Centered on 'Y' stem
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                border: `2px solid ${baseColor}`,
                boxShadow: `0 0 8px ${glowColor}`,
                transform: 'translateY(-50%)',
            }} />
        </>
      )}
    </div>
  );
};

export default NursyncLogoText;