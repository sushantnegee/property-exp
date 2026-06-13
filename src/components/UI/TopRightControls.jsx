import { useState, useEffect, useRef } from "react"

export default function TopRightControls({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onFsChange() { setIsFullscreen(!!document.fullscreenElement) }
    document.addEventListener("fullscreenchange", onFsChange)
    return () => document.removeEventListener("fullscreenchange", onFsChange)
  }, [])

  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", onOutside)
    return () => document.removeEventListener("mousedown", onOutside)
  }, [])

  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen()
    else document.exitFullscreen()
    setOpen(false)
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => { setCopied(false); setOpen(false) }, 1500)
    })
  }

  function handleTheme() {
    onToggleTheme()
    setOpen(false)
  }

  const isLight = theme === "light"

  const itemStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "11px 16px",
    border: "none",
    background: "transparent",
    color: "var(--ui-color)",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    outline: "none",
    textAlign: "left",
  }

  return (
    <div ref={ref} style={{ position: "absolute", top: 14, right: 16, zIndex: 40 }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          border: "none",
          background: "var(--ui-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: "var(--ui-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          outline: "none",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ui-hover)" }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--ui-bg)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={18} height={18}>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "var(--ui-bg)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: 12,
            overflow: "hidden",
            minWidth: 180,
          }}
        >
          {/* Theme toggle */}
          <button
            onClick={handleTheme}
            style={{ ...itemStyle, borderBottom: "1px solid var(--ui-border)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ui-hover)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
          >
            {isLight ? (
              /* Moon icon — switch to dark */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              /* Sun icon — switch to light */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
            {isLight ? "Dark Mode" : "Light Mode"}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            style={{ ...itemStyle, borderBottom: "1px solid var(--ui-border)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ui-hover)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
          >
            {isFullscreen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                <path d="M3 8V5h3M21 8V5h-3M3 16v3h3M21 16v3h-3" />
              </svg>
            )}
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            style={{ ...itemStyle, color: copied ? "#4ade80" : "var(--ui-color)", transition: "color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ui-hover)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
          >
            {copied ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            )}
            {copied ? "Link Copied!" : "Share"}
          </button>
        </div>
      )}
    </div>
  )
}
