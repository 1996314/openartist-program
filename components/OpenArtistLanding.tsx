"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────────── COLOR TOKENS ───────────────────────── */
const C = {
  black: "#0D0B0A",
  ivory: "#F2EDE4",
  sienna: "#C4622D",
  umber: "#7A5C3E",
  gold: "#C9A84C",
  dusk: "#2A3F5F",
  white: "#FAF7F2",
  ash: "#4A4540",
  amber: "#E8943A",
};

/* ───────────────────────── GRAIN OVERLAY ───────────────────────── */
function GrainOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/* ───────────────────────── FLOATING PARTICLES ───────────────────────── */
function Particles({ color = C.gold, globalOpacity = 1 }: { color?: string; globalOpacity?: number }) {
  const [particles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      dur: 4 + Math.random() * 6,
      delay: Math.random() * 5,
      opacity: 0.08 + Math.random() * 0.2,
    }))
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 5,
        overflow: "hidden",
        opacity: globalOpacity,
        transition: "opacity 0.15s ease-out",
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: color,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────── FAQ ACCORDION ITEM ───────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.ivory}15` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "1.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(17px, 2vw, 22px)",
            color: C.ivory,
            fontWeight: 500,
          }}
        >
          {q}
        </p>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: C.gold, fontSize: 24, flexShrink: 0, lineHeight: 1, display: "block" }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontSize: 15,
                color: `${C.ivory}cc`,
                lineHeight: 1.85,
                fontWeight: 300,
                paddingBottom: "1.5rem",
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── SECTION REVEAL WRAPPER ───────────────────────── */
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────── GOLD DIVIDER ───────────────────────── */
function GoldLine() {
  return (
    <div
      style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
        margin: "3rem auto",
        maxWidth: 200,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN LANDING PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function OpenArtistLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    setVh(window.innerHeight);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      setScrollY(e.currentTarget.scrollTop);
    },
    []
  );

  /* Transition progress values */
  const faqStart = faqRef.current ? faqRef.current.offsetTop : Infinity;
  const faqProgress = Math.min(Math.max((scrollY - faqStart + vh) / (vh * 0.8), 0), 1);

  const skyProgress = Math.min(
    Math.max((scrollY - vh * 0.3) / (vh * 1.2), 0),
    1
  );
  const heroFade = Math.min(scrollY / (vh * 0.6), 1);
  const beamOpacity = Math.min(skyProgress * 0.35, 0.25);

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-15px) translateX(5px); }
        }

        @keyframes chromatic-ab {
          0%   { text-shadow: -3px 0 rgba(255,160,160,0.7),  3px 0 rgba(160,185,255,0.7); }
          25%  { text-shadow:  3px 0 rgba(255,160,160,0.7), -3px 0 rgba(160,185,255,0.7); }
          50%  { text-shadow: -2px 0 rgba(255,160,160,0.6),  2px 0 rgba(160,185,255,0.6); }
          75%  { text-shadow:  2px 0 rgba(255,160,160,0.7), -2px 0 rgba(160,185,255,0.7); }
          100% { text-shadow: -3px 0 rgba(255,160,160,0.7),  3px 0 rgba(160,185,255,0.7); }
        }

        .artist-word {
          display: inline;
          font-family: 'Mondwest', sans-serif;
        }
        .artist-word:hover {
          animation: chromatic-ab 0.35s infinite;
        }

        .scroll-container::-webkit-scrollbar { width: 4px; }
        .scroll-container::-webkit-scrollbar-track { background: transparent; }
        .scroll-container::-webkit-scrollbar-thumb {
          background: ${C.umber}40;
          border-radius: 2px;
        }

        .tier-card {
          background: ${C.black}cc;
          border: 1px solid ${C.umber}40;
          border-radius: 12px;
          padding: 2.5rem 2rem;
          backdrop-filter: blur(20px);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .tier-card:hover {
          border-color: ${C.gold}80;
          transform: translateY(-4px);
          box-shadow: 0 20px 60px ${C.black}80;
        }
        .tier-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }
        .tier-select::before {
          background: linear-gradient(90deg, transparent, ${C.sienna}, transparent);
        }
        .tier-signature::before {
          background: linear-gradient(90deg, transparent, ${C.gold}, transparent);
        }

        .criteria-card {
          background: ${C.black}cc;
          border: 1px solid ${C.umber}40;
          border-radius: 12px;
          padding: 2rem;
          height: 100%;
          box-sizing: border-box;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .criteria-card:hover {
          border-color: ${C.gold}55;
          transform: translateY(-4px);
          box-shadow: 0 20px 50px ${C.black}80;
          background: ${C.black}cc;
        }

        .apply-btn {
          display: inline-block;
          position: relative;
          padding: 22px 80px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 15px;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: 1px solid ${C.umber}88;
          color: ${C.ivory};
          background: ${C.black}cc;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          cursor: pointer;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease;
          text-decoration: none;
          border-radius: 14px;
          overflow: hidden;
        }
        .apply-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${C.gold}55, transparent);
        }
        .apply-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.06;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          border-radius: 14px;
        }
        .apply-btn:hover {
          border-color: ${C.gold}70;
          transform: translateY(-4px);
          box-shadow: 0 20px 60px ${C.black}80, 0 0 0 1px ${C.gold}20;
          background: ${C.black}ee;
        }
      `}</style>

      {/* ── Fixed background layers (single compositing container) ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          transform: "translateZ(0)",
        }}
      >
        {/* LAYER 1: Grassland painting (fades out on scroll + faq) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/hero-grassland.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            opacity: (1 - skyProgress) * (1 - faqProgress),
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
        />

        {/* LAYER 2: Sky/clouds painting (fades in on scroll, out on faq) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/sky-clouds.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            opacity: skyProgress * (1 - faqProgress),
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
        />

        {/* LAYER 5: FAQ dark background (fades in) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#141211",
            opacity: faqProgress,
            willChange: "opacity",
            transform: "translateZ(0)",
            pointerEvents: "none",
          }}
        />

        {/* LAYER 3: Dark overlay for text readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              180deg,
              ${C.black}88 0%,
              ${C.black}55 40%,
              ${C.black}77 100%
            )`,
            transform: "translateZ(0)",
          }}
        />

        {/* LAYER 4: Warm light beam (fades out into faq) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60%",
            height: "100%",
            background: `radial-gradient(ellipse at top right, rgba(232,148,58,${beamOpacity}) 0%, transparent 70%)`,
            opacity: 1 - faqProgress,
            pointerEvents: "none",
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
        />
      </div>

      <GrainOverlay />
      <Particles globalOpacity={1 - faqProgress} />
      <Particles color={`${C.ivory}44`} globalOpacity={faqProgress} />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 60, display: "flex", alignItems: "center",
        background: "rgba(13,11,10,0.88)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        padding: "0 32px",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <a href="https://openart.ai" target="_blank" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo_2x.webp" alt="OpenArt" style={{ height: 26, width: "auto", display: "block" }} />
          </a>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {[
              { label: "Image Models", href: "https://openart.ai/suite/image" },
              { label: "Video Models", href: "https://openart.ai/suite/video" },
              { label: "Blog", href: "https://openart.ai/blog" },
              { label: "Tutorials", href: "https://openart.ai/suite/tutorials" },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 13, color: `${C.ivory}99`, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.ivory)}
                onMouseLeave={e => (e.currentTarget.style.color = `${C.ivory}99`)}
              >{link.label}</a>
            ))}
          </div>
          <a href="https://openart.ai/suite" target="_blank" rel="noopener noreferrer" style={{
            background: C.gold,
            color: C.black,
            borderRadius: 999,
            padding: "7px 18px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = C.amber)}
            onMouseLeave={e => (e.currentTarget.style.background = C.gold)}
          >Sign Up for FREE</a>
        </div>
      </nav>

      {/* ── Scrollable content ── */}
      <div
        ref={containerRef}
        className="scroll-container"
        onScroll={handleScroll}
        style={{
          position: "relative",
          zIndex: 10,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          fontFamily: "'Inter', sans-serif",
          color: C.ivory,
          transform: "translateZ(0)",
        }}
      >
        {/* ════════════════════ HERO ════════════════════ */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: 1 - heroFade * 0.6 }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: C.gold,
                marginBottom: "2.5rem",
                fontWeight: 500,
              }}
            >
              Applications Open
            </p>

            <h1
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                fontWeight: 400,
                lineHeight: 0.85,
                gap: 0,
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(20px, 3.5vw, 36px)",
                  color: C.ivory,
                  marginBottom: "0.05em",
                }}
              >
                The
              </span>
              <span
                style={{
                  fontSize: "clamp(60px, 12vw, 120px)",
                  letterSpacing: -2,
                  color: C.ivory,
                  marginBottom: "0.02em",
                }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.8em" }}>
                  Open
                </span>
                <span className="artist-word" style={{ color: C.ivory }}>
                  Artist
                </span>
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(28px, 5vw, 52px)",
                  color: C.ivory,
                  alignSelf: "flex-end",
                }}
              >
                Program
              </span>
            </h1>

            <GoldLine />

            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(18px, 2.4vw, 26px)",
                color: `${C.ivory}ee`,
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Not a creator network.
              <br />
              A creative standard.
            </p>

            <div style={{ marginTop: "3rem" }}>
              <a
                href="https://forms.openart.ai/openartist-program"
                className="apply-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: "absolute",
              bottom: "2rem",
              opacity: Math.max(1 - heroFade * 3, 0),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: `${C.ivory}77`,
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: 1,
                height: 40,
                background: `linear-gradient(to bottom, ${C.ivory}44, transparent)`,
              }}
            />
          </motion.div>
        </section>

        {/* ════════════════════ MANIFESTO ════════════════════ */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8rem 2rem",
          }}
        >
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <Reveal>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(28px, 4.5vw, 52px)",
                  lineHeight: 1.45,
                  color: C.ivory,
                  fontWeight: 400,
                }}
              >
                OpenArtist is OpenArt&apos;s official creator title, awarded to a curated global roster of 150 creators setting the standard for AI-generated content.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <GoldLine />
            </Reveal>

            <Reveal delay={0.25}>
              <p
                style={{
                  fontSize: "clamp(16px, 1.7vw, 18px)",
                  lineHeight: 1.85,
                  color: `${C.ivory}dd`,
                  fontWeight: 300,
                }}
              >
                Members get early access to every OpenArt model before it reaches the public, a direct line to our team, and amplification across OpenArt channels when their work performs. OpenArtists are paid for every post they publish, with additional bonuses when their content breaks through.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════ BENEFITS ════════════════════ */}
        <section style={{ padding: "8rem 2rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Reveal>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(40px, 6vw, 72px)",
                  fontWeight: 400,
                  textAlign: "center",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  color: C.ivory,
                }}
              >
                What you get
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              {[
                {
                  icon: "🔮",
                  title: "First access to every model",
                  desc: "New models hit your dashboard before anyone else sees them. Test, create, and post first.",
                },
                {
                  icon: "💰",
                  title: "Paid per post",
                  desc: "Compensation for every post you create, with performance bonuses when your content breaks through.",
                },
                {
                  icon: "🎨",
                  title: "Full creative freedom",
                  desc: "No scripts. No rigid formats. Your voice, your style, always.",
                },
                {
                  icon: "📡",
                  title: "Amplified by OpenArt",
                  desc: "When your content performs, we feature and amplify it across OpenArt's official channels.",
                },
                {
                  icon: "🔑",
                  title: "Direct line to the team",
                  desc: "Product access, roadmap input, and a named point of contact who responds in 24 hours.",
                },
                {
                  icon: "⚡",
                  title: "Pro account included",
                  desc: "Full OpenArt Pro access from day one. Every tool, every model, no limits.",
                },
              ].map((b, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{
                      y: -4,
                      backgroundColor: "rgba(255,255,255,0.09)",
                      borderColor: "rgba(255,255,255,0.18)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 16,
                      padding: "1.75rem",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                      height: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 18,
                        background: `${C.umber}25`,
                      }}
                    >
                      {b.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: 16,
                          marginBottom: 6,
                          color: C.ivory,
                        }}
                      >
                        {b.title}
                      </p>
                      <p
                        style={{
                          fontSize: 14,
                          color: `${C.ivory}aa`,
                          lineHeight: 1.6,
                          fontWeight: 300,
                        }}
                      >
                        {b.desc}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ TIERS ════════════════════ */}
        <section style={{ padding: "8rem 2rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Reveal>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: C.gold,
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Two tiers
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(32px, 4.5vw, 52px)",
                  fontWeight: 400,
                  textAlign: "center",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                }}
              >
                Earn your place. Then rise.
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {/* ── Foundry ── */}
              <Reveal delay={0.1}>
                <div className="tier-card tier-select">
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 14px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      background: `${C.sienna}25`,
                      color: C.sienna,
                      border: `1px solid ${C.sienna}40`,
                    }}
                  >
                    Select
                  </span>

                  <p
                    style={{
                      fontSize: 15,
                      color: `${C.ivory}bb`,
                      marginTop: "1.5rem",
                      marginBottom: "2rem",
                      fontWeight: 300,
                      fontStyle: "italic",
                    }}
                  >
                    Your entry into the OpenArtist roster
                  </p>

                  {[
                    "Paid per post",
                    "Bonus pay when impressions break through",
                    "Monthly OpenArt credits included",
                    "2–3 posts per month",
                    "Early model access",
                    "OpenArt Pro account included",
                    "OpenArtist badge",
                    "Path to Signature after 30-60 days",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px 0",
                        borderBottom: `1px solid ${C.umber}15`,
                        fontSize: 15,
                        color: `${C.ivory}dd`,
                        fontWeight: 300,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{ color: C.sienna, fontSize: 10 }}
                      >
                        ◆
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* ── Vanguard ── */}
              <Reveal delay={0.2}>
                <div
                  className="tier-card tier-signature"
                  style={{ borderColor: `${C.gold}30` }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 14px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      background: `${C.gold}20`,
                      color: C.gold,
                      border: `1px solid ${C.gold}50`,
                    }}
                  >
                    Signature
                  </span>

                  <p
                    style={{
                      fontSize: 15,
                      color: `${C.ivory}bb`,
                      marginTop: "1.5rem",
                      marginBottom: "2rem",
                      fontWeight: 300,
                      fontStyle: "italic",
                    }}
                  >
                    OpenArt&apos;s highest creator distinction
                  </p>

                  {[
                    "Higher pay per post",
                    "Bonus pay when impressions break through",
                    "Increased monthly OpenArt credits",
                    "2–3 posts per month",
                    "First access to every model drop",
                    "OpenArt Pro account included",
                    "Direct Slack with the team",
                    "Quarterly product roadmap input",
                    "Featured on OpenArt channels",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px 0",
                        borderBottom: `1px solid ${C.umber}15`,
                        fontSize: 15,
                        color: `${C.ivory}dd`,
                        fontWeight: 300,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span style={{ color: C.gold, fontSize: 10 }}>
                        ◆
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ════════════════════ WHO WE'RE LOOKING FOR ════════════════════ */}
        <section style={{ padding: "8rem 2rem" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <Reveal>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: C.gold,
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Selection criteria
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(32px, 4.5vw, 52px)",
                  fontWeight: 400,
                  textAlign: "center",
                  fontStyle: "italic",
                  marginBottom: "1rem",
                }}
              >
                Who becomes an OpenArtist
              </h2>
            </Reveal>

            {/* Three cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              {[
                {
                  icon: "📡",
                  title: "Audience & Reach",
                  bullets: [
                    "5000+ followers on at least one major platform",
                    "Highly engaged creative audience",
                    "Consistent reach, not one-off spikes",
                  ],
                },
                {
                  icon: "🎨",
                  title: "Active Creation",
                  bullets: [
                    "Actively creating AI-generated content using OpenArt",
                    "Share 2–3 pieces of content per month with your audience",
                    "Content can include finished work, process breakdowns, experiments, or reactions",
                  ],
                },
                {
                  icon: "✦",
                  title: "Quality & Voice",
                  bullets: [
                    "Your content has a clear point of view and creative voice",
                    "Tutorials, demos, reactions, commentary, any format, but it has to be yours",
                    "Share your work publicly and tag OpenArt so we can amplify it",
                  ],
                },
                
              ].map((card, ci) => (
                <Reveal key={ci} delay={ci * 0.1 + 0.15}>
                  <div className="criteria-card">
                    <div style={{ fontSize: 24, marginBottom: "1rem" }}>
                      {card.icon}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        fontSize: 22,
                        fontWeight: 400,
                        color: C.ivory,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {card.title}
                    </h3>
                    {card.bullets.map((b, bi) => (
                      <div
                        key={bi}
                        style={{
                          display: "flex",
                          gap: 10,
                          marginBottom: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            color: C.gold,
                            fontSize: 8,
                            marginTop: 6,
                            flexShrink: 0,
                          }}
                        >
                          ◆
                        </span>
                        <p
                          style={{
                            fontSize: 14,
                            color: `${C.ivory}cc`,
                            lineHeight: 1.6,
                            fontWeight: 300,
                          }}
                        >
                          {b}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════ FAQ ════════════════════ */}
        <div ref={faqRef} style={{ background: "#141211", position: "relative" }}>
          <section style={{ padding: "6rem 2rem 4rem" }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              <Reveal>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: 4,
                    textTransform: "uppercase",
                    color: C.gold,
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  Questions
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(32px, 4.5vw, 52px)",
                    fontWeight: 400,
                    textAlign: "center",
                    fontStyle: "italic",
                    marginBottom: "3rem",
                  }}
                >
                  Frequently Asked
                </h2>
              </Reveal>

              {[
                {
                  q: "What is The OpenArtist Program?",
                  a: "It's OpenArt's official creator partnership. A small, hand-selected group of AI content creators who get paid per post, early access to every model we launch, and direct access to our team. It's not a sponsorship or a community program. It's a membership built around the people whose work is defining AI content.",
                },
                {
                  q: "Who is eligible?",
                  a: "We're looking for creators who are actively producing AI-generated content and have a consistent, engaged audience.",
                },
                {
                  q: "How does selection work?",
                  a: "We source from our internal watchlist, referrals from existing OpenArtists, and our broader creator community. We evaluate based on content quality, posting consistency, audience engagement, and how well your voice fits the AI creative space. There are limited seats that open periodically. Applications are open now.",
                },
                {
                  q: "Do I need to use OpenArt exclusively?",
                  a: "No. We ask that you don't mention direct competitor platforms in the same post as OpenArt content, but you're free to create with any tools you want. We do require that content made for the program includes at least one output created in OpenArt.",
                },
                {
                  q: "What kind of content do I create?",
                  a: "Whatever feels natural to you. Tutorials, demo threads, reaction posts, workflow breakdowns, visual showcases, commentary. Your format, your voice, your style. No scripts, no approval chains.",
                },
                {
                  q: "How do I move from Select to Signature?",
                  a: "Performance review happens at the 30-day mark. If your content consistently hits engagement benchmarks and maintains quality, you're promoted to Signature. This unlocks higher pay, a direct Slack channel with our team, quarterly roadmap input, and priority for campaign leads and co-branded content.",
                },
                {
                  q: "Can I apply if I haven't been invited?",
                  a: "The program launched with a curated invite list. We periodically open a limited application window for creators producing strong AI content. If that's you, apply now to be considered for the next cohort.",
                },
              ].map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}

              {/* Footer */}
              <footer style={{
                marginTop: "5rem",
                paddingTop: "3rem",
                borderTop: `1px solid ${C.gold}20`,
              }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr",
                  gap: 40,
                  marginBottom: 48,
                  textAlign: "left",
                }}>
                  <div>
                    <a href="https://openart.ai" target="_blank" style={{ textDecoration: "none" }}>
                      <img src="/logo_2x.webp" alt="OpenArt" style={{ height: 26, width: "auto", marginBottom: 16, filter: "brightness(0.9) sepia(0.2)" }} />
                    </a>
                    <p style={{ fontSize: 13, color: `${C.ivory}55`, lineHeight: 1.7, maxWidth: 200, fontStyle: "italic" }}>
                      Create better AI art & videos with OpenArt.
                    </p>
                  </div>
                  {[
                    { title: "Product", links: [
                      { label: "Home", href: "https://openart.ai" },
                      { label: "Create", href: "https://openart.ai/suite/home" },
                      { label: "Edit", href: "https://openart.ai/suite/edit-image" },
                      { label: "Discover", href: "https://openart.ai/discovery" },
                      { label: "Train model", href: "https://openart.ai/suite/character" },
                    ]},
                    { title: "AI Tools", links: [
                      { label: "AI Image Generator", href: "https://openart.ai/suite/image" },
                      { label: "Image to Video", href: "https://openart.ai/suite/video" },
                      { label: "Consistent Character", href: "https://openart.ai/suite/character" },
                      { label: "Skin Enhancer", href: "https://openart.ai/m/vellum-ai-skin-enhancer" },
                    ]},
                    { title: "Resources", links: [
                      { label: "Terms of Service", href: "https://openart.ai/terms" },
                      { label: "Blog", href: "https://openart.ai/blog" },
                      { label: "Creative Partner", href: "https://openart.ai/programs/cpp" },
                    ]},
                    { title: "Need Help?", links: [
                      { label: "Email us", href: "mailto:support@openart.ai" },
                      { label: "Discord", href: "https://discord.com/invite/openart-ai-1009536403555750018" },
                      { label: "FAQ", href: "https://openart.ai/general_faq" },
                    ]},
                  ].map(col => (
                    <div key={col.title}>
                      <p style={{ fontSize: 11, fontWeight: 600, color: `${C.gold}cc`, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</p>
                      {col.links.map(l => (
                        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: 13, color: `${C.ivory}66`, textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                          onMouseEnter={e => (e.currentTarget.style.color = C.ivory)}
                          onMouseLeave={e => (e.currentTarget.style.color = `${C.ivory}66`)}
                        >{l.label}</a>
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${C.gold}15`, paddingTop: 20, textAlign: "center" }}>
                  <p style={{ fontSize: 12, color: `${C.ivory}40`, fontStyle: "italic" }}>
                    © {new Date().getFullYear()} OpenArt. The OpenArtist Program.
                  </p>
                </div>
              </footer>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}