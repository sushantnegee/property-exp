import { useState, useRef, useEffect } from "react"

const STYLES = [
  { label: "Satellite",  id: "mapbox://styles/mapbox/satellite-v9" },
  { label: "Dark",       id: "mapbox://styles/mapbox/dark-v11" },
  { label: "Standard",   id: "mapbox://styles/mapbox/standard" },
  { label: "Light",      id: "mapbox://styles/mapbox/light-v11" },
  { label: "Streets",    id: "mapbox://styles/mapbox/streets-v12" },
  { label: "Outdoors",   id: "mapbox://styles/mapbox/outdoors-v12" },
  { label: "Nav Night",  id: "mapbox://styles/mapbox/navigation-night-v1" },
  { label: "Nav Day",    id: "mapbox://styles/mapbox/navigation-day-v1" },
]

export default function StyleSwitcher({ map }) {
  const [active, setActive] = useState(STYLES[0].id)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const activeLabel = STYLES.find((s) => s.id === active)?.label ?? "Style"

  function switchStyle(styleId) {
    if (!map || styleId === active) { setOpen(false); return }
    setActive(styleId)
    setOpen(false)
    map.setStyle(styleId)
  }

  // Close on outside click
  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", onOutside)
    return () => document.removeEventListener("mousedown", onOutside)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 40,
        pointerEvents: "auto",
        userSelect: "none",
      }}
    >
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 16px",
          background: "rgba(10,12,22,0.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.13)",
          borderRadius: 999,
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.04em",
          cursor: "pointer",
          boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
          outline: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ opacity: 0.5, fontSize: 10 }}>MAP STYLE</span>
        <span>{activeLabel}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            opacity: 0.6,
          }}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown list */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(10,12,22,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
            minWidth: 160,
          }}
        >
          {STYLES.map((s) => {
            const isActive = active === s.id
            return (
              <button
                key={s.id}
                onClick={() => switchStyle(s.id)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "9px 18px",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(37,99,235,0.35), rgba(124,58,237,0.35))"
                    : "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.03em",
                  textAlign: "left",
                  cursor: "pointer",
                  outline: "none",
                  transition: "background 0.15s ease, color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)"
                    e.currentTarget.style.color = "#fff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent"
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)"
                  }
                }}
              >
                {isActive && (
                  <span style={{ marginRight: 8, opacity: 0.8 }}>✓</span>
                )}
                {s.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
