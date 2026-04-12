"use client";
import React from "react";
import { motion } from "framer-motion";

export default function PortfolioHero({ data }) {
  const hasPhoto = !!data?.heroImageBase64;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: "#eeede9",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        .at-hero-inner {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        @media (min-width: 1024px) {
          .at-hero-inner {
            flex-direction: row;
          }
        }

        /* Photo panel */
        .at-hero-photo-panel {
          width: 100%;
          aspect-ratio: 4 / 5;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .at-hero-photo-panel {
            width: 52%;
            aspect-ratio: unset;
            height: 100vh;
            position: sticky;
            top: 0;
          }
        }

        /* Text panel */
        .at-hero-text-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 3rem 2rem 3.5rem;
        }
        @media (min-width: 1024px) {
          .at-hero-text-panel {
            padding: 4rem 3rem 4rem;
            justify-content: flex-end;
            min-height: 100vh;
          }
        }

        /* No-photo layout */
        .at-hero-nophoto {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 100vh;
          padding: 3.5rem 2.5rem 3.5rem;
          position: relative;
        }
        @media (min-width: 1024px) {
          .at-hero-nophoto {
            padding: 4.5rem 4rem 4.5rem;
          }
        }
      `}</style>

      {hasPhoto ? (
        <div className="at-hero-inner">
          {/* Image panel */}
          <div className="at-hero-photo-panel">
            <img
              src={data.heroImageBase64}
              alt={data.name || "Hero"}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
            {/* Subtle vignette */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, transparent 60%, rgba(238,237,233,0.35) 100%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Text panel */}
          <motion.div
            className="at-hero-text-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            <p style={{
              fontSize: "9px", textTransform: "uppercase",
              letterSpacing: "0.28em", color: "#b0b0aa",
              margin: "0 0 1rem",
            }}>
              {data?.title || "Portfolio"}
            </p>
            <h1 style={{ margin: "0 0 1.5rem", lineHeight: 0.9 }}>
              {(data?.name || "Portfolio").split(" ").map((word, i) => (
                <span key={i} style={{
                  display: "block",
                  fontSize: "clamp(2.8rem, 5vw, 5.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "#1a1a1a",
                }}>
                  {word}
                </span>
              ))}
            </h1>

            {data?.sloganHeroSection && (
              <p style={{
                fontSize: "13px", color: "#888880",
                lineHeight: 1.7, maxWidth: "360px",
                margin: "0 0 2rem",
              }}>
                {data.sloganHeroSection}
              </p>
            )}

            <button
              onClick={() => scrollTo("about")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "none", border: "1px solid #1a1a1a",
                padding: "10px 24px", alignSelf: "flex-start",
                fontSize: "9px", fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.22em",
                color: "#1a1a1a", cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#f5f5f2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#1a1a1a"; }}
            >
              View Work
            </button>
          </motion.div>
        </div>
      ) : (
        /* ── Type-only hero (no photo) ── */
        <div className="at-hero-nophoto">
          {/* Light grid texture */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <p style={{
              fontSize: "9px", textTransform: "uppercase",
              letterSpacing: "0.28em", color: "#b0b0aa",
              margin: "0 0 1.5rem",
            }}>
              {data?.title || "Portfolio"}
            </p>
            <h1 style={{ margin: "0 0 2rem", lineHeight: 0.88 }}>
              {(data?.name || "Portfolio").split(" ").map((word, i) => (
                <span key={i} style={{
                  display: "block",
                  fontSize: "clamp(3.5rem, 8vw, 8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  color: "#1a1a1a",
                }}>
                  {word}
                </span>
              ))}
            </h1>

            {data?.sloganHeroSection && (
              <p style={{
                fontSize: "14px", fontWeight: 400,
                color: "#888880", lineHeight: 1.7,
                maxWidth: "480px", margin: "0 0 2.5rem",
              }}>
                {data.sloganHeroSection}
              </p>
            )}

            <button
              onClick={() => scrollTo("about")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "none", border: "1px solid #1a1a1a",
                padding: "10px 24px",
                fontSize: "9px", fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.22em",
                color: "#1a1a1a", cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#f5f5f2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#1a1a1a"; }}
            >
              View Work
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
