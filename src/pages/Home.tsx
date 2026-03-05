import { useState, useEffect } from "react";

// ─── PORTFOLIO COMPONENT ──────────────────────────────────────────────────────

// ─── DATA ────────────────────────────────────────────────────────────────────

const SKILLS = {
  Frontend: [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 92 },
    { name: "Next.js", level: 88 },
    { name: "Tailwind CSS", level: 94 },
    { name: "HTML/CSS", level: 94 },
    { name: "Framer Motion", level: 80 },
    { name: "JavaScript", level: 80 },
  ],
  Backend: [
    { name: "Django", level: 90 },
    { name: "Node.js", level: 75 },
    { name: "REST APIs", level: 95 },
    { name: "WebSockets", level: 82 },
    { name: "Redis", level: 75 },
  ],
  "AI & Automation": [
    { name: "n8n", level: 96 },
    { name: "OpenAI API", level: 90 },
    { name: "Make.com", level: 78 },
    { name: "Workflow Design", level: 93 },
    { name: "GPT Integration", level: 88 },
    { name: "Go Higher Level Integration", level: 90 },
    { name: "API Integration", level: 88 },


  ],
  DevOps: [
    { name: "Docker", level: 85 },
    { name: "GitHub Actions", level: 87 },
    { name: "Linux", level: 82 },
    { name: "CI/CD", level: 84 },
    { name: "AWS", level: 76 },
  ],
  Databases: [
    { name: "PostgreSQL", level: 89 },
    { name: "MongoDB", level: 82 },
    { name: "Redis", level: 78 },
    { name: "SQLite", level: 83 },
    { name: "Superbase", level: 83 }, 
    { name: "Firestore", level: 83 },

  ],
};

const PROJECTS = [
  {
    id: 1,
    title: "AI Lead Generation Engine",
    category: "AI & Automation",
    badge: "Featured",
    problem: "Sales team spent 40+ hours/week manually researching leads, resulting in slow pipeline growth and inconsistent outreach.",
    solution: "Built an end-to-end n8n automation pipeline integrating LinkedIn scraping, OpenAI GPT-4 for personalized outreach, CRM sync, and email sequencing—all triggered automatically.",
    stack: ["n8n", "OpenAI GPT-4", "HubSpot API", "PostgreSQL", "Node.js", "Docker"],
    results: [
      "Reduced manual work by 87%",
      "3x increase in qualified leads",
      "Average response time cut from 48h → 2h",
    ],
    metrics: { time: "87%", leads: "3x", cost: "60%" },
    gradient: "from-violet-600 to-indigo-600",
    accent: "#7c3aed",
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Multi-tenant SaaS Dashboard",
    category: "Full Stack",
    badge: "Production",
    problem: "Client needed a scalable B2B SaaS platform with role-based access, real-time analytics, and white-label support for 200+ enterprise clients.",
    solution: "Architected a React + Django multi-tenant platform with JWT auth, WebSocket-powered live dashboards, Stripe subscriptions, and a fully white-labelable UI system.",
    stack: ["React", "TypeScript", "Django", "PostgreSQL", "Redis", "Stripe", "Docker", "WebSockets"],
    results: [
      "Onboarded 200+ enterprise clients",
      "99.97% uptime over 18 months",
      "Sub-200ms API response times",
    ],
    metrics: { clients: "200+", uptime: "99.97%", speed: "200ms" },
    gradient: "from-cyan-500 to-blue-600",
    accent: "#0891b2",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Payment & Subscription System",
    category: "Backend",
    badge: "Complex",
    problem: "A marketplace platform needed metered billing, usage-based pricing, dunning management, and real-time revenue analytics.",
    solution: "Engineered a complete Stripe Billing integration with webhook handlers, subscription lifecycle management, proration logic, and a live revenue analytics dashboard.",
    stack: ["Node.js", "Stripe", "PostgreSQL", "React", "TypeScript", "Docker"],
    results: [
      "Handles $2M+ monthly transactions",
      "0 failed webhook events in production",
      "Revenue recognition automated 100%",
    ],
    metrics: { mrr: "$2M+", webhooks: "0 fails", automation: "100%" },
    gradient: "from-emerald-500 to-teal-600",
    accent: "#059669",
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Real-time Collaboration App",
    category: "Full Stack",
    badge: "Live",
    problem: "Remote teams needed a real-time document collaboration tool with live cursors, instant sync, and offline-first capabilities.",
    solution: "Built a WebSocket-based collab platform using CRDTs for conflict resolution, Redis pub/sub for horizontal scaling, and a custom rich text editor.",
    stack: ["React", "TypeScript", "Node.js", "WebSockets", "Redis", "PostgreSQL", "CRDT"],
    results: [
      "Supports 500 concurrent users per room",
      "<50ms latency globally",
      "Full offline-to-online sync",
    ],
    metrics: { users: "500+", latency: "<50ms", sync: "100%" },
    gradient: "from-orange-500 to-rose-600",
    accent: "#ea580c",
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    title: "Business Process Automation Suite",
    category: "AI & Automation",
    badge: "Enterprise",
    problem: "An e-commerce company had 15 disconnected tools with manual data transfers between systems, causing errors and 30h/week wasted effort.",
    solution: "Designed a master n8n automation hub connecting Shopify, QuickBooks, Slack, Gmail, and their CRM—with GPT-4 for anomaly detection and smart reporting.",
    stack: ["n8n", "OpenAI", "Shopify API", "QuickBooks API", "PostgreSQL", "Slack API"],
    results: [
      "Eliminated 30 hours/week of manual work",
      "Error rate dropped from 12% to 0.3%",
      "ROI of 400% in first 3 months",
    ],
    metrics: { hours: "30h/wk", errors: "96% less", roi: "400%" },
    gradient: "from-pink-500 to-purple-600",
    accent: "#db2777",
    github: "#",
    demo: "#",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "Nexus Technologies",
    avatar: "SC",
    text: "Delivered an n8n automation system that replaced 3 full-time data entry roles. The architecture was clean, well-documented, and the ROI was visible within 6 weeks of deployment.",
    stars: 5,
  },
  {
    name: "Marcus Reid",
    role: "Product Director",
    company: "FlowScale",
    avatar: "MR",
    text: "Our SaaS dashboard went from concept to production in 8 weeks. The TypeScript codebase is exceptionally well-structured — our internal team could extend it immediately without guidance.",
    stars: 5,
  },
  {
    name: "Amira Osei",
    role: "Founder",
    company: "LaunchPad AI",
    avatar: "AO",
    text: "The GPT-4 integration and workflow automation tripled our lead conversion. More importantly, every technical decision was explained clearly — felt like a true technical co-founder.",
    stars: 5,
  },
];

