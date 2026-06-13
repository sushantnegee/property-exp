const DEFAULT_CENTER = [46.6753, 24.7136]
const DEFAULT_ZOOM = 13
const DEFAULT_PITCH = 30
const ZOOM_DELTA = 0.5

const CONTROLS = [
  {
    key: "in",
    title: "Zoom in",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={16} height={16}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    key: "out",
    title: "Zoom out",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={16} height={16}>
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    key: "fit",
    title: "Fit to screen",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="7" />
        <line x1="12" y1="17" x2="12" y2="22" />
        <line x1="2" y1="12" x2="7" y2="12" />
        <line x1="17" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
]

const LAST = CONTROLS.length - 1

export default function MapControls({ map }) {
  function handleClick(key) {
    if (!map) return
    if (key === "in")  map.easeTo({ zoom: map.getZoom() + ZOOM_DELTA, duration: 300 })
    if (key === "out") map.easeTo({ zoom: map.getZoom() - ZOOM_DELTA, duration: 300 })
    if (key === "fit") {
      map.stop()
      map.easeTo({
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        pitch: DEFAULT_PITCH,
        bearing: 0,
        duration: 800,
      })
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        right: 16,
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "var(--ui-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 12,
      }}
    >
      {CONTROLS.map((ctrl, index) => {
        const isFirst = index === 0
        const isLast = index === LAST
        const borderRadius = isFirst ? "12px 12px 0 0" : isLast ? "0 0 12px 12px" : "0"

        return (
          <button
            key={ctrl.key}
            title={ctrl.title}
            onClick={() => handleClick(ctrl.key)}
            style={{
              width: 44,
              height: 44,
              borderRadius,
              border: "none",
              background: "transparent",
              color: "var(--ui-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              outline: "none",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ui-hover)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
          >
            {ctrl.icon}
          </button>
        )
      })}
    </div>
  )
}
