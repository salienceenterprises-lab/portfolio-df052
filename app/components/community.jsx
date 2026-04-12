"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1], delay },
});

export default function PortfolioCommunity({ data }) {
  const items = data?.community;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="community" style={{
      background: "#eeede9",
      padding: "3.5rem 3rem",
      borderBottom: "1px solid #ddddd8",
    }}>
      <style>{`
        @media(max-width:768px){ #community { padding: 2.5rem 1.5rem !important; } }
      `}</style>

      <motion.div {...fade(0)} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.28em", color: "#b0b0aa", margin: 0 }}>
          Community &amp; Impact
        </p>
        <div style={{ flex: 1, height: "1px", background: "#ddddd8" }} />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            {...fade(i * 0.05)}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              padding: "1.25rem 0",
              borderBottom: i < items.length - 1 ? "1px solid #e8e8e3" : "none",
              alignItems: "start",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a1a", margin: 0, letterSpacing: "-0.02em" }}>
                  {item.title || item.name || item.organization}
                </h3>
                {(item.role || item.type) && (
                  <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.14em", color: "#b0b0aa" }}>
                    {item.role || item.type}
                  </span>
                )}
              </div>
              {item.description && (
                <p style={{ fontSize: "12.5px", color: "#6a6a65", lineHeight: 1.7, margin: "0.4rem 0 0" }}>
                  {item.description}
                </p>
              )}
              {item.link && (
                <a
                  href={item.link} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    marginTop: "0.6rem",
                    fontSize: "9px", fontWeight: 500,
                    textTransform: "uppercase", letterSpacing: "0.18em",
                    color: "#b0b0aa", textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#1a1a1a"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#b0b0aa"}
                >
                  View <FaExternalLinkAlt size={8} />
                </a>
              )}
            </div>

            <div style={{ textAlign: "right", flexShrink: 0 }}>
              {item.year && (
                <span style={{ fontSize: "10px", color: "#b0b0aa", letterSpacing: "0.06em", display: "block" }}>
                  {item.year}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
