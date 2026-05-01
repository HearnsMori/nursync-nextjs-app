"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, Bot, User } from "lucide-react";
import coreApi from "@/utils/coreApi";

// ---------------- TYPES ----------------
interface Message {
  sender: "AI" | "User";
  text: string;
  id: number;
}

// ---------------- TRUE TYPING EFFECT ----------------
const TypingText: React.FC<{ text: string }> = ({ text }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 15); // speed

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
};

// ---------------- MESSAGE ----------------
const MessageBubble = ({ msg }: { msg: Message }) => {
  const isBot = msg.sender === "AI";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        justifyContent: isBot ? "flex-start" : "flex-end",
      }}
    >
      {isBot && <Bot size={18} color="#22c55e" />}

      <div
        style={{
          maxWidth: "75%",
          padding: "10px 14px",
          borderRadius: "16px",
          background: isBot
            ? "linear-gradient(135deg, #16a34a, #22c55e)"
            : "#e5e7eb",
          color: isBot ? "#fff" : "#111",
          fontSize: "0.9rem",
        }}
      >
        {isBot ? <TypingText text={msg.text} /> : msg.text}
      </div>

      {!isBot && <User size={18} />}
    </motion.div>
  );
};

// ---------------- MAIN ----------------
export default function NurSyncChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "AI",
      text: "Hi! I'm your NurSYNC assistant 👩‍⚕️ Ask me anything.",
      id: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ---------------- SEND ----------------
  const handleSend = async (e: any) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { sender: "User", text: userText, id: Date.now() },
    ]);

    setIsTyping(true);

    try {
      const res = await coreApi.generateTxt(
        userText,
        "You are a helpful nursing assistant AI."
      );

      const reply = res?.message || "No response";

      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: reply, id: Date.now() + 1 },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "⚠️ Error connecting to server.",
          id: Date.now() + 1,
        },
      ]);
    }

    setIsTyping(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 999,
      }}
    >
      {/* TOGGLE BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        style={{
          background: "#16a34a",
          color: "#fff",
          borderRadius: "50%",
          width: 60,
          height: 60,
          border: "none",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          cursor: "pointer",
        }}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>

      {/* CHAT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            style={{
              width: 360,
              height: 520,
              marginTop: 10,
              borderRadius: 20,
              overflow: "hidden",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                padding: "12px",
                background: "linear-gradient(135deg,#16a34a,#22c55e)",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              NurSYNC AI
            </div>

            {/* MESSAGES */}
            <div
              style={{
                flex: 1,
                padding: 12,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} msg={m} />
              ))}

              {isTyping && (
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  style={{ fontSize: 12, color: "#666" }}
                >
                  AI is typing...
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <form
              onSubmit={handleSend}
              style={{
                display: "flex",
                padding: 10,
                gap: 8,
                borderTop: "1px solid #eee",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                style={{
                  flex: 1,
                  borderRadius: 20,
                  border: "1px solid #aaa",
                  background: "#eee",
                  color: "black",
                  padding: "10px 14px",
                  outline: "none",
                }}
              />

              <button
                type="submit"
                disabled={isTyping}
                style={{
                  background: "#16a34a",
                  border: "none",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  cursor: "pointer",
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}