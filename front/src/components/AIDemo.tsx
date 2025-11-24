"use client";
import React, { useState } from "react";

export default function GeminiChatPage() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    async function sendMessage() {
        if (!input.trim()) return;
        setLoading(true);

        const context =
            "Your response shall start with <div>, code only. Add 100vw and background color inline css. No text, explnation, or other response, just div element. Make it aesthetic and laptop/desktop responsive design, inline css/js only. ";
        const outputInside = document.getElementById("output")?.innerHTML;
        const fullPrompt = `${context}\n ${input} \n Existing Code (when sending send all new updated code): ${outputInside}`;

        try {
            const res = await fetch("https://nursync-backend.onrender.com/api/bot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: fullPrompt }),
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
                    // ...existing code...
                    output.innerHTML = aiResponse;
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
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vw',
            background: 'white',
        }}>
            {/* Empty div for inserted Gemini/AI response */}
            <div id="output" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'top',
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