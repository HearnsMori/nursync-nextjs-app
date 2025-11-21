"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

//utils
import dbStorage from "@/utils/dbstorage";

interface Course {
  level: number;
  url: string;
  title: string;
  aaa: string;
  sem: string;
  progress: number;
}

export default function NurSyncCourses() {
  const token = localStorage.getItem('token');
  const [selectedLevel, setSelectedLevel] = useState<number | "All">(1);
  const [isCourseOpen, setIsCourseOpen] = useState<boolean>(false);
  const [courseUrl, setCourseUrl] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const baseCourses: Course[] = [
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
  var userId : string;
  // --- Initialization ---
  useEffect(() => {
    
    loadCourseProgress();
  }, []);

  const loadCourseProgress = async () => {
    // Load stored progress
    const user = await dbStorage.readId();
    if(!user || !user.id) return
    userId = user.id;
    if(!userId) return;
    const stored = await dbStorage.getItem(
      'nursync',
      'course',
      userId,
      ['url', 'progress'],
      null
    );
    Object.values(stored).forEach((p: any) => {
      alert(p?.nursync?.['course'+token]?.url);
      const course = baseCourses.find((c: any) => c.url === p?.nursync?.['course'+token]?.url);
      if (course) {
        course.progress = p?.nursync?.['course'+token]?.progress;
        alert(course.progress);
      }
    });
    setCourses(baseCourses);
  };

  const filtered =
    selectedLevel === "All"
      ? courses
      : courses.filter((c) => c.level === selectedLevel);

  // --- Timer Logic ---
  useEffect(() => {
    saveEverySec();
  }, [isCourseOpen, courseUrl]);

  const saveEverySec = async () => {
    let interval: any;

    if (isCourseOpen && courseUrl) {
      const startTime = Date.now();
      const targetCourseIndex = courses.findIndex((c) => c.url === courseUrl);

      interval = setInterval(() => {
        setCourses((prev) => {
          const updated = [...prev];
          const course = updated[targetCourseIndex];
          if (!course) return prev;

          // progress over 1 hour
          const elapsedMs = Date.now() - startTime;
          const progress = Math.min((elapsedMs / 3600000) * 100, 100);
          course.progress = progress;

          saveProgress(course.url, course.progress);

          return [...updated];
        });
      }, 10000);
    }

    return () => clearInterval(interval);
  };

  const saveProgress = async (url: string, progress: number) => {
    if(!userId) return;

    const res = await dbStorage.setItem(
      'nursync',
      'course',
      userId,
      ['url', 'progress'],
      [url, progress]
    );
  };

  const handleCourseClick = (url: string) => {
    setCourseUrl(url);
    setIsCourseOpen(true);
  };

  return (
    <div
      style={{
        position: "relative",
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
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "1rem",
            color: "#238636",
          }}
        >
          Learning Hub
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
                backgroundColor: selectedLevel === lvl ? "#005b2a" : "#238636",
                border: "none",
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
              onClick={() => handleCourseClick(course.url)}
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                textDecoration: "none",
                backgroundColor: "#f7f7f7",
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
                <p style={{ fontSize: "0.9rem", color: "#333" }}>{course.sem}</p>
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
                    backgroundColor: "#ccc",
                    padding: "3px 8px",
                    borderRadius: "5px",
                  }}
                >
                  {course.aaa || "N/A"}
                </span>
                <div
                  style={{
                    width: "60%",
                    height: "6px",
                    borderRadius: "4px",
                    backgroundColor: "#ddd",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    style={{
                      height: "100%",
                      backgroundColor: "#238636",
                    }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {isCourseOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            zIndex: 1000,
            background: "#fff",
          }}
        >
          <div
            style={{
              position: "fixed",
              top: "5vw",
              left: "2vw",
              height: "3vw",
              width: "3vw",
              cursor: "pointer",
            }}
            onClick={() => setIsCourseOpen(false)}
          >
            <svg
              width="3vw"
              height="3vw"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z"
                fill="#238636"
              />
            </svg>
          </div>
          <iframe
            src={courseUrl}
            style={{
              height: "100%",
              width: "100%",
              border: "none",
            }}
          />
        </div>
      )}
    </div>
  );
}
