
const NAV_ITEMS = [
  {
    key: "landmarks",
    label: "Landmarks",
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

const LAST = NAV_ITEMS.length - 1

export default function Sidebar({ activeLayers, onToggleLayer }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 14,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "var(--ui-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 12,
      }}
    >
      {NAV_ITEMS.map((item, index) => {
        const isActive = item.alwaysActive || activeLayers[item.key]
        const isFirst = index === 0
        const isLast = index === LAST

        const borderRadius = isFirst
          ? "12px 12px 0 0"
          : isLast
          ? "0 0 12px 12px"
          : "0"

        return (
          <div
            key={item.key}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            <button
              onClick={() => !item.alwaysActive && onToggleLayer(item.key)}
              style={{
                width: 64,
                height: 56,
                borderRadius,
                border: "none",
                cursor: item.alwaysActive ? "default" : "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                background: isActive ? "var(--ui-active-bg)" : "transparent",
                color: isActive ? "var(--ui-active-color)" : "var(--ui-color)",
                transition: "background 0.18s ease, color 0.18s ease",
                outline: "none",
              }}
            >
              {item.icon}
              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1 }}>
                {item.label}
              </span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
