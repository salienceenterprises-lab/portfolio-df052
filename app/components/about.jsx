"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1], delay },
});

export default function PortfolioAbout({ data }) {
  if (!data) return null;

  const infoRows = [
    { label: "Location", value: data.location,  link: null,                  icon: <FaMapMarkerAlt size={10} /> },
    { label: "Email",    value: data.email,      link: `mailto:${data.email}`, icon: <FaEnvelope size={10} /> },
    { label: "GitHub",   value: data.github ? "@" + data.github.split("/").pop() : null, link: data.github, icon: <FaGithub size={10} /> },
    { label: "LinkedIn", value: data.linkedin ? "LinkedIn" : null, link: data.linkedin, icon: <FaLinkedin size={10} /> },
    { label: "Website",  value: data.website,   link: data.website,           icon: <FaGlobe size={10} /> },
  ].filter((r) => r.value);

  const skills = data?.skills || [];
  const flatSkills = skills.flatMap?.((s) => typeof s === "object" && s.items ? s.items : [s]) || skills;

  return (
    <section id="about" style={{
      background: "#f5f5f2",
      padding: "3.5rem 3rem",
      borderBottom: "1px solid #ddddd8",
    }}>
      <style>{`
        @media(max-width:768px){
          #about { padding: 2.5rem 1.5rem !important; }
          .at-about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>

      {/* Section label */}
      <motion.div {...fade(0)} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.28em", color: "#b0b0aa", margin: 0 }}>
          About
        </p>
        <div style={{ flex: 1, height: "1px", background: "#ddddd8" }} />
      </motion.div>

      <div className="at-about-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "4rem", alignItems: "start" }}>
        {/* Left: bio + skills */}
        <motion.div {...fade(0.05)}>
          {data.bio && (
            <p style={{
              fontSize: "15px", fontWeight: 400, lineHeight: 1.75,
              color: "#3a3a37", marginBottom: flatSkills.length > 0 ? "2rem" : 0,
            }}>
              {data.bio}
            </p>
          )}

          {flatSkills.length > 0 && (
            <div>
              <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.22em", color: "#b0b0aa", margin: "0 0 0.85rem" }}>
                Skills
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {flatSkills.map((s, i) => {
                  const label = typeof s === "string" ? s : s?.name || String(s);
                  return (
                    <span key={i} style={{
                      fontSize: "10px", fontWeight: 500, color: "#555550",
                      padding: "4px 10px", border: "1px solid #ddddd8",
                      letterSpacing: "0.04em",
                    }}>{label}</span>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Right: contact info */}
        {infoRows.length > 0 && (
          <motion.div {...fade(0.1)}>
            <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.22em", color: "#b0b0aa", margin: "0 0 1rem" }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {infoRows.map((row, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "0.7rem 0",
                  borderBottom: i < infoRows.length - 1 ? "1px solid #ebebе6" : "none",
                }}>
                  <span style={{ color: "#b0b0aa", flexShrink: 0 }}>{row.icon}</span>
                  <span style={{ fontSize: "9px", color: "#b0b0aa", textTransform: "uppercase", letterSpacing: "0.14em", width: "60px", flexShrink: 0 }}>
                    {row.label}
                  </span>
                  {row.link ? (
                    <a href={row.link} target="_blank" rel="noreferrer"
                      style={{ fontSize: "12px", color: "#555550", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#1a1a1a"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#555550"}>
                      {row.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: "12px", color: "#555550" }}>{row.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