const SERVICES = [
  {
    icon: "⬡",
    title: "Full-Stack SaaS Development",
    desc: "End-to-end SaaS platforms built with React, TypeScript, and Django. Multi-tenancy, auth, billing — production-ready from day one.",
    tags: ["React", "Django", "PostgreSQL", "TypeScript"],
  },
  {
    icon: "◈",
    title: "AI Automation Systems",
    desc: "Custom n8n workflow automation connecting your tools, with GPT-4 intelligence for smart decisions and anomaly detection.",
    tags: ["n8n", "OpenAI", "Workflow Design"],
  },
  {
    icon: "◇",
    title: "API & Integration Architecture",
    desc: "Robust REST and GraphQL APIs. Third-party integrations (Stripe, HubSpot, Shopify, Slack) built with reliability and observability.",
    tags: ["REST", "GraphQL", "Webhooks"],
  },
  {
    icon: "△",
    title: "Payment Infrastructure",
    desc: "Stripe subscriptions, metered billing, and dunning management. Handle complex pricing models with confidence and compliance.",
    tags: ["Stripe", "Billing", "Revenue Ops"],
  },
  {
    icon: "○",
    title: "Business Process Automation",
    desc: "Map, redesign, and automate your business processes. Cut manual work by 60–90% with intelligent workflows.",
    tags: ["Process Design", "n8n", "ROI-focused"],
  },
  {
    icon: "□",
    title: "Real-time Systems",
    desc: "WebSocket-powered live dashboards, collaborative tools, and event-driven architectures that scale horizontally.",
    tags: ["WebSockets", "Redis", "Event-driven"],
  },
];

const BLOG_POSTS = [
  {
    title: "Building Production n8n Workflows: Lessons from 50+ Automations",
    tag: "Automation",
    readTime: "8 min",
    date: "Feb 2025",
    excerpt: "Error handling, versioning, and monitoring strategies that separate amateur workflows from enterprise-grade automation.",
  },
  {
    title: "GPT-4 in Production: Cost Control, Caching, and Fallback Strategies",
    tag: "AI Engineering",
    readTime: "12 min",
    date: "Jan 2025",
    excerpt: "How to deploy LLM-powered features without unpredictable costs — prompt caching, tiered fallbacks, and token budgets.",
  },
  {
    title: "Multi-tenant Django Architecture: Schema vs Row Isolation",
    tag: "Backend",
    readTime: "10 min",
    date: "Dec 2024",
    excerpt: "A practical comparison of tenant isolation strategies with performance benchmarks and real-world migration stories.",
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function GradientOrb({ cx, cy, r, color, opacity = 0.15 }: { cx: string | number; cy: string | number; r: number; color: string; opacity?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: cx,
        top: cy,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        background: color,
        opacity,
        filter: `blur(${r * 0.9}px)`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    />
  );
}

function Badge({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        background: accent + "22",
        color: accent,
        border: `1px solid ${accent}44`,
      }}
    >
      {children}
    </span>
  );
}

