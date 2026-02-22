"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Stethoscope } from 'lucide-react';
import { useRouter } from 'next/navigation'; // or 'next/navigation' for App Router

const LaunchSimulationButton = () => {
    const [txt, setTxt] = useState("");
    const router = useRouter();

    const handleNavigation = () => {
        router.push('/simulation'); // Change this to your actual path
    };

    return (
        <motion.button
            onClick={handleNavigation}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(45, 106, 79, 0.4)",
                backgroundColor: "#1B4332"
            }}
            onHoverStart={(e) => {
                setTxt("Launch Simulation");
                //alert("1");
            }}

            // Optional: call a function when the mouse leaves
            onHoverEnd={() => {
                setTxt("");
                //alert("2");
            }}
            whileTap={{ scale: 0.95 }}
            style={{
                /* Positioning */
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                zIndex: 9999,

                /* Styling */
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 28px',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',

                /* Green Theme Gradient */
                background: 'linear-gradient(135deg, #2D6A4F 0%, #0f5a1b 100%)',
                color: '#FFFFFF',

                /* Typography */
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '16px',
                fontWeight: '600',
                letterSpacing: '0.3px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            }}
        >
            {/* Pulse Effect for a "Medical" feel */}
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    padding: '6px'
                }}
            >
                <Stethoscope size={20} strokeWidth={2.5} />
            </motion.div>

            <span>{txt}</span>

            <Play size={16} fill="white" style={{ marginLeft: '4px', opacity: 0.8 }} />
        </motion.button>
    );
};

export default LaunchSimulationButton;