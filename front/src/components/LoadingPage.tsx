"use client";
import React, { FC } from 'react';
import { motion, MotionStyle } from 'framer-motion';

// --- Configuration ---
const TRACE_DURATION: number = 0.3; // Time for one full ECG cycle (in seconds)
const PULSE_HEIGHT: number = 40;   // Vertical amplitude of the heartbeat (in pixels)
const TEXT_MESSAGE: string = "Loading...";

// --- Style Definitions for Type Safety ---
// We define a base style for the container to satisfy MotionStyle type
const containerStyle: React.CSSProperties = {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    backgroundColor: '#171D22', 
    color: '#39FF14', 
    fontFamily: 'monospace',
    fontSize: '24px'
};

const monitorFrameStyle: React.CSSProperties = {
    width: '80%', 
    maxWidth: '600px',
    height: '100px',
    border: '2px solid #39FF14',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '30px',
};

const traceLineStyle: MotionStyle = {
    position: 'absolute',
    width: '100%',
    height: '2px',
    backgroundColor: '#39FF14',
    boxShadow: '0 0 10px #39FF14',
    // Set initial position here to satisfy TypeScript
    x: '-100%', 
    y: '50%' 
};


const NursingECGLoader: FC = () => {
    
  return (
    <div style={containerStyle}>
        
        {/* --- 1. The Monitor Frame Container --- */}
        <div style={monitorFrameStyle}>
            
            {/* --- 2. The ECG Trace Line (motion.div) --- */}
            <motion.div
                // Initial state is defined in the style for cleaner type inference
                style={traceLineStyle} 
                animate={{
                    // Keyframes for the line's position:
                    x: [
                        '-100%',     
                        '0%',        
                        '10%',       
                        '20%',       
                        '25%', 
                        '30%', 
                        '40%', 
                        '90%',       
                        '100%',      
                    ],
                    y: [
                        '50%',       // Start at baseline
                        '50%',       // P wave start/end
                        '50%',       // P wave start/end
                        '50%',       // Q wave start
                        `calc(50% - ${PULSE_HEIGHT}px)`, // R wave peak
                        `calc(50% + ${PULSE_HEIGHT}px)`, // S wave trough
                        '50%',       // T wave end
                        '50%',       // Baseline hold
                        '50%',       // End at baseline
                    ]
                }}
                transition={{
                    times: [0, 0.1, 0.2, 0.25, 0.3, 0.35, 0.45, 0.95, 1],
                    duration: TRACE_DURATION,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />
             {/* Optional grid lines */}
             <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'repeating-linear-gradient(90deg, transparent, transparent 19.8%, rgba(57, 255, 20, 0.1) 20%, rgba(57, 255, 20, 0.1) 20.2%)', backgroundSize: '100% 20%', opacity: 0.5 }}></div>
        </div>

        {/* --- 3. The Text Indicator (motion.div) --- */}
        <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{
                opacity: 1,
                width: [`0ch`, `${TEXT_MESSAGE.length}ch`], 
                color: ['#39FF14', '#39FF14AA'], 
            }}
            transition={{
                duration: 0.3, 
                ease: 'linear',
                repeatType: 'loop',
                // Blinking cursor transition overrides
                color: {
                    repeat: Infinity,
                    duration: 0.5,
                    repeatType: 'reverse', 
                    ease: 'linear',
                    delay: 2.0 
                }
            }}
            style={{
                fontSize: '1em',
                overflow: 'hidden', 
                whiteSpace: 'nowrap',
                borderRight: '2px solid #39FF14',
            }}
        >
            {TEXT_MESSAGE}
        </motion.div>

    </div>
  );
};

export default NursingECGLoader;