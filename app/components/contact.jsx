"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaCheck } from "react-icons/fa";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1], delay },
});

export default function PortfolioContact({ data }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);

  const hasContact = !!(data?.email || data?.github || data?.linkedin || data?.twitter || data?.website || data?.web3forms_key);
  if (!hasContact) return null;

  const WEB3FORMS_KEY = data?.web3forms_key || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "",
        }),
      });
      const r = await res.json();
      setStatus(r.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === field ? "#1a1a1a" : "#ddddd8"}`,
    color: "#1a1a1a",
    fontSize: "13px",
    padding: "10px 0",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "inherit",
    boxSizing: "border-box",
  });

  return (
    <section id="contact" style={{
      background: "#f5f5f2",
      padding: "3.5rem 3rem 9rem",
    }}>
      <style>{`
        @media(max-width:768px){
          #contact { padding: 2.5rem 1.5rem 9rem !important; }
          .at-contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>

      <motion.div {...fade(0)} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.28em", color: "#b0b0aa", margin: 0 }}>
          Contact
        </p>
        <div style={{ flex: 1, height: "1px", background: "#ddddd8" }} />
      </motion.div>

      <div className="at-contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
        {/* Left */}
        <motion.div {...fade(0.05)}>
          <h2 style={{
            fontSize: "clamp(1.6rem, 3vw, 2.75rem)", fontWeight: 800,
            letterSpacing: "-0.04em", lineHeight: 0.95,
            color: "#1a1a1a", margin: "0 0 1.25rem",
          }}>
            Let's<br />work<br />together.
          </h2>
          <p style={{
            fontSize: "12.5px", color: "#888880",
            lineHeight: 1.75, margin: "0 0 1.75rem",
          }}>
            Open to new opportunities and collaborations. Reach out and let's build something great.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {data?.email && (
              <a href={`mailto:${data.email}`}
                style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#555550", fontSize: "12px" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#1a1a1a"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#555550"}>
                <FaEnvelope size={10} style={{ color: "#b0b0aa", flexShrink: 0 }} />
                {data.email}
              </a>
            )}
            {data?.github && (
              <a href={data.github} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#555550", fontSize: "12px" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#1a1a1a"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#555550"}>
                <FaGithub size={10} style={{ color: "#b0b0aa", flexShrink: 0 }} />
                {"@" + data.github.split("/").pop()}
              </a>
            )}
            {data?.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#555550", fontSize: "12px" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#1a1a1a"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#555550"}>
                <FaLinkedin size={10} style={{ color: "#b0b0aa", flexShrink: 0 }} />
                LinkedIn
              </a>
            )}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div {...fade(0.1)}>
          {status === "sent" ? (
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "flex-start", gap: "0.75rem", paddingTop: "0.5rem",
            }}>
              <div style={{
                width: "36px", height: "36px",
                border: "1px solid #ddddd8",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <FaCheck size={12} style={{ color: "#555550" }} />
              </div>
              <p style={{ fontSize: "13px", color: "#1a1a1a", margin: 0, fontWeight: 500 }}>Message sent.</p>
              <p style={{ fontSize: "12px", color: "#888880", margin: 0 }}>I'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <input
                type="text" placeholder="Name" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                style={inputStyle("name")}
              />
              <input
                type="email" placeholder="Email" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                style={inputStyle("email")}
              />
              <textarea
                rows={4} placeholder="Message" required
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                style={{ ...inputStyle("message"), resize: "none" }}
              />
              <div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    background: "#1a1a1a", color: "#f5f5f2",
                    border: "none", padding: "10px 28px",
                    fontSize: "9px", fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: "0.22em",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    opacity: status === "sending" ? 0.6 : 1,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.background = "#333"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#1a1a1a"; }}
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </div>
              {status === "error" && (
                <p style={{ fontSize: "11px", color: "#cc4444", margin: 0 }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>

      {/* Built with Salience */}
      <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ flex: 1, height: "1px", background: "#ddddd8" }} />
        <span style={{ fontSize: "8px", color: "#c0c0bb", letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          Built with Salience
        </span>
      </div>
    </section>
  );
}
