import { useState } from "react"

export function useMapLayers() {
  const [activeLayers, setActiveLayers] = useState({
    education: false,
    hospitals: false,
    shopping: false,
    metro: false,
    roads: false,
  })

  const toggleLayer = (key) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return { activeLayers, toggleLayer }
}
