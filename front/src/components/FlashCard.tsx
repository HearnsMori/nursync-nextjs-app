"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Flashcard {
    term: string;
    definition: string;
}

interface Group {
    name: string;
    cards: Flashcard[];
}

// Default groups for nursing students
const defaultGroups: Group[] = [
    {
        name: "Nursing Informatics",
        cards: [
            { term: "What is Nursing Informatics?", definition: "Combines nursing science, computer science, and information science to manage and communicate data, information, and knowledge in nursing practice." },
            { term: "Benefits of Nursing Informatics?", definition: "Improves patient care, enhances communication, streamlines documentation, and supports evidence-based practice." },
            { term: "Example tools?", definition: "EHRs, Clinical Decision Support Systems, and mobile health apps." },
            { term: "Data Security Importance", definition: "Ensures patient information confidentiality, integrity, and availability." },
            { term: "Telehealth", definition: "Delivery of healthcare services using telecommunication technology." },
            { term: "Nursing Knowledge Management", definition: "Processes for capturing, storing, and sharing nursing knowledge." },
            { term: "Clinical Decision Support", definition: "Systems that provide evidence-based knowledge to aid decision-making in patient care." },
        ],
    },
    {
        name: "Patient Care Basics",
        cards: [
            { term: "Hand hygiene", definition: "Washing hands to prevent infection." },
            { term: "Vital signs", definition: "Measurement of temperature, pulse, respiration, and blood pressure." },
            { term: "Patient positioning", definition: "Correct positioning to prevent pressure injuries and facilitate care." },
            { term: "Medication administration", definition: "Process of giving medications safely and accurately." },
            { term: "Pain assessment", definition: "Evaluation of patient pain using scales and observations." },
            { term: "Infection control", definition: "Practices to prevent the spread of infectious agents." },
            { term: "Patient hygiene", definition: "Assisting patients in personal care for comfort and health." },
            { term: "Mobility assistance", definition: "Helping patients move safely to prevent falls and maintain function." },
            { term: "Patient communication", definition: "Clear and compassionate communication with patients." },
            { term: "Nutrition management", definition: "Providing dietary support according to patient needs." },
            { term: "Documentation", definition: "Accurate recording of patient care and observations." },
        ],
    },
    {
        name: "Pharmacology Basics",
        cards: [
            { term: "Drug classification", definition: "Categorization of drugs based on their effects on the body." },
            { term: "Routes of administration", definition: "Oral, IV, IM, subcutaneous, topical, and others." },
            { term: "Adverse drug reactions", definition: "Unexpected or harmful responses to medications." },
        ],
    },
];


