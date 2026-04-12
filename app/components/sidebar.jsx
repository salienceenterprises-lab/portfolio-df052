"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Sidebar({ data }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  const allNavLinks = [
    { label: "About",      href: "#about",      key: "about" },
    { label: "Education",  href: "#education",  key: "education" },
    { label: "Experience", href: "#experience", key: "experience" },
    { label: "Projects",   href: "#projects",   key: "projects" },
    { label: "Skills",     href: "#skills",     key: "skills" },
    { label: "Community",  href: "#community",  key: "community" },
    { label: "Contact",    href: "#contact",    key: "contact" },
  ];

  const activeLinks = allNavLinks.filter((link) => {
    if (link.label === "About") return true;
    if (link.key === "contact") return !!(data?.email || data?.github || data?.linkedin);
    const d = data?.[link.key];
    return Array.isArray(d) ? d.length > 0 : !!d;
  });

  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;

  useEffect(() => {
    const ids = ["hero", ...activeLinks.map((l) => l.href.replace("#", ""))];
    const onScroll = () => {
      const sorted = ids
        .map((id) => ({ id, top: document.getElementById(id)?.offsetTop ?? Infinity }))
        .filter((s) => s.top !== Infinity)
        .sort((a, b) => a.top - b.top);
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (window.scrollY >= sorted[i].top - 160) {
          setActiveSection(sorted[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (e) => {
      if (!e.target.closest("#atelier-mobile-menu") && !e.target.closest("#atelier-hamburger")) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [mobileOpen]);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  const titleWords = (data?.title || "Creative Developer").split(" ");

  return (
    <>
      <style>{`
        .at-sidebar-desktop { display: none; }
        @media (min-width: 1024px) { .at-sidebar-desktop { display: flex; } }
        .at-sidebar-mobile { display: flex; }
        @media (min-width: 1024px) { .at-sidebar-mobile { display: none; } }
      `}</style>

      {/* ── Desktop sidebar ── */}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: "220px",
        background: "#f5f5f2",
        borderRight: "1px solid #ddddd8",
        padding: "2.5rem 2rem",
        flexDirection: "column",
        zIndex: 100,
        overflowY: "auto",
        overflowX: "hidden",
      }} className="at-sidebar-desktop">

        {/* Name */}
        <a href="#hero" onClick={(e) => go(e, "#hero")} style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{
            fontSize: "11px", fontWeight: 400,
            color: "#1a1a1a", letterSpacing: "0.04em", lineHeight: 1.4,
          }}>
            {data?.name || "Portfolio"}
          </span>
        </a>

        {/* Nav */}
        <nav style={{ marginTop: "2.2rem", display: "flex", flexDirection: "column", gap: "0.5rem", flexShrink: 0 }}>
          {activeLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                style={{
                  fontSize: "9px", fontWeight: isActive ? 600 : 500,
                  textTransform: "uppercase", letterSpacing: "0.22em",
                  color: isActive ? "#1a1a1a" : "#b0b0aa",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  lineHeight: 1.5,
                  paddingLeft: isActive ? "8px" : "0",
                  borderLeft: isActive ? "2px solid #1a1a1a" : "2px solid transparent",
                }}>
                {link.label}
              </a>
            );
          })}

          {resumeSource && (
            <a
              href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
              download="Resume.pdf"
              style={{
                marginTop: "0.3rem",
                fontSize: "9px", fontWeight: 500,
                textTransform: "uppercase", letterSpacing: "0.22em",
                color: "#b0b0aa", textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#1a1a1a"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#b0b0aa"}
            >
              Résumé
            </a>
          )}
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: "2rem" }} />

        {/* Large editorial title — user's job title */}
        <div style={{ marginBottom: "2rem", flexShrink: 0 }}>
          <p style={{
            fontSize: "9px", fontWeight: 500, textTransform: "uppercase",
            letterSpacing: "0.22em", color: "#b0b0aa", margin: "0 0 0.8rem",
          }}>
            Portfolio
          </p>
          <div>
            {titleWords.map((word, i) => (
              <span key={i} style={{
                display: "block",
                fontSize: "clamp(1.1rem, 1.5vw, 1.7rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                color: "#1a1a1a",
                wordBreak: "break-word",
              }}>
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom links */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ height: "1px", background: "#ddddd8", marginBottom: "1.2rem" }} />
          <span style={{ fontSize: "8.5px", color: "#c0c0bb", letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: "#f5f5f2",
        borderBottom: "1px solid #ddddd8",
        padding: "0 1.25rem",
        height: "52px",
        alignItems: "center", justifyContent: "space-between",
      }} className="at-sidebar-mobile">

        {/* Name — left side */}
        <a href="#hero" onClick={(e) => go(e, "#hero")}
          style={{ textDecoration: "none", fontSize: "11px", fontWeight: 400, color: "#1a1a1a", letterSpacing: "0.04em" }}>
          {data?.name || "Portfolio"}
        </a>

        {/* Menu toggle */}
        <button
          id="atelier-hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "6px", display: "flex", alignItems: "center", justifyContent: "center",
            color: "#1a1a1a",
          }}>
          <span style={{
            display: "flex", flexDirection: "column", gap: "4px", width: "18px",
          }}>
            <span style={{
              height: "1.5px", background: "#1a1a1a", borderRadius: "2px",
              transition: "all 0.25s ease",
              transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
            }} />
            <span style={{
              height: "1.5px", background: "#1a1a1a", borderRadius: "2px",
              transition: "all 0.25s ease",
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              height: "1.5px", background: "#1a1a1a", borderRadius: "2px",
              transition: "all 0.25s ease",
              transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
            }} />
          </span>
        </button>
      </header>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="atelier-mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "fixed", top: "52px", left: 0, right: 0,
              zIndex: 199,
              background: "#f5f5f2",
              borderBottom: "1px solid #ddddd8",
              padding: "1.25rem 1.25rem 1.5rem",
              display: "flex", flexDirection: "column", gap: "1.1rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}>
            {activeLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                  style={{
                    fontSize: "10px", fontWeight: 500,
                    textTransform: "uppercase", letterSpacing: "0.22em",
                    color: isActive ? "#1a1a1a" : "#888880",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}>
                  {link.label}
                </a>
              );
            })}
            {resumeSource && (
              <a
                href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{
                  fontSize: "10px", fontWeight: 500,
                  textTransform: "uppercase", letterSpacing: "0.22em",
                  color: "#888880", textDecoration: "none",
                  marginTop: "0.25rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid #ddddd8",
                }}>
                Résumé ↓
              </a>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
