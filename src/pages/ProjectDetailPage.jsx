import { useParams, useNavigate } from "react-router-dom"
import { projects } from "../data/projects"

const STATUS_STYLES = {
  "Ready to move":      { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
  "Under construction": { bg: "#fef9c3", color: "#a16207", dot: "#eab308" },
  "New launch":         { bg: "#dbeafe", color: "#1d4ed8", dot: "#3b82f6" },
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">Project not found.</p>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 font-medium hover:underline"
          >
            ← Back to Map
          </button>
        </div>
      </div>
    )
  }

  const status = STATUS_STYLES[project.status] || STATUS_STYLES["New launch"]

  const stats = [
    { label: "Price Range",  value: project.price },
    { label: "Configuration", value: project.config },
    { label: "Total Floors",  value: `${project.floors} Floors` },
    { label: "Total Units",   value: `${project.units} Units` },
    { label: "Possession",    value: project.possession },
    { label: "Location",      value: `${project.area}, Ahmedabad` },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top nav */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: "#475569",
            background: "none",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: "6px 14px",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8fafc"
            e.currentTarget.style.color = "#0f172a"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none"
            e.currentTarget.style.color = "#475569"
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={13} height={13}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Map
        </button>

        <div style={{ height: 20, width: 1, background: "#e2e8f0" }} />

        <span style={{ fontSize: 13, color: "#94a3b8" }}>
          {project.area}, Ahmedabad
        </span>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Hero image */}
        <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 32, boxShadow: "0 4px 32px rgba(0,0,0,0.1)" }}>
          <img
            src={project.thumbnail}
            alt={project.name}
            style={{ width: "100%", maxHeight: 400, objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            {project.name}
          </h1>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: status.bg,
              color: status.color,
              fontSize: 12,
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: 999,
              flexShrink: 0,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: status.dot }} />
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.75, marginBottom: 36 }}>
          {project.description}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: "#e2e8f0", marginBottom: 32 }} />

        {/* Stats grid */}
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 16, letterSpacing: "-0.01em" }}>
          Project Details
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 12,
            marginBottom: 40,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: "16px 18px",
              }}
            >
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 15, color: "#0f172a", fontWeight: 700 }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder section */}
        <div
          style={{
            background: "#ffffff",
            border: "1px dashed #cbd5e1",
            borderRadius: 14,
            padding: "36px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 10 }}>🏗</div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
            More details coming soon
          </h3>
          <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
            Floor plans, amenities, virtual tours and brochure will be available here shortly.
          </p>
        </div>
      </div>
    </div>
  )
}
