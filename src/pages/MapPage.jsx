import { useState } from "react"
import { AnimatePresence } from "framer-motion"

import MapContainer from "../components/Map/MapContainer"
import Sidebar from "../components/UI/Sidebar"
import ProjectDetailPanel from "../components/UI/ProjectDetailPanel"
import BottomBar from "../components/UI/BottomBar"
import StyleSwitcher from "../components/UI/StyleSwitcher"
import { useMapLayers } from "../hooks/useMapLayers"
import { projects } from "../data/projects"

export default function MapPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [mapInstance, setMapInstance] = useState(null)
  const { activeLayers, toggleLayer } = useMapLayers()

  function handleProjectClick(project) {
    setSelectedProject(project)
  }

  function handlePanelClose() {
    setSelectedProject(null)
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Base map layer */}
      <MapContainer
        projects={projects}
        activeLayers={activeLayers}
        selectedProject={selectedProject}
        onProjectClick={handleProjectClick}
        onMapReady={setMapInstance}
      />

{/* Left sidebar — z-index 20 */}
      <Sidebar activeLayers={activeLayers} onToggleLayer={toggleLayer} />

      {mapInstance && <StyleSwitcher map={mapInstance} />}

      {/* Right detail panel — z-index 50, animated */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailPanel
            key={selectedProject.id}
            project={selectedProject}
            onClose={handlePanelClose}
          />
        )}
      </AnimatePresence>

      {/* Bottom projects bar — z-index 30 */}
      <BottomBar
        projects={projects}
        selectedProject={selectedProject}
        onProjectSelect={handleProjectClick}
      />
    </div>
  )
}
