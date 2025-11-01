"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TypeScript Interfaces ---

interface Message {
  sender: 'AI' | 'User';
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

// Mock Data and Logic
let responseIndex = 0;
const mockResponses: string[] = [
  "Hello there! I'm an AI assistant designed to help with your Next.js and frontend questions. What challenge are you currently facing?",
  "That's a great question! For a robust data fetching strategy in Next.js, consider using SWR or React Query for client-side content, or Server Components for better performance.",
  "Framer Motion is superb for micro-interactions! If you want a smooth page transition, use the `<AnimatePresence>` component at the top level.",
  "I don't have enough context for that specific query, but I can talk all day about CSS, React, and build performance. Ask me anything technical!",
];

const getMockResponse = (): string => {
  const response = mockResponses[responseIndex % mockResponses.length];
  responseIndex++;
  return response;
};

// --- Custom Components & Animations ---

// 1. Typing Animation Component - REFACTORED to use direct animate/transition props
const TypingAnimation: React.FC<TypingAnimationProps> = ({ text }) => {
  const characters = text.split("");

  return (
    <div style={{ display: 'inline-block' }}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.01, // Quick animation duration
            delay: index * 0.02, // Stagger delay based on index
            type: "spring",
            stiffness: 500,
            damping: 40
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};


// 2. Loading Dots Component (for when AI is processing) - REFACTORED to use direct animate/transition props
const LoadingDots: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '1.25rem' }}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          // The animation uses keyframes directly in the 'animate' prop
          animate={{ y: ["0%", "-50%", "0%"] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2 // Stagger the dots using explicit delay
          }}
          style={{
            display: 'block',
            width: '0.5rem',
            height: '0.5rem',
            margin: '0 0.2rem',
            backgroundColor: '#fff',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
};


// 3. Message Bubble Component
const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isTyping }) => {
  const isBot = message.sender === 'AI';
  const bubbleStyle: React.CSSProperties = {
    maxWidth: '80%',
    padding: '0.75rem 1rem',
    borderRadius: '1.25rem',
    marginBottom: '0.6rem',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '0.9rem',
    lineHeight: '1.4',
    alignSelf: isBot ? 'flex-start' : 'flex-end',
    backgroundColor: isBot ? '#026e2c' : '#e0e0e0',
    color: isBot ? '#ffffff' : '#333333',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
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


// --- Main App Component ---
const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'AI', text: "Welcome! I'm your project assistant. How can I help you today?", id: Date.now() }
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Changed default to false (closed)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(prev => !prev);

  // Scroll to the bottom of the chat window on new message
  useEffect(() => {
    // Only scroll if the chat is open
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);


  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: string = input.trim();
    // 1. Add user message
    setMessages(prev => [...prev, { sender: 'User', text: userMessage, id: Date.now() }]);
    setInput('');

    // 2. Start typing indicator
    setIsTyping(true);

    // 3. Add temporary typing bubble (for visual continuity)
    const typingMessageId: number = Date.now() + 1;
    setMessages(prev => [...prev, { sender: 'AI', text: '', isTyping: true, id: typingMessageId }]);

    // Async IIFE to avoid an `async` component-level function
    (async () => {
      try {
        // 4. Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

        // 5. Generate and add AI response
        const aiResponseText = getMockResponse();

        // 6. Update the temporary typing bubble with the final response
        setMessages(prev => {
          const newMessages = prev.map(msg =>
            msg.id === typingMessageId ? { ...msg, text: aiResponseText, isTyping: false } : msg
          );
          return newMessages;
        });
      } catch (err) {
        console.error(err);
      } finally {
        // 7. Stop typing indicator
        setIsTyping(false);
      }
    })();
  };

  // NEW: Style for the outer fixed wrapper/widget
  const widgetWrapperStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // Aligns the chatbox and button to the right
  };

  // UPDATED: Style for the toggle button to support the "Chat AI" label
  const toggleButtonStyle: React.CSSProperties = {
    // Dynamic sizing based on isOpen
    width: isOpen ? '60px' : 'auto',
    minWidth: '60px',
    padding: isOpen ? '0' : '0 20px',
    height: '60px',
    borderRadius: '30px',
    backgroundColor: '#026e2c',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'background-color 0.2s, width 0.3s, padding 0.3s, margin-bottom 0.3s',
    marginBottom: isOpen ? '15px' : '0', // Spacer when chat is open
    flexShrink: 0,
  };

  // Main container styles: Size and shape, relative positioning
  const chatContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    maxHeight: '500px', // Limiting height for the fixed widget
    width: '100%',
    maxWidth: '380px', // Narrower width for the fixed widget
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#ffffff',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#026e2c',
    color: '#ffffff',
    padding: '1rem 1.5rem',
    fontSize: '1.25rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  const iconStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    fill: 'white',
    marginRight: isOpen ? '0' : '0.5rem' // Adjust icon margin based on open/closed state
  }

  const messagesBoxStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: '1.5rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    scrollBehavior: 'smooth',
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    padding: '1rem 1.5rem',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: '#ffffff',
  };

  // EDITED: inputStyle for light gray background (#f5f5f5)
  const inputStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: '0.75rem 1rem',
    borderRadius: '25px',
    border: '1px solid #cccccc',
    marginRight: '1rem',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
    backgroundColor: '#f5f5f5', // Set input background to light gray
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
    backgroundColor: isTyping ? '#a9a9a9' : '#026e2c',
    color: '#ffffff',
    border: 'none',
    cursor: isTyping ? 'not-allowed' : 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s, transform 0.1s',
  };

  return (
    <>
      <style>
        {`
                /* Basic reset */
                body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }

                /* --- SCROLLBAR HIDING --- */
                .aic-messages-box {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .aic-messages-box::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                    width: 0;
                    height: 0;
                }
                /* ------------------------ */

                /* Responsiveness for the main container: Full screen on mobile */
                @media (max-width: 768px) {
                    /* When the chat box is open, the parent wrapper needs to take over the screen */
                    .aic-widget-wrapper.is-open {
                        top: 0 !important;
                        z-index: 5;
                        left: 0 !important;
                        right: 0 !important;
                        bottom: 0 !important;
                        maxWidth: 100% !important;
                        height: 100% !important;
                        width: 100% !important;
                        margin: 0 !important;
                        align-items: center !important;
                        justify-content: flex-end !important; /* Keep chat at the bottom */
                        background: rgba(0, 0, 0, 0.2); /* Subtle overlay */
                        padding-bottom: 20px; /* Space from the bottom edge */
                    }
                    
                    /* The actual chat container maximizes itself */
                    .aic-widget-wrapper.is-open .aic-chat-container {
                        max-width: 95% !important;
                        max-height: 95% !important;
                        height: 95% !important;
                        width: 95% !important;
                        borderRadius: 12px !important;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25) !important;
                        margin-bottom: 0 !important;
                    }
                }

                /* Input focus style */
                .aic-input {
                    color: #111111;
                }
                .aic-input:focus {
                    border-color: #026e2c;
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(2, 110, 44, 0.2);
                }

                /* Button hover/active styles */
                .aic-button:not(:disabled):hover {
                    background-color: #014f1e;
                }
                .aic-button:not(:disabled):active {
                    transform: scale(0.98);
                }
                
                /* Toggle Button Hover/Active */
                .aic-toggle-button:hover {
                    background-color: #014f1e;
                }
                .aic-toggle-button:active {
                    transform: scale(0.98);
                }
            `}
      </style>

      {/* Outer fixed wrapper */}
      <div
        className={`aic-widget-wrapper ${isOpen ? 'is-open' : ''}`}
        style={widgetWrapperStyle}
      >
        {/* Toggle Button */}
        <motion.button
          onClick={handleToggle}
          className="aic-toggle-button"
          style={toggleButtonStyle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Display label only when closed */}
          {!isOpen && <span style={{ fontSize: '1rem', fontWeight: 600 }}>Chat AI</span>}

          {/* SVG Icon for Close (X) or Open (Comment) */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }} // Prevent icon from shrinking
          >
            {isOpen ? (
              // Close Icon (X)
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              // Open Icon (Message Circle)
              <path d="M21 11.5a8.38 8.38 0 0 1-5.17 7.23H12l-2.42 2.72c-.17.18-.42.27-.68.27-.26 0-.51-.09-.68-.27L6.17 19.73H3.5a1.5 1.5 0 0 1-1.5-1.5v-11.5a1.5 1.5 0 0 1 1.5-1.5h17a1.5 1.5 0 0 1 1.5 1.5v8z" />
            )}
          </svg>
        </motion.button>

        {/* Chat Container (conditionally rendered) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.2 }}
              className="aic-chat-container"
              style={chatContainerStyle}
            >

              <header style={headerStyle}>
                {/* AI Icon SVG */}
                <svg style={iconStyle} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.73-7h5.46a1 1 1 0 0 0 0-2H9.27a1 1 0 0 0 0 2zM12 7.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 14.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fillRule="evenodd" />
                </svg>
                Project Assistant
              </header>

              <div className="aic-messages-box" style={messagesBoxStyle}>
                {messages.map((msg, index) => (
                  <MessageBubble key={index} message={msg} isTyping={msg.isTyping || false} />
                ))}

                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="aic-form" style={formStyle}>
                <input
                  type="text"
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  placeholder="Ask me about Anything..."
                  disabled={isTyping}
                  className="aic-input"
                  style={inputStyle}
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="aic-button"
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

export default App;