"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dbStorage from "@/utils/dbstorage";
import Image from "next/image";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";

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
                                <button style={{
                                    fontWeight: 700,
                                    padding: "0.5vw",
                                    background: "white",
                                    fontSize: "1vw",
                                    color: "black",
                                    width: "33%",
                                    height: "95%",
                                    borderRadius: "3vw",
                                }}>
                                    By Unit
                                </button>
                                <button style={{
                                    fontWeight: 700,
                                    padding: "0.5vw",
                                    background: "white",
                                    fontSize: "1vw",
                                    color: "black",
                                    width: "33%",
                                    height: "95%",
                                    borderRadius: "3vw",
                                }}>
                                    By Specialty
                                </button>
                                <button style={{
                                    fontWeight: 700,
                                    padding: "0.5vw",
                                    background: "white",
                                    fontSize: "1vw",
                                    color: "black",
                                    width: "33%",
                                    height: "95%",
                                    borderRadius: "3vw",
                                }}>
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

                            </div>
                            <div style={{
                                flex: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <ChevronRight size={21} color="black" strokeWidth={2} />
                            </div>
                        </div>
                    </div>
                )}
                {tab === "dailyPatient" && (
                    <div
                        style={{
                            width: "600px",
                            margin: "40px auto",
                            background: "#efefef",
                            borderRadius: "18px",
                            padding: "25px",
                            fontFamily: "Arial, sans-serif",
                            boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
                            position: "relative"
                        }}
                    >

                        {/* Close Button */}
                        <div onClick={(e) => {
                            setTab("caseLibrary");
                        }}style={{
                            position: "absolute",
                            right: "20px",
                            top: "15px",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: "#1c7a3c",
                            fontWeight: "bold"
                        }}>
                            ×
                        </div>


                        {/* Title */}
                        <div style={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            marginBottom: "15px",
                            color: "black",
                        }}>
                            The Daily Patient
                        </div>


                        {/* Patient Row */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            marginBottom: "20px"
                        }}>

                            {/* Avatar */}
                            <div style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                background: "#2fa4a9",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "40px",
                                border: "4px solid #1f1f1f"
                            }}>
                                👨
                            </div>


                            {/* Patient Info */}
                            <div>

                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "5px"
                                }}>
                                    January 18
                                </div>

                                <div style={{
                                    fontSize: "14px",
                                    color: "#333",
                                    marginBottom: "10px",
                                    maxWidth: "360px"
                                }}>
                                    25-year-old male with acute agitation and hypertension on arrival.
                                    Direct to resuscitation bay.
                                </div>

                                <div style={{
                                    fontWeight: "bold",
                                    fontSize: "14px"
                                }}>
                                    Put your clinical decision making skills to the test!
                                </div>

                            </div>

                        </div>



                        {/* Timer Section */}
                        <div style={{
                            background: "#5b9466",
                            borderRadius: "6px",
                            padding: "20px",
                            textAlign: "center",
                            marginBottom: "15px",
                            border: "1px solid #3f6f47"
                        }}>

                            <div style={{
                                marginBottom: "15px",
                                fontWeight: "bold"
                            }}>
                                Time remaining to treat this patient:
                            </div>


                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px"
                            }}>

                                <div style={{
                                    background: "#28a7c9",
                                    color: "white",
                                    padding: "10px 16px",
                                    borderRadius: "6px",
                                    fontSize: "26px",
                                    fontWeight: "bold"
                                }}>
                                    22
                                    <div style={{ fontSize: "12px" }}>hours</div>
                                </div>

                                <div style={{
                                    fontSize: "26px",
                                    fontWeight: "bold",
                                    color: "white"
                                }}>
                                    :
                                </div>

                                <div style={{
                                    background: "#28a7c9",
                                    color: "white",
                                    padding: "10px 16px",
                                    borderRadius: "6px",
                                    fontSize: "26px",
                                    fontWeight: "bold"
                                }}>
                                    47
                                    <div style={{ fontSize: "12px" }}>mins</div>
                                </div>

                            </div>

                        </div>



                        {/* Play Button */}
                        <div
                            style={{
                                background: "#28a7c9",
                                color: "white",
                                textAlign: "center",
                                padding: "12px",
                                borderRadius: "6px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                border: "1px solid #187c95"
                            }}
                        >
                            PLAY
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