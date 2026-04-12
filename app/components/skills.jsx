"use client";
import React from "react";
import { motion } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1], delay },
});

export default function PortfolioSkills({ data }) {
  const raw = data?.skills || [];
  if (!raw.length) return null;

  const isGrouped = raw.some((s) => typeof s === "object" && s.items);
  const groups = isGrouped
    ? raw.map((g) => ({
        label: g.category || g.name || "Skills",
        items: (g.items || []).map((i) => (typeof i === "string" ? i : i?.name || String(i))),
      }))
    : [{ label: null, items: raw.map((s) => (typeof s === "string" ? s : s?.name || String(s))) }];

  return (
    <section id="skills" style={{
      background: "#f5f5f2",
      padding: "3.5rem 3rem",
      borderBottom: "1px solid #ddddd8",
    }}>
      <style>{`
        @media(max-width:768px){ #skills { padding: 2.5rem 1.5rem !important; } }
      `}</style>

      <motion.div {...fade(0)} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.28em", color: "#b0b0aa", margin: 0 }}>
          Skills
        </p>
        <div style={{ flex: 1, height: "1px", background: "#ddddd8" }} />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {groups.map((group, gi) => (
          <motion.div key={gi} {...fade(gi * 0.04)}>
            {group.label && (
              <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.22em", color: "#b0b0aa", margin: "0 0 0.6rem" }}>
                {group.label}
              </p>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {group.items.map((skill, si) => (
                <motion.span
                  key={si}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: si * 0.03 }}
                  style={{
                    fontSize: "11px", fontWeight: 500, color: "#555550",
                    padding: "5px 12px", border: "1px solid #ddddd8",
                    letterSpacing: "0.04em", background: "#f5f5f2",
                    transition: "all 0.15s ease", cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#f5f5f2"; e.currentTarget.style.borderColor = "#1a1a1a"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#f5f5f2"; e.currentTarget.style.color = "#555550"; e.currentTarget.style.borderColor = "#ddddd8"; }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
