"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coreApi from "@/utils/coreApi";
import PatientList from "./components/PatientList";
import styles from "./AISimulation.module.css";
import Image from "next/image";
import {useRouter} from "next/navigation";
import { Search, X, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";

export default function AISimulation() {
    const router = useRouter();
    const [tab, setTab] = useState<"welcome" | "caseLibrary" | "dailyPatient" | "charting" | "subscribe">("welcome");
    const [caseLibTab, setCaseLibTab] = useState<"byUnit" | "bySpecialty" | "allCases">("byUnit");
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
                {tab === "caseLibrary" && (
                    <div style={{
                        height: "84vh",
                        width: "62vw",
                        background: "white",
                        borderRadius: "1vw",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        display: "flex",
                        flexFlow: "column nowrap",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                        fontWeight: 700,
                    }}>
                        <div style={{
                            display: "flex",
                            flexFlow: "row nowrap",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "black",
                            fontWeight: 700,
                            width: "100%",
                            flex: 1,
                        }}>
                            <div style={{
                                background: "green",
                                display: "flex",
                                flexFlow: "row nowrap",
                                width: "42%",
                                height: "73%",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.7vw",
                                padding: "0.5vw 1vw",
                                borderRadius: "5vw",
                            }}>
                                <button
                                    className={`${styles.tabButton} ${caseLibTab === "byUnit" ? styles.active : ""}`}
                                    onClick={() => setCaseLibTab("byUnit")}
                                >
                                    By Unit
                                </button>

                                <button
                                    className={`${styles.tabButton} ${caseLibTab === "bySpecialty" ? styles.active : ""}`}
                                    onClick={() => setCaseLibTab("bySpecialty")}
                                >
                                    By Specialty
                                </button>

                                <button
                                    className={`${styles.tabButton} ${caseLibTab === "allCases" ? styles.active : ""}`}
                                    onClick={() => setCaseLibTab("allCases")}
                                >
                                    All Cases
                                </button>
                            </div>
                            <div style={{
                                position: "absolute",
                                marginLeft: "4vw",
                                zIndex: 2,
                            }}>
                                <Search size={26} color="black" strokeWidth={2} />
                            </div>
                            <input style={{
                                display: "block",
                                border: "3px solid green",
                                borderRadius: "5vw",
                                width: "42%",
                                height: "73%",
                                background: "transparent",
                                fontSize: "1vw",
                                color: "black",
                                paddingLeft: "3.7vw",
                                marginLeft: "2vw",
                            }} />
                            <div style={{
                                marginLeft: "1vw",
                                zIndex: 2,
                            }}>
                                <X size={26} color="black" strokeWidth={2} />
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            flexFlow: "row nowrap",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "black",
                            fontWeight: 700,
                            width: "100%",
                            flex: 6,

                        }}>
                            {/* Case Librarary Sub Tab*/}
                            {caseLibTab === "byUnit" && (
                                <>
                                    <div style={{
                                        flex: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <ChevronLeft size={21} color="black" strokeWidth={2} />
                                    </div>
                                    <div style={{
                                        flex: 11,
                                        display: "flex",
                                        flexFlow: "row nowrap",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column nowrap",
                                            gap: "3vw",
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Emergency Department (ED/ER)
                                            </button>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Intensive Care Unit (ICU)
                                            </button>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Operating Room (OR)
                                            </button>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Post-Anesthesia Care Unit (PACU)
                                            </button>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column nowrap",
                                            gap: "3vw",
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Delivery Room (DR)
                                            </button>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Medical-Surgical Ward (Med-Surg)
                                            </button>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Outpatient / Ambulatory Clinic
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{
                                        flex: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <ChevronRight size={21} color="black" strokeWidth={2} />
                                    </div>
                                </>
                            )}
                            {caseLibTab === "bySpecialty" && (
                                <>
                                    <div style={{
                                        flex: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <ChevronLeft size={21} color="black" strokeWidth={2} />
                                    </div>
                                    <div style={{
                                        flex: 11,
                                        display: "flex",
                                        flexFlow: "row nowrap",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column nowrap",
                                            gap: "3vw",
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Perioperative Nursing
                                            </button>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Critical Care Nursing
                                            </button>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Pediatric Nursing
                                            </button>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Geriatric Nursing
                                            </button>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column nowrap",
                                            gap: "3vw",
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Obstetric & Gynecological (OB-GYN) Nursing
                                            </button>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Psychiatric-Mental Health Nursing
                                            </button>
                                            <button style={{
                                                background: "white",
                                                color: "green",
                                                border: "3px solid green",
                                                fontWeight: 700,
                                                padding: "1.5vw 0",
                                                width: "90%",
                                                fontSize: "1.1vw",
                                                borderRadius: "1.5vw",
                                            }}>
                                                Community Health Nursing
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{
                                        flex: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <ChevronRight size={21} color="black" strokeWidth={2} />
                                    </div>
                                </>
                            )}
                            {caseLibTab === "allCases" && (
                                <>
                                    <div style={{
                                        flex: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <ChevronLeft size={21} color="black" strokeWidth={2} />
                                    </div>
                                    <div style={{
                                        flex: 11,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <PatientList />
                                    </div>
                                    <div style={{
                                        flex: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <ChevronRight size={21} color="black" strokeWidth={2} />
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                )}
                
                {tab === "subscribe" && (
                    <div
                        style={{
                            width: "420px",
                            margin: "40px auto",
                            padding: "40px 30px",
                            background: "rgba(255,255,255,0.95)",
                            borderRadius: "20px",
                            boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
                            textAlign: "center",
                            fontFamily: "Arial, sans-serif"
                        }}
                    >

                        <div style={{
                            fontSize: "26px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                            color: "#222"
                        }}>
                            Nursing Simulation Subscription
                        </div>

                        <div style={{
                            fontSize: "15px",
                            color: "#555",
                            marginBottom: "25px",
                            lineHeight: "1.6"
                        }}>
                            Unlock advanced clinical simulation cases and improve your
                            nursing decision-making skills through realistic patient scenarios.
                        </div>


                        <div style={{
                            background: "linear-gradient(135deg,#6a4cff,#a855f7)",
                            color: "white",
                            padding: "18px",
                            borderRadius: "14px",
                            marginBottom: "20px",
                            fontWeight: "bold",
                            fontSize: "18px"
                        }}>
                            Subscription Coming Soon
                        </div>


                        <div style={{
                            fontSize: "14px",
                            color: "#666",
                            marginBottom: "25px"
                        }}>
                            ✔ 200+ Interactive Patient Cases<br />
                            ✔ Realistic Nursing Scenarios<br />
                            ✔ Performance Tracking<br />
                            ✔ Clinical Decision Training
                        </div>


                        <button
                            style={{
                                background: "linear-gradient(135deg,#6a4cff,#a855f7)",
                                border: "none",
                                color: "white",
                                padding: "14px 35px",
                                fontSize: "16px",
                                borderRadius: "12px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                boxShadow: "0px 6px 15px rgba(0,0,0,0.2)"
                            }}
                        >
                            Notify Me
                        </button>

                    </div>

                )}
                {tab === "welcome" && (
                    <div style={{
                        background: "white",
                        width: "48vw",
                        height: "74vh",
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
                <div style={{
                    fontWeight: 700,
                    fontSize: "2.5vw",
                    color: "white",
                    textShadow: "3px 3px 5px #000000bb",
                    marginTop: "2vw",
                }}>
                    Nursing
                    <span style={{ marginLeft: "0.3vw" }}><GraduationCap size={33} color="white" strokeWidth={3} /></span>
                    <br /> Simulation
                </div>
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
                    <b style={{ fontSize: "1.7vw" }}>Case Library</b><br />
                    Browse the library for free
                </motion.button>
                <motion.button
                    onClick={(e) => {
                        router.push("./simulation/patient");
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
                    <b style={{ fontSize: "1.7vw" }}>Daily Patient</b><br />
                    Play the daily featured cases
                </motion.button>
                <motion.button
                    onClick={(e) => {
                        setTab("charting");
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
                        background: (tab === "charting") ? "#5037FF" : "#149848",
                        color: "white",
                        border: "none",
                        borderRadius: "2vw",
                        padding: "1vw",
                        cursor: "pointer",
                    }}>
                    <b style={{ fontSize: "1.7vw" }}>Charting</b><br />
                    Exercise your charting skill
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
                        color: "black",
                        marginTop: "3vw",
                        width: "73%",
                        background: (tab === "subscribe") ? "#5037FF" : "white",
                        border: "none",
                        borderRadius: "2vw",
                        padding: "1vw",
                        cursor: "pointer",
                    }}>
                    <b style={{ fontSize: "1.5vw", color: "green", textShadow: "3px 3px 5px #000000bb" }}>Tokens: <span style={{ color: "black" }}>10</span> </b>
                </motion.button>
                <span onClick={(e) => {
                    setTab("welcome");
                }} style={{
                    color: "white",
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginBottom: "2vw",
                }}>
                    Not Enough Tokens? Avail here!
                </span>
            </div>

        </div >
    );
}