export default function FlashcardApp() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
    const [flipped, setFlipped] = useState<boolean>(false);
    const [tutorialVisible, setTutorialVisible] = useState<boolean>(true);

    // Load groups from localStorage or default
    useEffect(() => {
        const stored = localStorage.getItem("flashcardGroups");
        if (stored) {
            setGroups(JSON.parse(stored));
        } else {
            setGroups(defaultGroups);
            localStorage.setItem("flashcardGroups", JSON.stringify(defaultGroups));
        }
    }, []);

    // Inside your component, add these functions:

    // Delete a single flashcard from selected group
    const deleteCard = (index: number) => {
        if (!selectedGroup) return;
        const updatedCards = selectedGroup.cards.filter((_, i) => i !== index);
        const updatedGroups = groups.map((g) =>
            g.name === selectedGroup.name ? { ...g, cards: updatedCards } : g
        );
        saveGroups(updatedGroups);
        setSelectedGroup({ ...selectedGroup, cards: updatedCards });
        setCurrentCardIndex((prev) => (prev >= updatedCards.length ? updatedCards.length - 1 : prev));
    };

    // Delete a whole group
    const deleteGroup = (groupName: string) => {
        if (!confirm(`Are you sure you want to delete the group "${groupName}"?`)) return;
        const updatedGroups = groups.filter((g) => g.name !== groupName);
        saveGroups(updatedGroups);
        if (selectedGroup?.name === groupName) setSelectedGroup(null);
    };


    const saveGroups = (newGroups: Group[]) => {
        setGroups(newGroups);
        localStorage.setItem("flashcardGroups", JSON.stringify(newGroups));
    };

    const createGroup = () => {
        const name = prompt("Enter new group name:");
        if (!name) return;
        const newGroup: Group = { name, cards: [] };
        saveGroups([...groups, newGroup]);
    };

    const addCardToGroup = (groupName: string) => {
        const term = prompt("Enter term:");
        const definition = prompt("Enter definition:");
        if (!term || !definition) return;
        const newGroups = groups.map((g) =>
            g.name === groupName ? { ...g, cards: [...g.cards, { term, definition }] } : g
        );
        saveGroups(newGroups);
    };

    const nextCard = () => {
        if (!selectedGroup || !selectedGroup.cards) return;
        setFlipped(false);
        setCurrentCardIndex((prev) =>
            prev < selectedGroup.cards.length - 1 ? prev + 1 : prev
        );
    };

    const prevCard = () => {
        if (!selectedGroup || !selectedGroup.cards) return;
        setFlipped(false);
        setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const tapCard = () => setFlipped((prev) => !prev);

    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "sans-serif",
                maxWidth: "800px",
                margin: "auto",
                backgroundColor: "white",
                color: "black",
            }}
        >
            {/* Tutorial */}
            <AnimatePresence>
                {tutorialVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        style={{
                            background: "#e0ffe0",
                            padding: "20px",
                            borderRadius: "10px",
                            marginBottom: "20px",
                            textAlign: "center",
                            color: "green",
                        }}
                    >
                        Tap on a flashcard to reveal the definition. Click arrows to navigate.
                        <button
                            onClick={() => setTutorialVisible(false)}
                            style={{
                                marginLeft: "10px",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Got it!
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {!selectedGroup ? (
                <div>
                    <h2 style={{ marginBottom: "20px", color: "green" }}>Flashcard Groups</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {groups.map((g) => (
                            <motion.div
                                key={g.name}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: "#fff",
                                    border: "2px solid green",
                                    borderRadius: "10px",
                                    padding: "10px 20px",
                                    minWidth: "150px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    boxShadow: "0 5px 10px rgba(0,128,0,0.2)",
                                    color: "black",
                                }}
                                onClick={() => {
                                    setSelectedGroup(g);
                                    setCurrentCardIndex(0);
                                    setFlipped(false);
                                }}
                            >
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{g.name}</div>
                                <div>{g.cards?.length ?? 0} cards</div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addCardToGroup(g.name);
                                    }}
                                    style={{
                                        marginTop: "5px",
                                        padding: "5px 10px",
                                        fontSize: "0.9rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    + Add Card
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteGroup(g.name);
                                    }}
                                    style={{
                                        marginTop: "5px",
                                        padding: "5px 10px",
                                        fontSize: "0.9rem",
                                        cursor: "pointer",
                                        color: "red",
                                        border: "1px solid red",
                                        borderRadius: "5px",
                                        background: "white",
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                    }}
                                >
                                    Delete Group
                                </button>
                            </motion.div>
                        ))}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={createGroup}
                            style={{
                                background: "#f0f0f0",
                                border: "2px dashed #aaa",
                                borderRadius: "10px",
                                padding: "20px",
                                minWidth: "150px",
                                textAlign: "center",
                                cursor: "pointer",
                                fontWeight: "bold",
                                color: "black",
                            }}
                        >
                            + Create New Group
                        </motion.div>
                    </div>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => setSelectedGroup(null)}
                        style={{ marginBottom: "20px", padding: "5px 10px", cursor: "pointer" }}
                    >
                        ← Back to Groups
                    </button>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <h3 style={{ color: "green" }}>{selectedGroup.name}</h3>
                        <div>
                            {selectedGroup.cards?.length
                                ? currentCardIndex + 1
                                : 0}{" "}
                            / {selectedGroup.cards?.length ?? 0}
                        </div>
                    </div>
                    <AnimatePresence mode="wait">
                        {selectedGroup.cards && selectedGroup.cards.length > 0 && (
                            <motion.div
                                key={currentCardIndex}
                                layout
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                style={{
                                    background: "#fff",
                                    borderRadius: "10px",
                                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                                    padding: "50px",
                                    fontSize: "1.5rem",
                                    minHeight: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    color: flipped ? "green" : "black",
                                    textAlign: "center",
                                }}
                                onClick={tapCard}
                            >
                                <div>
                                    {flipped
                                        ? selectedGroup.cards[currentCardIndex].definition
                                        : selectedGroup.cards[currentCardIndex].term}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteCard(currentCardIndex);
                                    }}
                                    style={{
                                        marginTop: "15px",
                                        padding: "5px 10px",
                                        fontSize: "0.9rem",
                                        cursor: "pointer",
                                        color: "red",
                                        border: "1px solid red",
                                        borderRadius: "5px",
                                        background: "white",
                                    }}
                                >
                                    Delete Card
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <button
                            onClick={prevCard}
                            style={{ marginRight: "20px", padding: "5px 10px", cursor: "pointer" }}
                        >
                            ←
                        </button>
                        <button onClick={nextCard} style={{ padding: "5px 10px", cursor: "pointer" }}>
                            →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}
