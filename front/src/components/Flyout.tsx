"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Brain, Bolt, Menu as MenuIcon } from "lucide-react";
import Image from "next/image"

export default function FlyoutNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path.split('/').pop() || 'none';
    }
    return 'none';
  });
  const navItems = [
    { icon: Home, label: "Learn", key: "home" },
    { icon: Brain, label: "AI Mode", key: "aimode" },
    { icon: Bolt, label: "Tools", key: "tools" },
  ];

  const sidebarStyle: React.CSSProperties = {
    height: "100vh",
    backgroundColor: "#eee",
    color: "black",
    display: "flex",
    position: "fixed",
    flexDirection: "column",
    boxShadow: "4px 0 15px rgba(0,0,0,0.3)",
    borderRight: "2px solid #eee",
    transition: "all 0.3s ease",
    overflow: "hidden",
    zIndex: 2,
    paddingLeft: '2px',
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    borderBottom: "1px solid #008f44",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: 600,
    color: "#026e2c",
  };

  const buttonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    marginLeft: "1vw",
    color: "#026e2c",
    cursor: "pointer",
    transition: "color 0.2s",
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    gap: "6px",
  };

  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: isOpen ? "flex-start" : "center",
    padding: "10px 16px",
    borderRadius: "8px",
    backgroundColor: isActive ? "rgba(0, 204, 102, 0.2)" : "transparent",
    color: isActive ? "#026e2c" : "#373737",
    border: isActive ? "1px solid #026e2c" : "1px solid transparent",
    cursor: "pointer",
    transition: "all 0.25s ease",
  });

  const labelStyle: React.CSSProperties = {
    marginLeft: "12px",
    fontSize: "15px",
    whiteSpace: "nowrap",
    transition: "opacity 0.3s ease",
  };

  return (
    <motion.aside
      animate={{ width: isOpen ? 230 : 80 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      style={sidebarStyle}
    >
      {/* Header */}
      <div style={headerStyle}>
        {isOpen && <h1 style={titleStyle}>Menu</h1>}
        <button style={buttonStyle} onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon size={22} />
        </button>
      </div>

      {/* Navigation */}
      <nav style={navStyle}>
        {navItems.map(({ icon: Icon, label, key }) => (
          <motion.div
            key={key}
            suppressHydrationWarning={true} // Add this line
            style={navItemStyle(active === key)}
            whileHover={{
              backgroundColor: "rgba(127, 231, 167, 0.15)",
              scale: 1.03,
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setActive(key); window.location.href = `../${key}` }}
          >
            <Icon size={26} />
            {isOpen && <span style={labelStyle}>{label}</span>}
          </motion.div>
        ))}
          <motion.div
            key={"profile"}
            suppressHydrationWarning={true} // Add this line
            style={navItemStyle(active === "me")}
            whileHover={{
              backgroundColor: "rgba(127, 231, 167, 0.15)",
              scale: 1.03,
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setActive("me"); window.location.href = `../me` }}
          >
            <Image alt="profile picture" height={300} width={300} src="/default.jpeg"
            style={{
              height: '3vw',
              width: '3vw',
              borderRadius: '50%',
              border: '1px green'
            }}/>
            {isOpen && <span style={labelStyle}>Profile</span>}
          </motion.div>
      </nav>
    </motion.aside>
  );
}
