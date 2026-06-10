import { useState } from "react"

const NAV_ITEMS = [
  {
    key: "projects",
    label: "Projects",
    alwaysActive: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    key: "education",
    label: "Education",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.1 2.686 2 6 2s6-.9 6-2v-5" />
      </svg>
    ),
  },
  {
    key: "hospitals",
    label: "Hospitals",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    key: "shopping",
    label: "Shopping",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    key: "metro",
    label: "Metro",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <rect x="5" y="2" width="14" height="16" rx="2" />
        <path d="M5 10h14M8 18l-2 4M16 18l2 4M9 6h.01M15 6h.01" />
      </svg>
    ),
  },
  {
    key: "roads",
    label: "Roads",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M5 21l7-18 7 18" />
        <path d="M5 21h14" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12" y2="17" />
      </svg>
    ),
  },
]

export default function Sidebar({ activeLayers, onToggleLayer }) {
  const [hoveredKey, setHoveredKey] = useState(null)

  return (
    <div
      style={{
        position: "absolute",
        left: 14,
        top: "50%",
        transform: "translateY(-50%)",
        width: 60,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 14,
        paddingBottom: 14,
        gap: 6,
        background: "rgba(10, 12, 20, 0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "linear-gradient(135deg, #2563eb, #7c3aed)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 24 24" fill="white" width={18} height={18}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" fill="white" />
        </svg>
      </div>

      {NAV_ITEMS.map((item) => {
        const isActive = item.alwaysActive || activeLayers[item.key]
        const isHovered = hoveredKey === item.key

        return (
          <div
            key={item.key}
            style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}
            onMouseEnter={() => setHoveredKey(item.key)}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <button
              onClick={() => !item.alwaysActive && onToggleLayer(item.key)}
              style={{
                width: 46,
                height: 46,
                borderRadius: 10,
                border: "none",
                cursor: item.alwaysActive ? "default" : "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                background: isActive
                  ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                  : "transparent",
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
                transition: "all 0.18s ease",
                boxShadow: isActive ? "0 2px 12px rgba(37,99,235,0.4)" : "none",
                outline: "none",
              }}
            >
              {item.icon}
              <span style={{ fontSize: 8, fontWeight: 500, letterSpacing: "0.03em", lineHeight: 1 }}>
                {item.label}
              </span>
            </button>

            {/* Floating tooltip */}
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  left: "calc(100% + 10px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(12,14,22,0.92)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 7,
                  padding: "5px 10px",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  zIndex: 100,
                }}
              >
                {item.label}
                {!item.alwaysActive && (
                  <span style={{ marginLeft: 6, opacity: 0.5, fontSize: 10 }}>
                    {activeLayers[item.key] ? "on" : "off"}
                  </span>
                )}
                {/* Arrow */}
                <div
                  style={{
                    position: "absolute",
                    left: -5,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 0,
                    height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderRight: "5px solid rgba(12,14,22,0.92)",
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
