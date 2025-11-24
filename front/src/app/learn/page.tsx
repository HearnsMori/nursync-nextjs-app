"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Course {
    level: number;
    url: string;
    title: string;
    aaa: string;
    sem: string;
    progress: number;
}

export default function NurSyncCourses() {
    const [selectedLevel, setSelectedLevel] = useState<number | "All">("All");

    const courses: Course[] = [
        //level 1
        {
            level: 1,
            url: "https://nursync.super.site/homepage/learning-hub/anatomy-and-physiology",
            title: "Anatomy and <br/> Physiology",
            aaa: "NM 1",
            sem: "First Semester",
            progress: 0,
        },
        {
            level: 1,
            url: "https://nursync.super.site/homepage/learning-hub/biochemistry",
            title: "Biochemistry",
            aaa: "NM 2",
            sem: "First Semester",
            progress: 0,
        },
        {
            level: 1,
            url: "https://nursync.super.site/homepage/learning-hub/theoretical-foundations-in-nursing",
            title: "Theoretical Foundation <br/> in Nursing",
            aaa: "NP",
            sem: "First Semester",
            progress: 0,
        },
        {
            level: 1,
            url: "https://nursync.super.site/homepage/learning-hub/microbiology-and-parasitology",
            title: "Microbiology and <br/> Parasitology",
            aaa: "NM 3",
            sem: "Second Semester",
            progress: 0,
        },
        {
            level: 1,
            url: "https://nursync.super.site/homepage/learning-hub/health-assessment",
            title: "Health Assesment",
            aaa: "NP 1",
            sem: "Second Semester",
            progress: 0,
        },
        {
            level: 1,
            url: "https://nursync.super.site/homepage/learning-hub/fundamentals-of-nursing-practice",
            title: "Fundamentals of <br/> Nursing Practices",
            aaa: "NP 3",
            sem: "Second Semester",
            progress: 0,
        },
        //level 2
        {
            level: 2,
            url: "https://nursync.super.site/homepage/learning-hub/community-health-nursing",
            title: "Community Health <br/> Nursing",
            aaa: "NP 4",
            sem: "First Semester",
            progress: 0,
        },
        {
            level: 2,
            url: "https://nursync.super.site/homepage/learning-hub/nutrition-and-diet-therapy",
            title: "Nutrition and <br/> Diet Therapy",
            aaa: "NP 5",
            sem: "First Semester",
            progress: 0,
        },
        {
            level: 2,
            url: "https://nursync.super.site/homepage/learning-hub/pharmacology",
            title: "Pharmacology",
            aaa: "NP 6",
            sem: "First Semester",
            progress: 0,
        },
        {
            level: 2,
            url: "https://nursync.super.site/homepage/learning-hub/care-of-mother-child-adolescents-well-clients",
            title: "Care of <br/> Mother, Child, <br/> Adolescents (Well Client)",
            aaa: "NP 7",
            sem: "Second Semester",
            progress: 0,
        },
        {
            level: 2,
            url: "https://nursync.super.site/homepage/learning-hub/health-care-ethics-bioethics",
            title: "Health Care Ethics",
            aaa: "NP 8",
            sem: "First Semester",
            progress: 0,
        },
        {
            level: 2,
            url: "https://nursync.super.site/homepage/learning-hub/community-health-nursing-2-population-groups-and-community-as-clients",
            title: "Community Health <br/> Nursing 2 (Population Groups <br/> and Community as Clients)",
            aaa: "",
            sem: "Second Semester",
            progress: 0,
        },
        {
            level: 2,
            url: "https://nursync.super.site/homepage/learning-hub/care-of-mother-child-at-risk-or-with-problems",
            title: "Care of <br/> Mother, Child at <br/> Risk or With Problems",
            aaa: "",
            sem: "Second Semester",
            progress: 0,
        },
        {
            level: 2,
            url: "https://nursync.super.site/homepage/learning-hub/nursing-informatics",
            title: "Nursing Informatics",
            aaa: "",
            sem: "Second Semester",
            progress: 0,
        },
        //level 3
        {
            level: 3,
            url: "#",
            title: "Coming Soon",
            aaa: "...",
            sem: "...",
            progress: 0,
        },
        //level 4
        {
            level: 4,
            url: "#",
            title: "Coming Soon",
            aaa: "...",
            sem: "...",
            progress: 0,
        },
    ];

    const filtered =
        selectedLevel === "All"
            ? courses
            : courses.filter((c) => c.level === selectedLevel);

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#fff",
                color: "#000",
                fontFamily: "Segoe UI, sans-serif",
                padding: "40px 20px",
                boxSizing: "border-box",
            }}
        >
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <h1
                    className="txtgreen"
                    style={{
                        fontSize: "2rem",
                        fontWeight: 700,
                        textAlign: "center",
                        marginBottom: "1rem",
                    }}
                >
                    NurSYNC Learning Hub
                </h1>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginBottom: "2rem",
                    }}
                >
                    {["All", 1, 2, 3, 4].map((lvl) => (
                        <button
                            key={lvl}
                            onClick={() => setSelectedLevel(lvl as any)}
                            style={{
                                backgroundColor:
                                    selectedLevel === lvl ? "blue" : "green",
                                border: "1px solid #aaa",
                                color: "#fff",
                                borderRadius: "6px",
                                padding: "8px 16px",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                transition: "0.2s",
                            }}
                        >
                            {lvl === "All" ? "All Levels" : `Level ${lvl}`}
                        </button>
                    ))}
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {filtered.map((course, i) => (
                        <motion.a
                            href={course.url}
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            style={{
                                textDecoration: "none",
                                backgroundColor: "#eee",
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                                padding: "20px",
                                color: "#000",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                cursor: "pointer",
                            }}
                        >
                            <div>
                                <h2
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: 600,
                                        color: "#000",
                                        marginBottom: "10px",
                                    }}
                                    dangerouslySetInnerHTML={{ __html: course.title }}
                                ></h2>
                                <p style={{ fontSize: "0.9rem", color: "#333" }}>
                                    {course.sem}
                                </p>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: "10px",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "0.85rem",
                                        backgroundColor: "#aaa",
                                        padding: "3px 8px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                    }}
                                >
                                    {course.aaa || "N/A"}
                                </span>
                                <div
                                    style={{
                                        width: "60%",
                                        height: "6px",
                                        borderRadius: "4px",
                                        backgroundColor: "#777",
                                        overflow: "hidden",
                                    }}
                                >
                                    <motion.div
                                        style={{
                                            height: "100%",
                                            backgroundColor: "#238636",
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${course.progress}%` }}
                                        transition={{ duration: 1 }}
                                    ></motion.div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
}
