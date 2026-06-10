import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const STATUS_STYLES = {
  "Ready to move":      { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
  "Under construction": { bg: "#fef9c3", color: "#a16207", dot: "#eab308" },
  "New launch":         { bg: "#dbeafe", color: "#1d4ed8", dot: "#3b82f6" },
}

export default function ProjectDetailPanel({ project, onClose }) {
  const navigate = useNavigate()
  const status = STATUS_STYLES[project.status] || STATUS_STYLES["New launch"]

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        width: "clamp(320px, 380px, 100vw)",
        background: "#ffffff",
        zIndex: 50,
        boxShadow: "-8px 0 40px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", width: "100%", height: 220, flexShrink: 0 }}>
        <img
          src={project.thumbnail}
          alt={project.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Dark gradient over image bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
          }}
        />

        {/* Status badge */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 14,
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: status.bg,
            color: status.color,
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 999,
            letterSpacing: "0.02em",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: status.dot,
              flexShrink: 0,
            }}
          />
          {project.status}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.75)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={14} height={14}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Info section */}
      <div style={{ padding: "20px 20px 0", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Name */}
        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#0f172a",
            lineHeight: 1.25,
            marginBottom: 6,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {project.name}
        </h2>

        {/* Area */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 14 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" width={13} height={13}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{project.area}, Ahmedabad</span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 13,
            color: "#475569",
            lineHeight: 1.65,
            marginBottom: 20,
          }}
        >
          {project.description}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: "#f1f5f9", marginBottom: 20 }} />

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
            marginBottom: 24,
          }}
        >
          <StatCell label="Price" value={project.price} />
          <div style={{ background: "#e2e8f0" }} />
          <StatCell label="Config" value={project.config} />
          <div style={{ background: "#e2e8f0" }} />
          <StatCell label="Floors" value={`${project.floors} Flr`} />
        </div>

        {/* Secondary stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
            marginBottom: 28,
          }}
        >
          <StatCell label="Units" value={project.units} />
          <div style={{ background: "#e2e8f0" }} />
          <StatCell label="Possession" value={project.possession} />
        </div>
      </div>

      {/* Explore button — pinned to bottom */}
      <div style={{ padding: "0 20px 24px", flexShrink: 0 }}>
        <button
          onClick={() => navigate(`/project/${project.id}`)}
          style={{
            width: "100%",
            padding: "13px 0",
            background: "#0f172a",
            color: "#ffffff",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "background 0.18s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#0f172a")}
        >
          Explore Project
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={14} height={14}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

function StatCell({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "0 8px" }}>
      <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </span>
      <span style={{ fontSize: 13, color: "#0f172a", fontWeight: 700, textAlign: "center" }}>
        {value}
      </span>
    </div>
  )
}
