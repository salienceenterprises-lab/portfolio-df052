"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1], delay },
});

export default function PortfolioExperience({ data }) {
  const items = data?.experience;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const [open, setOpen] = useState(0);

  return (
    <section id="experience" style={{
      background: "#eeede9",
      padding: "3.5rem 3rem",
      borderBottom: "1px solid #ddddd8",
    }}>
      <style>{`
        @media(max-width:768px){ #experience { padding: 2.5rem 1.5rem !important; } }
        .at-exp-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 1.5rem;
        }
        .at-exp-meta {
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
          min-width: 0;
        }
        .at-exp-role {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: -0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .at-exp-company {
          font-size: 12px;
          color: #888880;
          white-space: nowrap;
        }
        .at-exp-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-shrink: 0;
        }
        .at-exp-period {
          font-size: 10px;
          color: #b0b0aa;
          letter-spacing: 0.06em;
        }
        .at-exp-body {
          padding-bottom: 1.5rem;
          padding-left: 2.5rem;
        }
        @media (max-width: 768px) {
          .at-exp-row { gap: 0.75rem; }
          .at-exp-meta { flex-direction: column; align-items: flex-start; gap: 0.2rem; }
          .at-exp-role { white-space: normal; overflow: visible; text-overflow: unset; font-size: 14px; }
          .at-exp-company { white-space: normal; font-size: 11px; }
          .at-exp-right { gap: 0.75rem; }
          .at-exp-period { font-size: 9px; }
          .at-exp-body { padding-left: 0; }
        }
      `}</style>

      <motion.div {...fade(0)} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.28em", color: "#b0b0aa", margin: 0 }}>
          Experience
        </p>
        <div style={{ flex: 1, height: "1px", background: "#ddddd8" }} />
      </motion.div>

      <div>
        {items.map((job, i) => {
          const isOpen = open === i;
          const period = job.period || job.duration || job.years || "";
          const role = job.role || job.title || job.position || "";
          const company = job.company || job.employer || job.organization || "";
          const highlights = Array.isArray(job.highlights) ? job.highlights
            : Array.isArray(job.responsibilities) ? job.responsibilities
            : Array.isArray(job.bullets) ? job.bullets : [];
          const description = job.description || "";
          const stack = Array.isArray(job.stack) ? job.stack
            : Array.isArray(job.tech) ? job.tech
            : Array.isArray(job.tags) ? job.tags : [];

          return (
            <motion.div key={i} {...fade(i * 0.04)} style={{ borderBottom: "1px solid #ddddd8" }}>
              {/* Row header — always visible */}
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  width: "100%", background: "none", border: "none",
                  padding: "1.1rem 0", cursor: "pointer", textAlign: "left",
                }}
                className="at-exp-row"
              >
                <div className="at-exp-meta">
                  <span style={{ fontSize: "9px", color: "#c0c0bb", letterSpacing: "0.08em", flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="at-exp-role">{role}</span>
                  {company && <span className="at-exp-company">{company}</span>}
                </div>
                <div className="at-exp-right">
                  {period && <span className="at-exp-period">{period}</span>}
                  <span style={{
                    fontSize: "14px", color: "#b0b0aa", lineHeight: 1,
                    transform: isOpen ? "rotate(45deg)" : "none",
                    transition: "transform 0.2s ease", display: "inline-block",
                  }}>+</span>
                </div>
              </button>

              {/* Expandable detail */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="at-exp-body">
                      {description && (
                        <p style={{ fontSize: "13px", color: "#6a6a65", lineHeight: 1.75, margin: "0 0 1rem" }}>
                          {description}
                        </p>
                      )}
                      {highlights.length > 0 && (
                        <ul style={{ margin: "0 0 1rem", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          {highlights.map((h, j) => (
                            <li key={j} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                              <span style={{ color: "#c0c0bb", fontSize: "10px", marginTop: "3px", flexShrink: 0 }}>—</span>
                              <span style={{ fontSize: "13px", color: "#6a6a65", lineHeight: 1.65 }}>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {stack.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                          {stack.map((t, j) => {
                            const label = typeof t === "string" ? t : t?.name || t?.label || String(t);
                            return (
                              <span key={j} style={{
                                fontSize: "9.5px", fontWeight: 500, color: "#888880",
                                padding: "2px 8px", border: "1px solid #ddddd8", letterSpacing: "0.04em",
                              }}>{label}</span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
