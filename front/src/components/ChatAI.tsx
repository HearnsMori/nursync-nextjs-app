"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- TypeScript Interfaces ---
interface Message {
  sender: "AI" | "User";
  text: string;
  id: number;
  isTyping?: boolean;
}

interface TypingAnimationProps {
  text: string;
}

interface MessageBubbleProps {
  message: Message;
  isTyping: boolean;
}

// --- Typing Animation ---
const TypingAnimation: React.FC<TypingAnimationProps> = ({ text }) => {
  const characters = text.split("");
  return (
    <div style={{ display: "inline-block" }}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.01,
            delay: index * 0.02,
            type: "spring",
            stiffness: 500,
            damping: 40,
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

// --- Loading Dots ---
const LoadingDots: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", height: "1.25rem" }}>
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        animate={{ y: ["0%", "-50%", "0%"] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.2,
        }}
        style={{
          display: "block",
          width: "0.5rem",
          height: "0.5rem",
          margin: "0 0.2rem",
          backgroundColor: "#fff",
          borderRadius: "50%",
        }}
      />
    ))}
  </div>
);

// --- Message Bubble ---
const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isTyping }) => {
  const isBot = message.sender === "AI";
  const bubbleStyle: React.CSSProperties = {
    maxWidth: "84%",
    padding: "0.75rem 1rem",
    borderRadius: "1.25rem",
    marginBottom: "0.6rem",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    fontSize: "0.9rem",
    lineHeight: "1.4",
    alignSelf: isBot ? "flex-start" : "flex-end",
    backgroundColor: isBot ? "#026e2c" : "#e0e0e0",
    color: isBot ? "#ffffff" : "#333333",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={bubbleStyle}
    >
      {isBot && isTyping ? (
        <LoadingDots />
      ) : isBot && message.text ? (
        <TypingAnimation text={message.text} />
      ) : (
        message.text
      )}
    </motion.div>
  );
};

// --- Main Component ---
const NurSyncChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "AI",
      text: "Welcome! I'm your NurSYNC assistant. How can I help you today?",
      id: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // --- Handle Sending Message ---
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: string = input.trim();
    setMessages((prev) => [
      ...prev,
      { sender: "User", text: userMessage, id: Date.now() },
    ]);
    setInput("");
    setIsTyping(true);

    const typingMessageId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { sender: "AI", text: "", isTyping: true, id: typingMessageId },
    ]);

    try {
      const response = await fetch("https://nursync-backend.onrender.com/api/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await response.json();
      const aiResponse = data.msg || "Sorry, I couldn’t understand that.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessageId
            ? { ...msg, text: aiResponse, isTyping: false }
            : msg
        )
      );
    } catch (err) {
      console.error("Error fetching bot response:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessageId
            ? { ...msg, text: "⚠️ Error: Could not connect to server.", isTyping: false }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  // --- Inline Styles ---
  const widgetWrapperStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  };

  const toggleButtonStyle: React.CSSProperties = {
    width: isOpen ? "60px" : "auto",
    minWidth: "60px",
    padding: isOpen ? "0" : "0 20px",
    height: "60px",
    borderRadius: "30px",
    backgroundColor: "#026e2c",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background-color 0.2s, width 0.3s, padding 0.3s",
    marginBottom: isOpen ? "15px" : "0",
  };

  const chatContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    maxHeight: "500px",
    width: "100%",
    maxWidth: "380px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#ffffff",
  };

  const messagesBoxStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: "1.5rem",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    scrollBehavior: "smooth",
    textAlign: "left",
    wordWrap: "break-word",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    width: "100%",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    padding: "1rem 1.5rem",
    borderTop: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
  };

  const inputStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: "0.75rem 1rem",
    borderRadius: "25px",
    border: "1px solid #cccccc",
    marginRight: "1rem",
    fontSize: "1rem",
    color: "black",
    backgroundColor: "#f5f5f5",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "0.75rem 1.5rem",
    borderRadius: "25px",
    backgroundColor: isTyping ? "#a9a9a9" : "#026e2c",
    color: "#ffffff",
    border: "none",
    cursor: isTyping ? "not-allowed" : "pointer",
    fontWeight: 600,
  };

  return (
    <>
      <div style={widgetWrapperStyle}>
        <motion.button
          onClick={handleToggle}
          style={toggleButtonStyle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {!isOpen && (
            <span style={{ fontSize: "1rem", fontWeight: 600 }}>Chat AI</span>
          )}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M21 11.5a8.38 8.38 0 0 1-5.17 7.23H12l-2.42 2.72c-.17.18-.42.27-.68.27-.26 0-.51-.09-.68-.27L6.17 19.73H3.5a1.5 1.5 0 0 1-1.5-1.5v-11.5a1.5 1.5 0 0 1 1.5-1.5h17a1.5 1.5 0 0 1 1.5 1.5v8z" />
            )}
          </svg>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.2 }}
              style={chatContainerStyle}
            >
              <div style={messagesBoxStyle}>
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isTyping={msg.isTyping || false}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} style={formStyle}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isTyping}
                  style={inputStyle}
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  style={buttonStyle}
                >
                  Send
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NurSyncChat;