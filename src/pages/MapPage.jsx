import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"

import MapContainer from "../components/Map/MapContainer"
import Sidebar from "../components/UI/Sidebar"
import ProjectDetailPanel from "../components/UI/ProjectDetailPanel"
import BottomBar from "../components/UI/BottomBar"
import StyleSwitcher from "../components/UI/StyleSwitcher"
import MapControls from "../components/UI/MapControls"
import TopRightControls from "../components/UI/TopRightControls"
import LoadingScreen from "../components/UI/LoadingScreen"
import { useMapLayers } from "../hooks/useMapLayers"
import { projects } from "../data/projects"
import logoDark from "../assets/logo-dark.png"
import logoLight from "../assets/logo-light.png"

const DEFAULT_STYLE = "mapbox://styles/mapbox/satellite-v9"

export default function MapPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [mapInstance, setMapInstance] = useState(null)
  const [timerDone, setTimerDone] = useState(false)
  const [theme, setTheme] = useState("dark")
  const [mapStyle, setMapStyle] = useState(DEFAULT_STYLE)
  const { activeLayers, toggleLayer } = useMapLayers()

  // DEBUG: keep loader visible for 2s
  useEffect(() => {
    const t = setTimeout(() => setTimerDone(true), 2000)
    return () => clearTimeout(t)
  }, [])

  // Intro zoom-in: ease from overview to target view when loader finishes
  useEffect(() => {
    if (!mapInstance || !timerDone) return
    mapInstance.easeTo({
      center: [46.6753, 24.7136],
      zoom: 13,
      pitch: 30,
      bearing: 0,
      duration: 2000,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }, [mapInstance, timerDone])

  function handleProjectClick(project) {
    setSelectedProject(project)
  }

  function handlePanelClose() {
    setSelectedProject(null)
  }

  function handleStyleChange(styleId) {
    setMapStyle(styleId)
    if (mapInstance) mapInstance.setStyle(styleId)
  }

  function handleToggleTheme() {
    setTheme((t) => t === "dark" ? "light" : "dark")
  }

  return (
    <div
      data-theme={theme}
      style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      {/* Base map layer */}
      <MapContainer
        projects={projects}
        activeLayers={activeLayers}
        selectedProject={selectedProject}
        onProjectClick={handleProjectClick}
        onMapReady={setMapInstance}
      />

      {/* Logo — top left */}
      <div style={{
        position: "absolute", top: 14, left: 16, zIndex: 40, pointerEvents: "none",
        background: "var(--ui-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 12,
        padding: "8px 14px",
      }}>
        <img
          src={theme === "dark" ? logoDark : logoLight}
          alt="Musaedoon Real Estate"
          style={{ height: 34, width: "auto", display: "block" }}
        />
      </div>

      {/* Left sidebar */}
      <Sidebar activeLayers={activeLayers} onToggleLayer={toggleLayer} />

      {/* StyleSwitcher disabled
      {mapInstance && (
        <StyleSwitcher
          map={mapInstance}
          activeStyle={mapStyle}
          onStyleChange={handleStyleChange}
        />
      )} */}
      <TopRightControls theme={theme} onToggleTheme={handleToggleTheme} />
      {mapInstance && <MapControls map={mapInstance} />}

      {/* Loading screen */}
      <AnimatePresence>
        {(!mapInstance || !timerDone) && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {/* Right detail panel */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailPanel
            key={selectedProject.id}
            project={selectedProject}
            onClose={handlePanelClose}
          />
        )}
      </AnimatePresence>

      {/* Bottom projects bar */}
      <BottomBar
        projects={projects}
        selectedProject={selectedProject}
        onProjectSelect={handleProjectClick}
      />
    </div>
  )
}
