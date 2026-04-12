"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1], delay },
});

export default function PortfolioProjects({ data }) {
  const items = data?.projects;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="projects" style={{
      background: "#eeede9",
      padding: "3.5rem 3rem",
      borderBottom: "1px solid #ddddd8",
    }}>
      <style>{`
        @media(max-width:768px){
          #projects { padding: 2.5rem 1.5rem !important; }
          .at-proj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <motion.div {...fade(0)} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.28em", color: "#b0b0aa", margin: 0 }}>
          Selected Work
        </p>
        <div style={{ flex: 1, height: "1px", background: "#ddddd8" }} />
      </motion.div>

      <div className="at-proj-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1px",
        background: "#ddddd8",
        border: "1px solid #ddddd8",
      }}>
        {items.map((proj, i) => {
          const stack = Array.isArray(proj.stack) ? proj.stack
            : Array.isArray(proj.tech) ? proj.tech
            : Array.isArray(proj.technologies) ? proj.technologies
            : Array.isArray(proj.tags) ? proj.tags : [];
          const liveUrl = proj.live || proj.url || proj.link || proj.demo || "";
          const isLastOdd = items.length % 2 !== 0 && i === items.length - 1;

          return (
            <motion.div key={i} {...fade(i * 0.05)}
              style={{
                background: "#eeede9",
                display: "flex", flexDirection: "column",
                ...(isLastOdd ? { gridColumn: "1 / -1" } : {}),
              }}
            >
              {/* Aspect-ratio image */}
              {proj.imageBase64 && (
                <div style={{ width: "100%", paddingTop: "52%", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={proj.imageBase64}
                    alt={proj.title || "Project"}
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center top",
                      display: "block",
                      filter: "brightness(0.97) saturate(0.9)",
                    }}
                  />
                </div>
              )}

              <div style={{ padding: "1.75rem 2rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                  <div>
                    <span style={{ fontSize: "9px", color: "#c0c0bb", letterSpacing: "0.08em", display: "block", marginBottom: "0.35rem" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a1a", margin: 0, letterSpacing: "-0.02em" }}>
                      {proj.title || "Untitled"}
                    </h3>
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexShrink: 0, paddingTop: "2px" }}>
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#c0c0bb", transition: "color 0.2s", textDecoration: "none" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#1a1a1a"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#c0c0bb"}>
                        <FaGithub size={13} />
                      </a>
                    )}
                    {liveUrl && (
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#c0c0bb", transition: "color 0.2s", textDecoration: "none" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#1a1a1a"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#c0c0bb"}>
                        <FaExternalLinkAlt size={11} />
                      </a>
                    )}
                  </div>
                </div>

                {proj.description && (
                  <p style={{ fontSize: "12.5px", color: "#6a6a65", lineHeight: 1.7, margin: 0 }}>
                    {proj.description}
                  </p>
                )}

                {stack.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "auto", paddingTop: "0.5rem" }}>
                    {stack.map((t, j) => {
                      const label = typeof t === "string" ? t : t?.name || t?.label || String(t);
                      return (
                        <span key={j} style={{
                          fontSize: "9px", fontWeight: 500, color: "#888880",
                          padding: "2px 8px", border: "1px solid #ddddd8", letterSpacing: "0.04em",
                        }}>{label}</span>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
