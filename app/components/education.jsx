"use client";
import React from "react";
import { motion } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1], delay },
});

export default function PortfolioEducation({ data }) {
  const items = data?.education;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="education" style={{
      background: "#f5f5f2",
      padding: "3.5rem 3rem",
      borderBottom: "1px solid #ddddd8",
    }}>
      <style>{`
        @media(max-width:768px){ #education { padding: 2.5rem 1.5rem !important; } }
      `}</style>

      <motion.div {...fade(0)} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.28em", color: "#b0b0aa", margin: 0 }}>
          Education
        </p>
        <div style={{ flex: 1, height: "1px", background: "#ddddd8" }} />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((edu, i) => {
          const degree = edu.degree || edu.field || edu.title || "";
          const school = edu.institution || edu.school || "";
          const period = edu.period || edu.duration || edu.years || edu.year || "";
          const location = edu.location || "";
          const description = edu.description || "";
          const achievements = Array.isArray(edu.achievements) ? edu.achievements : [];

          return (
            <motion.div key={i} {...fade(i * 0.05)}
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
                    {degree}
                  </h3>
                  {school && (
                    <span style={{ fontSize: "12px", color: "#888880" }}>{school}</span>
                  )}
                </div>
                {description && (
                  <p style={{ fontSize: "12.5px", color: "#6a6a65", lineHeight: 1.65, margin: "0.5rem 0 0" }}>
                    {description}
                  </p>
                )}
                {achievements.length > 0 && (
                  <ul style={{ margin: "0.6rem 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    {achievements.map((a, j) => (
                      <li key={j} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                        <span style={{ color: "#c0c0bb", fontSize: "10px", marginTop: "3px", flexShrink: 0 }}>—</span>
                        <span style={{ fontSize: "12px", color: "#6a6a65", lineHeight: 1.55 }}>{a}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                {period && (
                  <span style={{ fontSize: "10px", color: "#b0b0aa", letterSpacing: "0.06em", display: "block" }}>
                    {period}
                  </span>
                )}
                {location && (
                  <span style={{ fontSize: "10px", color: "#c0c0bb", letterSpacing: "0.04em", display: "block", marginTop: "2px" }}>
                    {location}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
