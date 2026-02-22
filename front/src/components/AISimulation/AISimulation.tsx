"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dbStorage from "@/utils/dbstorage";
import Image from "next/image";

export default function AISimulation() {
    const [tab, setTab] = useState<"welcome" | "caseLibrary" | "dailyPatient" | "subscribe">("welcome");
    return (
        <div style={{
            display: "flex",
            flexFlow: "row nowrap",
            width: "100%",
            height: "92vh",
            backgroundImage: "url('/simulationbg.png')",
        }}>
            <div style={{
                flex: "3",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                {/* Main Simulation Box */}
                { tab === "caseLibrary" && (
                    <div style={{
                        height: "84vh",
                        width: "62vw",
                        background: "white",
                        borderRadius: "1vw",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                        fontWeight: 700,
                    }}>
                        Case Library Coming Soon!
                    </div>
                )}
                { tab === "dailyPatient" && (
                    <div style={{
                        height: "84vh",
                        width: "62vw",
                        background: "white",
                        borderRadius: "1vw",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                        fontWeight: 700,
                    }}>
                        Daily Patient Coming Soon!
                    </div>
                )}
                { tab === "subscribe" && (
                    <div style={{
                        height: "84vh",
                        width: "62vw",
                        background: "white",
                        borderRadius: "1vw",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                        fontWeight: 700,
                    }}>
                        Subscription Coming Soon!
                    </div>
                )}
                {tab === "welcome" && (
                    <div style={{
                        background: "white",
                        width: "48vw",
                        height: "73vh",
                        borderRadius: "1vw",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexFlow: "column nowrap",
                    }}>
                        <div style={{
                            borderRadius: "1vw 1vw 0 0",
                            background: "#026e2c",
                            flex: "1",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Image
                                src="/logoimg.png"
                                width={1000}
                                height={1000}
                                alt="Logo Image"
                                style={{
                                    position: "absolute",
                                    height: '10vw',
                                    width: '10vw',
                                    borderRadius: "5vw",
                                    marginRight: "30%",
                                    marginTop: "5%",
                                }}
                            />
                            <div style={{
                                display: "flex",
                                flexFlow: "column nowrap",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <div>
                                    <Image
                                        src="/simulationlogotxt.png"
                                        width={1000}
                                        height={1000}
                                        alt="Logo Text"
                                        style={{
                                            height: '4vw',
                                            width: 'auto',
                                            marginLeft: "2vw",
                                        }}
                                    />
                                </div>
                                <div style={{
                                    fontSize: "1.5vw",
                                    fontWeight: "bold",
                                    color: "white",
                                    marginTop: "-0.5vw",
                                }}>
                                    Nursing Simulation
                                </div>
                            </div>
                        </div>
                        <div style={{
                            flex: "4",
                            zIndex: 2,
                        }}>
                            <div style={{
                                color: "black",
                                marginTop: "1.5vw",
                                marginLeft: "17vw",
                                fontWeight: 700,
                            }}>
                                Welcome to Nursync Simulation Version 1.0!
                            </div>
                            <motion.div
                                animate={{
                                    // Pulsing both the brightness and the scale for a "breathing" effect
                                    opacity: [0.7, 1, 0.7],
                                    scaleY: [1.5, 3, 1.5],
                                    boxShadow: [
                                        "0 0 20px rgba(57, 255, 20, 0.7), 0 0 40px rgba(29, 185, 84, 0.3)",
                                        "0 0 40px rgba(57, 255, 20, 1), 0 0 70px rgba(29, 185, 84, 0.5)",
                                        "0 0 20px rgba(57, 255, 20, 0.7), 0 0 40px rgba(29, 185, 84, 0.3)",
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    marginTop: "1vw",
                                    height: "3px",
                                    width: "80%",
                                    maxWidth: "21vw",
                                    marginLeft: "17vw",
                                    marginBottom: "1vw",
                                    borderRadius: "50%",
                                    // Radial gradient makes the center "heavier" and edges transparent
                                    background: "radial-gradient(circle, #39FF14 0%, rgba(57, 255, 20, 0.5) 40%, transparent 100%)",
                                    position: "relative",
                                }}
                            >
                                {/* Secondary "Core" for extra brightness in the dead center */}
                                <div style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "30%",
                                    height: "100%",
                                    background: "#fff",
                                    filter: "blur(2px)",
                                    opacity: 0.6,
                                    borderRadius: "50%"
                                }} />
                            </motion.div>
                            <div style={{
                                color: "black",
                                maxWidth: "90%",
                                marginLeft: "4vw",
                            }}>
                                <ul>
                                    <li style={{
                                        fontWeight: "700",
                                        marginBottom: "0.5vw",
                                    }}>
                                        New Ambulance-based EMS Cases!
                                    </li>
                                </ul>
                                <div style={{
                                    marginBottom: "2vw",
                                }}>
                                    Treat critical patients in our new ambulance with all appropriate equipment and medications available. 8 initial cases and lots more on the way!
                                </div>
                                <ul>
                                    <li style={{
                                        fontWeight: "700",
                                        marginBottom: "0.5vw",
                                    }}>
                                        Improved Case Browsing
                                    </li>
                                </ul>
                                <div style={{
                                    marginBottom: "2vw",
                                }}>
                                    To support our expanding range of cases, our case library now allows you to browse by unit.
                                </div>
                                <ul>
                                    <li style={{
                                        fontWeight: "700",
                                        marginBottom: "0.5vw",
                                    }}>
                                        New Monitor
                                    </li>
                                </ul>
                                <div style={{
                                    marginBottom: "2vw",
                                }}>
                                    The monitor now displays SpO₂ and respiration waveforms, plus on EMS cases you can track end tidal CO₂.
                                </div>
                            </div>
                            <motion.div
                                animate={{
                                    // Pulsing both the brightness and the scale for a "breathing" effect
                                    opacity: [0.7, 1, 0.7],
                                    scaleY: [1.5, 3, 1.5],
                                    boxShadow: [
                                        "0 0 20px rgba(57, 255, 20, 0.7), 0 0 40px rgba(29, 185, 84, 0.3)",
                                        "0 0 40px rgba(57, 255, 20, 1), 0 0 70px rgba(29, 185, 84, 0.5)",
                                        "0 0 20px rgba(57, 255, 20, 0.7), 0 0 40px rgba(29, 185, 84, 0.3)",
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    marginTop: "0",
                                    margin: "auto",
                                    height: "3px",
                                    width: "50%",
                                    maxWidth: "21vw",
                                    marginBottom: "1vw",
                                    borderRadius: "50%",
                                    // Radial gradient makes the center "heavier" and edges transparent
                                    background: "radial-gradient(circle, #39FF14 0%, rgba(57, 255, 20, 0.5) 40%, transparent 100%)",
                                    position: "relative",
                                }}
                            >
                                {/* Secondary "Core" for extra brightness in the dead center */}
                                <div style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "30%",
                                    height: "100%",
                                    background: "#fff",
                                    filter: "blur(2px)",
                                    opacity: 0.6,
                                    borderRadius: "50%"
                                }} />
                            </motion.div>
                            <button onClick={
                              (e) => {
                                setTab("caseLibrary");
                              }
                            } style={{
                                border: "none",
                                background: "#026e2c",
                                color: "white",
                                padding: "0.5vw 1vw",
                                borderRadius: "0.5vw",
                                margin: "auto",
                                marginBottom: "1vw",
                                cursor: "pointer",
                                marginLeft: "50%",
                                transform: "translateX(-50%)",
                            }}>
                                Done
                            </button>

                        </div>
                    </div>
                )}

            </div>
            <div style={{
                flex: "1",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#026e2c73",
                flexFlow: "column nowrap",
                gap: "2vw",
            }}>
                <motion.button
                    onClick={(e) => {
                        setTab("caseLibrary");
                    }}
                    whileTap={{ scale: 1.2 }}
                    animate={{
                        // Pulsing both the brightness and the scale for a "breathing" effect
                        scale: [0.5, 1],
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                    }}
                    style={{
                        width: "73%",
                        background: (tab === "caseLibrary") ? "#5037FF" : "#2fb65e",
                        color: "white",
                        border: "none",
                        borderRadius: "2vw",
                        padding: "1vw",
                        cursor: "pointer",
                    }}>
                    <b style={{ fontSize: "2vw" }}>Case Library</b><br />
                    Browse the library for free
                </motion.button>
                <motion.button
                    onClick={(e) => {
                        setTab("dailyPatient");
                    }}
                    whileTap={{ scale: 1.2 }}
                    animate={{
                        // Pulsing both the brightness and the scale for a "breathing" effect
                        scale: [0.5, 1],
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                    }}
                    style={{
                        width: "73%",
                        background: (tab === "dailyPatient") ? "#5037FF" : "#149848",
                        color: "white",
                        border: "none",
                        borderRadius: "2vw",
                        padding: "1vw",
                        cursor: "pointer",
                    }}>
                    <b style={{ fontSize: "2vw" }}>Daily Patient</b><br />
                    Play the daily featured cases
                </motion.button>
                <motion.button
                    onClick={(e) => {
                        setTab("subscribe");
                    }}
                    whileTap={{ scale: 1.2 }}
                    animate={{
                        // Pulsing both the brightness and the scale for a "breathing" effect
                        scale: [0.5, 1],
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                    }}
                    style={{
                        width: "73%",
                        background: (tab === "subscribe") ? "#5037FF" : "#026e2c",
                        color: "white",
                        border: "none",
                        borderRadius: "2vw",
                        padding: "1vw",
                        cursor: "pointer",
                    }}>
                    <b style={{ fontSize: "2vw" }}>Subscribe</b><br />
                    Subscribe to all 200+ cases
                </motion.button>
                <span onClick={(e) => {
                    setTab("welcome");
                }} style={{
                    color: "white",
                    textDecoration: "underline",
                    cursor: "pointer",
                }}>
                    What's new?
                </span>
            </div>

        </div >
    );
}