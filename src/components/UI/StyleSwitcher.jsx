import { useState } from "react"

const STYLES = [
  { label: "Satellite",   id: "mapbox://styles/mapbox/satellite-streets-v12" },
  { label: "Standard",    id: "mapbox://styles/mapbox/standard" },
  { label: "Dark",        id: "mapbox://styles/mapbox/dark-v11" },
  { label: "Light",       id: "mapbox://styles/mapbox/light-v11" },
  { label: "Streets",     id: "mapbox://styles/mapbox/streets-v12" },
  { label: "Nav Night",   id: "mapbox://styles/mapbox/navigation-night-v1" },
  { label: "Nav Day",     id: "mapbox://styles/mapbox/navigation-day-v1" },
]

export default function StyleSwitcher({ map }) {
  const [active, setActive] = useState("mapbox://styles/mapbox/satellite-streets-v12")

  function switchStyle(styleId) {
    if (!map || styleId === active) return
    setActive(styleId)
    map.setStyle(styleId)
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 40,
        display: "flex",
        gap: 6,
        background: "rgba(10,12,22,0.78)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 999,
        padding: "5px 8px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        pointerEvents: "auto",
      }}
    >
      {STYLES.map((s) => {
        const isActive = active === s.id
        return (
          <button
            key={s.id}
            onClick={() => switchStyle(s.id)}
            style={{
              padding: "5px 12px",
              borderRadius: 999,
              border: "none",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "all 0.18s ease",
              background: isActive
                ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                : "transparent",
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
              boxShadow: isActive ? "0 2px 10px rgba(37,99,235,0.4)" : "none",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.9)"
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.5)"
            }}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
