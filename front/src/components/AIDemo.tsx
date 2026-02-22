"use client";
import dbStorage from "@/utils/dbstorage";
import React, { useEffect, useState } from "react";

export default function GeminiChatPage() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [dots, setDots] = useState("");

    // Restore previous output
    useEffect(() => {
        const saved = localStorage.getItem("gemini_output");
        if (saved) {
            const output = document.getElementById("output");
            if (output) output.innerHTML = saved;
        }
    }, []);

    // Loading dots animation
    useEffect(() => {
        if (!loading) {
            setDots("");
            return;
        }
        const interval = setInterval(() => {
            setDots((d) => (d.length >= 3 ? "" : d + "."));
        }, 400);
        return () => clearInterval(interval);
    }, [loading]);

    async function sendMessage() {
        if (loading) return;              // 🔒 hard lock
        if (!input.trim()) return;

        setLoading(true);

        const context =
            "You are an html with inline css developer, you create web blog with aesthetic design that help with the nursing student to learn"
            + "Your response shall start as <div> code block ready to be insert."
            + "Don't add button just make it long scrollable design all information in one screen."
            + "Assume that you'll put it inside a div with display flex and 100% width."
            + "Add <div style='flex: 1;'></div>"
            + "No text, explanation, or other response, just the element."
            + "Make it aesthetic and laptop/desktop responsive design, inline css only no js. ";

        const outputInside = document.getElementById("output")?.innerHTML || "";

        try {
            const data = await dbStorage.aiTXTGenerator(
                context +
                "\nUser: " + input +
                "\nRevised (If have already existing code):" + outputInside,
                "You are an html with inline css developer, you create web blog with aesthetic design that help with the nursing student to learn"
            );

            let aiResponse = data?.msg?.trim() || "";

            // Strip markdown fences if any
            aiResponse = aiResponse
                .replace(/^```html?/i, "")
                .replace(/```$/i, "");

            const output = document.getElementById("output");
            if (output) {
                output.innerHTML = aiResponse;
                localStorage.setItem("gemini_output", aiResponse);
            }

        } catch (err) {
            console.error("Error:", err);
            alert("Error communicating with backend.");
        } finally {
            setInput("");
            setLoading(false);
        }
    }

    return (
        <div style={{
            display: "flex",
            width: "100%",
            minHeight: "100vh",
            background: "#f5f6f8",
        }}>
            {/* AI Output */}
            <div
                id="output"
                style={{
                    display: "flex",
                    width: "100%",
                    paddingBottom: "6vw",
                }}
            />

            {/* Fixed Input Bar */}
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "4.5vw",
                    minHeight: "64px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#eee",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 0 7px rgba(0,0,0,0.3)",
                    zIndex: 1,
                }}
            >
                <input
                    type="text"
                    placeholder={loading ? "Generating content..." : "Type your prompt..."}
                    value={input}
                    disabled={loading}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !loading) sendMessage();
                    }}
                    style={{
                        height: "3vw",
                        minHeight: "42px",
                        width: "72%",
                        borderRadius: "999px",
                        padding: "0 1.5vw",
                        border: "1px solid rgb(248, 248, 248)",
                        outline: "none",
                        background: "rgb(211, 211, 211)",
                        fontSize: "0.95vw",
                        color: "black",
                        opacity: loading ? 0.6 : 1,
                    }}
                />

                <button
                    onClick={sendMessage}
                    disabled={loading}
                    style={{
                        height: "3vw",
                        minHeight: "42px",
                        width: "6vw",
                        minWidth: "80px",
                        marginLeft: "1vw",
                        borderRadius: "999px",
                        border: "none",
                        background: loading ?  "rgb(237, 237, 237)" : "#026e2c",
                        color: "white",
                        cursor: loading ? "not-allowed" : "pointer",
                        fontWeight: 600,
                        transition: "all 0.2s ease",
                    }}
                >
                    {loading ? `Thinking${dots}` : "Send"}
                </button>
            </div>
        </div>
    );
}
