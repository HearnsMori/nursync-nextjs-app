"use client";
import React, { useEffect, useState } from "react";

export default function GeminiChatPage() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("gemini_output");
        if (saved) {
            const output = document.getElementById("output");
            if (output) output.innerHTML = saved;
        }
    }, []);

    async function sendMessage() {
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
        const outputInside = document.getElementById("output")?.innerHTML;

        try {
            const res = await fetch("https://generative-ai-3ixm.onrender.com/chat/gemini/3", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ msg: input, system: context + outputInside }),
            });

            if (!res.ok) {
                throw new Error(`Server returned ${res.status}`);
            }

            const data = await res.json();
            const aiResponse = data?.msg?.trim() || "";
            console.log(aiResponse);
            // Validate response: must start with < and end with >
            if (true) {
                const output = document.getElementById("output");

                if (output) {

                    let aiResponse = data?.msg?.trim() || "";

                    // Remove markdown code block markers if present
                    aiResponse = aiResponse.replace(/^```html?/, '').replace(/```$/, '');

                    console.log(aiResponse);
                    output.innerHTML = aiResponse;
                    localStorage.setItem("gemini_output", aiResponse);

                }
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
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'left',
            width: '100%',
            height: '100vw',

        }}>
            {/* Empty div for inserted Gemini/AI response */}
            <div id="output" style={{
                display: 'flex',
                width: '100%',
            }}></div>

            {/* Fixed chat bar */}
            <div style={{

            }}>
                <div style={{
                    height: '4vw',
                    width: '100%',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#aaa',
                }}>
                    <input
                        type="text"
                        placeholder="Type your prompt..."
                        style={{
                            height: '3vw',
                            width: '73%',
                            background: 'white',
                            borderRadius: '1vw',
                            paddingLeft: '2vw',
                            border: 'none',
                            marginRight: '1vw',
                            color: 'black',
                        }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        style={{
                            color: 'black',
                            background: 'white',
                            height: '3vw',
                            width: '5vw',
                        }}
                    >
                        {loading ? "..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
}