function TechBadge({ name, index = 0 }: { name: string; index?: number }) {
  const colors: Record<string, string> = {
    React: "#61dafb", TypeScript: "#3178c6", Django: "#0c4b33", "Node.js": "#84ba64",
    n8n: "#ff6d5a", OpenAI: "#10a37f", Stripe: "#635bff", Docker: "#2496ed",
    PostgreSQL: "#336791", MongoDB: "#47a248", "Next.js": "#ffffff", Redis: "#dc382d",
    "REST APIs": "#f59e0b", WebSockets: "#8b5cf6", "GitHub Actions": "#2088ff",
    Linux: "#fcc624", "Framer Motion": "#ff0055", "Tailwind CSS": "#38bdf8",
    "GPT-4": "#10a37f", "OpenAI API": "#10a37f", "GPT Integration": "#10a37f",
  };
  const color = colors[name] || "#94a3b8";
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
        background: color + "18", color, border: `1px solid ${color}33`,
        whiteSpace: "nowrap",
        animation: `fadeInUp 0.5s ease forwards`,
        animationDelay: `${index * 0.05}s`,
        opacity: 0,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {name}
    </span>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array(count).fill(0).map((_, i) => (
        <span key={i} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#6366f1", textTransform: "uppercase", marginBottom: 12 }}>
        {eyebrow}
      </p>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.15, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 17, color: "#94a3b8", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── TYPING ANIMATION COMPONENT ──────────────────────────────────────────────

function TypingAnimation() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "const engineer = { name: \"Onyebuchi Festus\", focus: \"impact-first\", tools: [\"n8n\", \"AI\", \"React\"], available: true }",
    "function buildSolution() { return { impact: \"high\", timeline: \"fast\", quality: \"exceptional\" } }",
    "class AutomationEngineer { constructor() { this.skills = [\"n8n\", \"GPT-4\", \"React\"]; this.status = \"available\"; } }",
    "type Engineer = { name: string; focus: \"impact-first\"; tools: string[]; available: boolean; }"
  ];

  useEffect(() => {
    let timer = setTimeout(() => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setDisplayText(
        isDeleting 
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
        setTypingSpeed(50);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      } else {
        setTypingSpeed(isDeleting ? 30 : 80);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <div style={{ 
      background: "rgba(0,0,0,0.4)", 
      borderRadius: 12, 
      padding: "16px 20px", 
      fontFamily: "monospace", 
      fontSize: 12, 
      lineHeight: 1.8, 
      color: "#94a3b8", 
      border: "1px solid rgba(255,255,255,0.05)",
      minHeight: "120px",
      position: "relative",
    }}>
      <span>{displayText}</span>
      <span style={{
        display: "inline-block",
        width: "2px",
        height: "16px",
        background: "#6366f1",
        marginLeft: "4px",
        animation: "blink 1s infinite",
        verticalAlign: "middle"
      }} />
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Nav({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Skills", "Projects", "Services", "Testimonials", "Blog", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 clamp(16px, 5vw, 60px)",
      height: 68,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(5,7,20,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.3s ease",
    }}>
      <a href="#hero" style={{ textDecoration: "none" }}>
        <span style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px" }}>
          <span style={{ color: "#6366f1" }}>{"<"}</span>
          <span style={{ color: "#f1f5f9" }}>Festus</span>
          <span style={{ color: "#6366f1" }}>{">"}</span>
        </span>
      </a>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-desktop">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontSize: 13, fontWeight: 500, color: activeSection === l.toLowerCase() ? "#6366f1" : "#94a3b8",
            textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s",
          }}>{l}</a>
        ))}
        <a href="#contact" style={{
          padding: "8px 20px", borderRadius: 8, background: "#6366f1", color: "#fff",
          fontSize: 13, fontWeight: 600, textDecoration: "none", letterSpacing: "0.02em",
        }}>Hire Me</a>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: "none", background: "none", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: "#94a3b8", fontSize: 18,
      }} className="nav-mobile-btn">☰</button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, background: "rgba(5,7,20,0.97)",
          backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "20px", display: "flex", flexDirection: "column", gap: 16, zIndex: 99,
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              fontSize: 15, fontWeight: 500, color: "#94a3b8", textDecoration: "none", padding: "8px 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const techBadges = ["React", "TypeScript", "Django", "Node.js", "n8n", "OpenAI", "Stripe", "Docker", "PostgreSQL"];

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 68 }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 50%)" }} />
      <GradientOrb cx="15%" cy="40%" r={300} color="#6366f1" opacity={0.12} />
      <GradientOrb cx="85%" cy="20%" r={250} color="#8b5cf6" opacity={0.08} />
      <GradientOrb cx="60%" cy="80%" r={200} color="#0ea5e9" opacity={0.06} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px clamp(16px,5vw,60px)", textAlign: "center" }}>
        {/* Status badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", marginBottom: 32 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#10b981", letterSpacing: "0.06em" }}>AVAILABLE FOR REMOTE WORK</span>
        </div>

        <h1 style={{
          fontSize: "clamp(36px, 6vw, 78px)", fontWeight: 900, lineHeight: 1.05,
          fontFamily: "'Syne', sans-serif", letterSpacing: "-2px", marginBottom: 24,
          color: "#f8fafc",
        }}>
          Full Stack Developer<br />
          <span style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>& AI Automation Engineer</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "#94a3b8", maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.65, fontWeight: 400 }}>
          I build production-grade SaaS products and intelligent automation systems that
          <span style={{ color: "#cbd5e1", fontWeight: 500 }}> eliminate manual work, scale revenue, and ship fast.</span>
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          {[
            { label: "View Projects", href: "#projects", primary: true },
            { label: "Book a Call", href: "#contact", primary: false },
            { label: "↓ Download Resume", href: "#", primary: false, dim: true },
          ].map((btn, idx) => (
            <a key={btn.label} href={btn.href} style={{
              padding: "13px 28px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              textDecoration: "none", letterSpacing: "0.02em", transition: "all 0.2s",
              animation: `fadeInUp 0.5s ease forwards`,
              animationDelay: `${idx * 0.1}s`,
              opacity: 0,
              ...(btn.primary
                ? { background: "#6366f1", color: "#fff", boxShadow: "0 4px 24px rgba(99,102,241,0.35)" }
                : btn.dim
                  ? { background: "transparent", color: "#64748b", border: "1px solid rgba(255,255,255,0.08)" }
                  : { background: "rgba(255,255,255,0.05)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.12)" }
              ),
            }}>{btn.label}</a>
          ))}
        </div>

        {/* Tech badges with animation */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", maxWidth: 720, margin: "0 auto" }}>
          {techBadges.map((t, idx) => <TechBadge key={t} name={t} index={idx} />)}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 0, justifyContent: "center", marginTop: 72, flexWrap: "wrap", width: "100%" }}>
          {[
            { val: "5+", label: "Years Experience" },
            { val: "40+", label: "Projects Shipped" },
            { val: "15+", label: "n8n Automations" },
            { val: "98%", label: "Client Satisfaction" },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: "24px 40px", textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }} className="stat-item">
              <div style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 900, fontFamily: "'Syne', sans-serif", color: "#f1f5f9", letterSpacing: "-1px" }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "100px clamp(16px,5vw,60px)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">
        {/* Left: Visual with typing animation */}
        <div style={{ position: "relative" }}>
          <div style={{
            width: "100%", aspectRatio: "4/5", borderRadius: 24, overflow: "hidden",
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28,
            position: "relative",
          }}>
            {/* Typing animation decoration */}
            <div style={{ position: "absolute", top: 28, left: 28, right: 28 }}>
              <TypingAnimation />
            </div>

            {/* Bottom stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["5+", "Years"], ["40+", "Projects"], ["15+", "Automations"], ["98%", "Satisfied"]].map(([v, l], idx) => (
                <div key={l} style={{ 
                  background: "rgba(255,255,255,0.04)", 
                  borderRadius: 12, 
                  padding: "14px 16px", 
                  border: "1px solid rgba(255,255,255,0.07)",
                  animation: `fadeInUp 0.5s ease forwards`,
                  animationDelay: `${idx * 0.1}s`,
                  opacity: 0,
                }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", fontFamily: "'Syne', sans-serif" }}>{v}</div>
                  <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500, letterSpacing: "0.06em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Text */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#6366f1", textTransform: "uppercase", marginBottom: 16 }}>About Me</p>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.2, marginBottom: 24, fontFamily: "'Syne', sans-serif" }}>
            I don't just write code.<br />I solve business problems.
          </h2>
          <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.75, marginBottom: 20 }}>
            With 5+ years building full-stack products and AI automation systems, I specialize in turning complex business requirements into elegant, scalable software. My work lives at the intersection of engineering excellence and measurable business impact.
          </p>
          <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.75, marginBottom: 32 }}>
            I've built multi-tenant SaaS platforms, automated away hundreds of hours of manual work with n8n and GPT-4, and shipped payment infrastructure handling millions in monthly transactions. Every project starts with a question: <em style={{ color: "#cbd5e1" }}>what outcome are we actually optimizing for?</em>
          </p>

          {/* Key points */}
          {[
            "Business-outcome focused — I measure success in ROI, not just code quality",
            "Deep n8n expertise — 50+ production workflows across diverse industries",
            "Remote-native — async communication, self-directed, trusted by global teams",
          ].map((p, idx) => (
            <div key={p} style={{ 
              display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14,
              animation: `fadeInRight 0.5s ease forwards`,
              animationDelay: `${idx * 0.1}s`,
              opacity: 0,
            }}>
              <span style={{ color: "#6366f1", fontSize: 16, flexShrink: 0, marginTop: 1 }}>→</span>
              <span style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{p}</span>
            </div>
          ))}

          <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
            <a href="#contact" style={{ padding: "12px 24px", borderRadius: 8, background: "#6366f1", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Let's Work Together
            </a>
            <a href="#" style={{ padding: "12px 24px", borderRadius: 8, background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontSize: 14, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)" }}>
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [activeTab, setActiveTab] = useState("Frontend");
  const categories = Object.keys(SKILLS);

  return (
    <section id="skills" style={{ padding: "100px clamp(16px,5vw,60px)", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Technical Skills"
          title="Expertise Across the Stack"
          subtitle="From pixel-perfect frontends to intelligent automation systems — here's what I bring to your project."
        />

        {/* Tab nav */}
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 48, flexWrap: "wrap", background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 6, border: "1px solid rgba(255,255,255,0.06)", maxWidth: 600, margin: "0 auto 48px" }}>
          {categories.map((cat, idx) => (
            <button key={cat} onClick={() => setActiveTab(cat)} style={{
              padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s",
              background: activeTab === cat ? "#6366f1" : "transparent",
              color: activeTab === cat ? "#fff" : "#64748b",
              letterSpacing: "0.02em",
              animation: `fadeInUp 0.5s ease forwards`,
              animationDelay: `${idx * 0.1}s`,
              opacity: 0,
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {SKILLS[activeTab as keyof typeof SKILLS].map((skill: { name: string; level: number }, idx: number) => (
            <div key={skill.name} style={{
              padding: "20px 24px", borderRadius: 14, background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)", transition: "border-color 0.2s",
              animation: `fadeInUp 0.5s ease forwards`,
              animationDelay: `${idx * 0.1}s`,
              opacity: 0,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{skill.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#6366f1" }}>{skill.level}%</span>
              </div>
              <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <div style={{ width: `${skill.level}%`, height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", transition: "width 0.8s ease" }} />
              </div>
            </div>
          ))}
        </div>

        {/* All tech tags */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 20 }}>Full Tech Inventory</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["React", "TypeScript", "Next.js", "Tailwind CSS", "Django", "Node.js", "n8n", "OpenAI API", "Docker", "PostgreSQL", "MongoDB", "Redis", "Stripe", "WebSockets", "GraphQL", "GitHub Actions", "Linux", "Framer Motion"].map((t, idx) => (
              <TechBadge key={t} name={t} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="projects" style={{ padding: "100px clamp(16px,5vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Featured Projects"
          title="Work That Ships and Scales"
          subtitle="Each project is a business problem solved — not just a technical exercise."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }} className="projects-grid">
          {PROJECTS.map((p, idx) => (
            <div
              key={p.id}
              style={{
                borderRadius: 20, overflow: "hidden", background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", transition: "all 0.25s",
                animation: `fadeInUp 0.5s ease forwards`,
                animationDelay: `${idx * 0.1}s`,
                opacity: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = p.accent + "60"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 20px 60px ${p.accent}18`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              onClick={() => setActiveProject(activeProject === p.id ? null : p.id)}
            >
              {/* Card header */}
              <div style={{ padding: "28px 28px 20px", background: `linear-gradient(135deg, ${p.accent}18, transparent)`, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <Badge accent={p.accent}>{p.badge}</Badge>
                  <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>{p.category}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 10, fontFamily: "'Syne', sans-serif", lineHeight: 1.2 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{p.problem}</p>
              </div>

              {/* Metrics */}
              <div style={{ padding: "16px 28px", display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.05)" }} className="project-metrics">
                {Object.entries(p.metrics).map(([k, v], i) => (
                  <div key={k} style={{ flex: 1, textAlign: "center", padding: "8px 4px", borderRight: i < Object.entries(p.metrics).length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: p.accent, fontFamily: "'Syne', sans-serif" }}>{v}</div>
                    <div style={{ fontSize: 10, color: "#64748b", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{k}</div>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div style={{ padding: "16px 28px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.stack.slice(0, 5).map((t, i) => (
                  <span key={t} style={{ 
                    fontSize: 11, fontWeight: 600, color: "#64748b", background: "rgba(255,255,255,0.04)", 
                    padding: "3px 9px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)",
                    animation: `fadeInUp 0.5s ease forwards`,
                    animationDelay: `${i * 0.05}s`,
                    opacity: 0,
                  }}>{t}</span>
                ))}
                {p.stack.length > 5 && <span style={{ fontSize: 11, color: "#64748b", padding: "3px 9px" }}>+{p.stack.length - 5}</span>}
              </div>

              {/* Expanded content */}
              {activeProject === p.id && (
                <div style={{ padding: "0 28px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ padding: "16px 0" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Solution</p>
                    <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>{p.solution}</p>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Results</p>
                    {p.results.map(r => (
                      <div key={r} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                        <span style={{ color: "#10b981", fontSize: 14 }}>✓</span>
                        <span style={{ fontSize: 13, color: "#94a3b8" }}>{r}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <a href={p.demo} style={{ flex: 1, padding: "9px 16px", borderRadius: 8, background: p.accent, color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none", textAlign: "center" }}>
                      Live Demo ↗
                    </a>
                    <a href={p.github} style={{ flex: 1, padding: "9px 16px", borderRadius: 8, background: "rgba(255,255,255,0.05)", color: "#94a3b8", fontSize: 12, fontWeight: 700, textDecoration: "none", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
                      GitHub ↗
                    </a>
                  </div>
                </div>
              )}

              <div style={{ padding: "12px 28px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                <span style={{ fontSize: 12, color: "#4b5563" }}>{activeProject === p.id ? "Collapse" : "Expand"}</span>
                <span style={{ color: "#4b5563", transition: "transform 0.2s", transform: activeProject === p.id ? "rotate(180deg)" : "none" }}>▾</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section id="case-studies" style={{ padding: "100px clamp(16px,5vw,60px)", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader eyebrow="Case Study" title="Deep Dive: AI Lead Generation Engine" subtitle="A detailed breakdown of architecture, decisions, and measurable outcomes." />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="case-study-grid">
          {[
            { title: "01 — Problem", color: "#ef4444", content: "Sales team spending 40+ hours weekly on manual lead research. No consistent qualification criteria. Slow follow-up times averaging 48 hours. CRM data was always outdated or incomplete." },
            { title: "02 — Architecture Decision", color: "#6366f1", content: "Chose n8n for orchestration over custom Python scheduler — faster iteration, visual debugging, and non-technical stakeholder visibility. Used GPT-4 for enrichment rather than rules-based scoring." },
            { title: "03 — Technical Approach", color: "#06b6d4", content: "LinkedIn data ingestion → GPT-4 enrichment + scoring → HubSpot CRM sync → personalized email via SendGrid → Slack notifications for high-score leads. Postgres for state management." },
            { title: "04 — Challenges Solved", color: "#f59e0b", content: "Rate limiting on LinkedIn API required exponential backoff + queue management. GPT-4 cost control via caching repeated company descriptions. CRM sync idempotency to prevent duplicate records." },
            { title: "05 — Performance Gains", color: "#10b981", content: "Lead research time: 40h → 5h/week. Response time: 48h → 2h avg. Qualified pipeline volume increased 3x. Error rate on CRM data dropped from 18% to 0.8%. System ROI: 6 weeks." },
            { title: "06 — Stack Used", color: "#8b5cf6", content: "n8n (self-hosted), OpenAI GPT-4 API, HubSpot CRM API, SendGrid API, PostgreSQL, Docker Compose, GitHub Actions for deployment, Grafana for monitoring." },
          ].map((item, idx) => (
            <div key={item.title} style={{ 
              padding: "28px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
              animation: `fadeInUp 0.5s ease forwards`,
              animationDelay: `${idx * 0.1}s`,
              opacity: 0,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: item.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{item.title}</div>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.75 }}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding: "100px clamp(16px,5vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader eyebrow="Services" title="What I Build for You" subtitle="From initial architecture to production deployment — end-to-end, with accountability for results." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }} className="services-grid">
          {SERVICES.map((s, idx) => (
            <div key={s.title} style={{
              padding: "32px 28px", borderRadius: 18, background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.25s",
              animation: `fadeInUp 0.5s ease forwards`,
              animationDelay: `${idx * 0.1}s`,
              opacity: 0,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.background = "rgba(99,102,241,0.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
            >
              <div style={{ fontSize: 32, marginBottom: 18, color: "#6366f1" }}>{s.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", marginBottom: 10, fontFamily: "'Syne', sans-serif" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {s.tags.map((t, i) => (
                  <span key={t} style={{ 
                    fontSize: 11, fontWeight: 600, color: "#6366f1", background: "rgba(99,102,241,0.1)", 
                    padding: "3px 9px", borderRadius: 6,
                    animation: `fadeInUp 0.5s ease forwards`,
                    animationDelay: `${(idx * 0.1) + (i * 0.05)}s`,
                    opacity: 0,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: "100px clamp(16px,5vw,60px)", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader eyebrow="Client Feedback" title="What People Say" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }} className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={t.name} style={{ 
              padding: "32px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", position: "relative",
              animation: `fadeInUp 0.5s ease forwards`,
              animationDelay: `${idx * 0.1}s`,
              opacity: 0,
            }}>
              <div style={{ fontSize: 48, color: "rgba(99,102,241,0.2)", fontFamily: "serif", lineHeight: 1, marginBottom: 16 }}>"</div>
              <StarRating count={t.stars} />
              <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.75, margin: "16px 0 24px", fontStyle: "italic" }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff" }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" style={{ padding: "100px clamp(16px,5vw,60px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader eyebrow="Writing" title="Technical Insights" subtitle="Patterns, lessons, and deep-dives from building in production." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }} className="blog-grid">
          {BLOG_POSTS.map((post, idx) => (
            <a key={post.title} href="#" style={{ textDecoration: "none" }}>
              <div style={{
                padding: "28px", borderRadius: 18, background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)", height: "100%", transition: "all 0.2s", cursor: "pointer",
                animation: `fadeInUp 0.5s ease forwards`,
                animationDelay: `${idx * 0.1}s`,
                opacity: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", background: "rgba(99,102,241,0.1)", padding: "3px 10px", borderRadius: 6, letterSpacing: "0.05em" }}>{post.tag}</span>
                  <span style={{ fontSize: 11, color: "#4b5563", fontWeight: 500 }}>{post.readTime} read</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.4, marginBottom: 12, fontFamily: "'Syne', sans-serif" }}>{post.title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, marginBottom: 20 }}>{post.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#4b5563" }}>{post.date}</span>
                  <span style={{ fontSize: 12, color: "#6366f1", fontWeight: 600 }}>Read more →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "project", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <section id="contact" style={{ padding: "100px clamp(16px,5vw,60px)", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader eyebrow="Get In Touch" title="Let's Build Something Together" subtitle="Have a project in mind? Let's discuss how I can help you ship faster." />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48, alignItems: "start" }} className="contact-grid">
          {/* Left: Info */}
          <div>
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 20, fontFamily: "'Syne', sans-serif" }}>Preferred Collaborations</h3>
              {["SaaS product development (full-stack)", "AI/n8n workflow automation systems", "API architecture & integration projects", "Technical co-founder partnerships"].map((i, idx) => (
                <div key={i} style={{ 
                  display: "flex", gap: 10, alignItems: "center", marginBottom: 10,
                  animation: `fadeInRight 0.5s ease forwards`,
                  animationDelay: `${idx * 0.1}s`,
                  opacity: 0,
                }}>
                  <span style={{ color: "#6366f1", fontSize: 13 }}>→</span>
                  <span style={{ fontSize: 14, color: "#94a3b8" }}>{i}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 36 }}>
              {[
                { label: "Email", val: "onyebuchifestus77@gmail.com", icon: "✉" },
                { label: "LinkedIn", val: "", icon: "◈" },
                { label: "GitHub", val: "https://github.com/Buchi77344", icon: "⎈" },
                { label: "Calendly", val: "Book a 30-min call", icon: "◷" },
              ].map((c, idx) => (
                <div key={c.label} style={{ 
                  display: "flex", gap: 14, alignItems: "center", marginBottom: 18, 
                  padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                  animation: `fadeInUp 0.5s ease forwards`,
                  animationDelay: `${idx * 0.1}s`,
                  opacity: 0,
                }}>
                  <span style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#6366f1", flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#4b5563", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.label}</div>
                    <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ 
              padding: "18px 20px", borderRadius: 14, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)",
              animation: `fadeInUp 0.5s ease forwards`,
              animationDelay: `0.4s`,
              opacity: 0,
            }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981", letterSpacing: "0.06em" }}>AVAILABLE NOW</span>
              </div>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>Currently open to full-time remote roles and select freelance projects. Response time: typically within 24 hours.</p>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ 
            background: "rgba(255,255,255,0.02)", borderRadius: 20, padding: "36px", border: "1px solid rgba(255,255,255,0.07)",
            animation: `fadeInUp 0.5s ease forwards`,
            animationDelay: `0.5s`,
            opacity: 0,
          }} className="contact-form">
            {sent ? (
              <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#10b981", fontFamily: "'Syne', sans-serif", marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ fontSize: 15, color: "#94a3b8" }}>I'll get back to you within 24 hours. Looking forward to connecting!</p>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name *</label>
                    <input
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f5f9", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email *</label>
                    <input
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      type="email"
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f5f9", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>I'm Looking For</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {[["project", "A Project"], ["fulltime", "Full-time Role"], ["consultation", "Consultation"]].map(([val, label], idx) => (
                      <button key={val} onClick={() => setForm(f => ({ ...f, type: val }))} style={{
                        padding: "8px 16px", borderRadius: 8, border: `1px solid ${form.type === val ? "#6366f1" : "rgba(255,255,255,0.1)"}`,
                        background: form.type === val ? "rgba(99,102,241,0.15)" : "transparent",
                        color: form.type === val ? "#818cf8" : "#64748b", fontSize: 13, fontWeight: 600, cursor: "pointer",
                        animation: `fadeInUp 0.5s ease forwards`,
                        animationDelay: `${idx * 0.1}s`,
                        opacity: 0,
                      }}>{label}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message *</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project, goals, and timeline..."
                    rows={5}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f5f9", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  style={{ 
                    width: "100%", padding: "14px", borderRadius: 10, background: "#6366f1", color: "#fff", 
                    fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.02em", 
                    boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                    animation: `fadeInUp 0.5s ease forwards`,
                    animationDelay: `0.3s`,
                    opacity: 0,
                  }}
                >
                  Send Message →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "48px clamp(16px,5vw,60px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Syne', sans-serif" }}>
          <span style={{ color: "#6366f1" }}>{"<"}</span>
          <span style={{ color: "#f1f5f9" }}>Onyebuchi Festus</span>
          <span style={{ color: "#6366f1" }}>{">"}</span>
        </div>
        <p style={{ fontSize: 14, color: "#4b5563", textAlign: "center" }}>Full Stack Developer & AI Automation Engineer · Available for Remote Work</p>
        <div style={{ display: "flex", gap: 24 }} className="footer-links">
          {["GitHub", "LinkedIn", "Email", "Resume"].map((l, idx) => (
            <a key={l} href="#" style={{ 
              fontSize: 13, color: "#4b5563", textDecoration: "none", fontWeight: 500, transition: "color 0.2s",
              animation: `fadeInUp 0.5s ease forwards`,
              animationDelay: `${idx * 0.1}s`,
              opacity: 0,
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "#818cf8"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "#4b5563"}
            >{l}</a>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#1e293b" }}>© 2025 Alex Morgan. Built with React & TypeScript.</p>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Load fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);

    // Intersection observer
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      background: "#050714",
      color: "#f1f5f9",
      minHeight: "100vh",
      lineHeight: 1.5,
      width: "100%",
      margin: 0,
      padding: 0,
      position: "relative",
      left: 0,
      right: 0,
      overflowX: "hidden",
    }}>
      <style>{`
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        html, body { 
          width: 100%; 
          max-width: 100%; 
          overflow-x: hidden; 
          margin: 0;
          padding: 0;
          background: #050714;
        }
        #root {
          width: 100%;
          max-width: 100%;
          margin: 0;
          padding: 0;
        }
        html { 
          scroll-behavior: smooth; 
        }
        ::selection { 
          background: rgba(99,102,241,0.3); 
          color: #f1f5f9; 
        }
        ::-webkit-scrollbar { 
          width: 6px; 
        }
        ::-webkit-scrollbar-track { 
          background: #050714; 
        }
        ::-webkit-scrollbar-thumb { 
          background: #1e293b; 
          border-radius: 3px; 
        }
        input::placeholder, textarea::placeholder { 
          color: #374151; 
        }
        
        /* Animation Keyframes */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Responsive Styles */
        @media (max-width: 1200px) {
          .about-grid { gap: 60px !important; }
          .case-study-grid { gap: 24px !important; }
          .projects-grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important; }
        }
        
        @media (max-width: 1024px) {
          .about-grid { gap: 48px !important; }
          .contact-grid { gap: 40px !important; }
        }
        
        @media (max-width: 900px) {
          .contact-grid { gap: 32px !important; }
          .case-study-grid { grid-template-columns: 1fr !important; }
        }
        
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          
          .about-grid { 
            grid-template-columns: 1fr !important; 
            gap: 40px !important;
          }
          
          .contact-grid { 
            grid-template-columns: 1fr !important; 
          }
          
          .stat-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
            width: 50% !important;
            padding: 20px !important;
          }
          
          .stat-item:last-child {
            border-bottom: none !important;
          }
        }
        
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr !important; }
          .footer-links { flex-wrap: wrap !important; justify-content: center !important; gap: 16px !important; }
          .stat-item { width: 100% !important; }
          .contact-form { padding: 24px !important; }
        }
        
        @media (max-width: 480px) {
          .projects-grid { 
            grid-template-columns: 1fr !important; 
          }
          
          .services-grid { 
            grid-template-columns: 1fr !important; 
          }
          
          .testimonials-grid { 
            grid-template-columns: 1fr !important; 
          }
          
          .blog-grid { 
            grid-template-columns: 1fr !important; 
          }
          
          .project-metrics { 
            flex-direction: column !important;
            gap: 12px !important;
          }
          
          .project-metrics > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
            padding-bottom: 12px !important;
          }
          
          .project-metrics > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>

      <Nav activeSection={activeSection} />
      <main style={{ width: "100%", maxWidth: "100%", margin: 0, padding: 0 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CaseStudy />
        <Services />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}