import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STATUS_COLORS = {
  "Ready to move":      { bg: "#dcfce7", color: "#15803d" },
  "Under construction": { bg: "#fef9c3", color: "#a16207" },
  "New launch":         { bg: "#dbeafe", color: "#1d4ed8" },
}

export default function BottomBar({ projects, selectedProject, onProjectSelect }) {
  const [isOpen, setIsOpen] = useState(false)

  // Collapse list when a project is selected
  useEffect(() => {
    if (selectedProject) setIsOpen(false)
  }, [selectedProject])

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Button — always on top of the panel */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        style={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 18px",
          margin: "10px 0 8px 0",
          background: "var(--ui-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "none",
          borderRadius: 12,
          color: "var(--ui-color)",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          letterSpacing: "0.02em",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          outline: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          width={13}
          height={13}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
        All Projects
      </button>

      {/* Panel — expands below button, pushes button up smoothly */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            style={{
              width: "100%",
              overflow: "hidden",
              pointerEvents: "auto",
              background: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  overflowX: "auto",
                  paddingTop:3,
                  paddingBottom: 3,
                  scrollbarWidth: "none",
                  maxWidth: "75vw",
                  borderRadius: 10,
                }}
              >
                {projects.map((project) => {
                  const isSelected = selectedProject?.id === project.id
                  const status = STATUS_COLORS[project.status] || STATUS_COLORS["New launch"]

                  return (
                    <button
                      key={project.id}
                      onClick={() => onProjectSelect(project)}
                      style={{
                        flexShrink: 0,
                        width: 200,
                        height: 110,
                        display: "flex",
                        border: isSelected
                          ? "2px solid var(--card-border-selected)"
                          : "1px solid var(--card-border-default)",
                        borderRadius: 12,
                        overflow: "hidden",
                        cursor: "pointer",
                        background: "var(--ui-bg)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        transition: "border 0.15s, box-shadow 0.15s",
                        outline: "none",
                        boxShadow: isSelected
                          ? "0 0 0 1px rgba(255,255,255,0.4), 0 4px 16px rgba(0,0,0,0.3)"
                          : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = "var(--card-border-hover)"
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = "var(--card-border-default)"
                      }}
                    >
                      <div style={{ width: 80, flexShrink: 0 }}>
                        <img
                          src={project.thumbnail}
                          alt={project.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: "9px 10px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          textAlign: "left",
                          overflow: "hidden",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "var(--card-text)",
                              lineHeight: 1.3,
                              marginBottom: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {project.name}
                          </div>
                          <div style={{ fontSize: 11, color: "var(--card-text-muted)", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {project.area}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 600, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {project.price}
                          </div>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              padding: "2px 7px",
                              borderRadius: 999,
                              background: status.bg,
                              color: status.color,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
