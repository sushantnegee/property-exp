import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import * as turf from "@turf/turf"
import { layers as layerData } from "../../data/layers"

const RADIUS_IDS = ["radius-1km", "radius-3km", "radius-5km"]
const RADIUS_DISTANCES = [1, 3, 5]

// SVG icons per layer key
const POI_ICONS = {
  education: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.686 2 6 2s6-.9 6-2v-5"/></svg>`,
  hospitals: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  shopping:  `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  metro:     `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11"><rect x="5" y="2" width="14" height="16" rx="2"/><path d="M5 10h14M8 18l-2 4M16 18l2 4M9 6h.01M15 6h.01"/></svg>`,
}

function createPoiMarkerEl(key, color, name) {
  const wrapper = document.createElement("div")
  wrapper.style.cssText = "display:flex;flex-direction:column;align-items:center;gap:3px;"

  const icon = document.createElement("div")
  icon.style.cssText = `
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${color};
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `
  icon.innerHTML = POI_ICONS[key] || POI_ICONS.education

  const label = document.createElement("div")
  label.style.cssText = `
    background: rgba(0,0,0,0.72);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    padding: 3px 7px;
    border-radius: 5px;
    white-space: nowrap;
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.02em;
    opacity: 0;
    transform: translateY(2px);
    transition: opacity 0.18s ease, transform 0.18s ease;
    pointer-events: none;
    margin-top: 3px;
  `
  label.textContent = name

  wrapper.addEventListener("mouseenter", () => {
    label.style.opacity = "1"
    label.style.transform = "translateY(0)"
  })
  wrapper.addEventListener("mouseleave", () => {
    label.style.opacity = "0"
    label.style.transform = "translateY(2px)"
  })

  wrapper.appendChild(icon)
  wrapper.appendChild(label)
  return wrapper
}

function createMarkerEl(project) {
  const wrapper = document.createElement("div")
  wrapper.style.cssText = "display:flex;flex-direction:column;align-items:center;cursor:pointer;"

  const pill = document.createElement("div")
  pill.style.cssText = `
    background: rgba(10,10,20,0.72);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 999px;
    padding: 6px 14px;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
    box-shadow: 0 0 12px rgba(255,255,255,0.08), 0 2px 16px rgba(0,0,0,0.5);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    font-family: Georgia, 'Times New Roman', serif;
  `
  pill.textContent = project.name
  pill.addEventListener("mouseenter", () => {
    pill.style.transform = "scale(1.07)"
    pill.style.boxShadow = "0 0 18px rgba(255,255,255,0.18), 0 4px 20px rgba(0,0,0,0.6)"
  })
  pill.addEventListener("mouseleave", () => {
    pill.style.transform = "scale(1)"
    pill.style.boxShadow = "0 0 12px rgba(255,255,255,0.08), 0 2px 16px rgba(0,0,0,0.5)"
  })

  const line = document.createElement("div")
  line.style.cssText = "width:2px;height:18px;background:rgba(255,255,255,0.7);"

  const dot = document.createElement("div")
  dot.style.cssText = `
    width: 8px; height: 8px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(255,255,255,0.8);
  `

  wrapper.appendChild(pill)
  wrapper.appendChild(line)
  wrapper.appendChild(dot)
  return wrapper
}

export default function MapContainer({
  projects,
  activeLayers,
  selectedProject,
  onProjectClick,
  onMapReady,
}) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const poiMarkersRef = useRef({}) // { layerKey: [mapboxgl.Marker, ...] }

  // Init map
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [46.6753, 24.7136],
      zoom: 12,
      pitch: 0,
      bearing: 0,
      maxBounds: [
        [46.35, 24.45],
        [47.10, 25.10],
      ],
      minZoom: 10,
      maxZoom: 18,
    })

    mapRef.current = map

    map.on("load", () => {
      onMapReady && onMapReady(map)
      addProjectMarkers(map)
    })

    return () => {
      markersRef.current.forEach((m) => m.remove())
      Object.values(poiMarkersRef.current).forEach((arr) => arr.forEach((m) => m.remove()))
      map.remove()
    }
  }, [])

  function addProjectMarkers(map) {
    projects.forEach((project) => {
      const el = createMarkerEl(project)
      el.addEventListener("click", () => handleProjectClick(project))

      const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat(project.coordinates)
        .addTo(map)

      markersRef.current.push(marker)
    })
  }

  function handleProjectClick(project) {
    const map = mapRef.current
    if (!map) return

    onProjectClick(project)

    map.easeTo({
      center: project.coordinates,
      pitch: 45,
      bearing: -15,
      zoom: 13.5,
      duration: 1000,
    })

    addRadiusLayers(map, project.coordinates)
  }

  function addRadiusLayers(map, center) {
    removeRadiusLayers(map)

    RADIUS_DISTANCES.forEach((dist, i) => {
      const circle = turf.circle(center, dist, { steps: 64, units: "kilometers" })
      const sourceId = RADIUS_IDS[i]

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, { type: "geojson", data: circle })
      }

      // Outer glow line (wide + blurred)
      if (!map.getLayer(`${sourceId}-glow`)) {
        map.addLayer({
          id: `${sourceId}-glow`,
          type: "line",
          source: sourceId,
          paint: {
            "line-color": "#ffffff",
            "line-width": 22,
            "line-opacity": 0.22,
            "line-blur": 6,
          },
        })
      }

      // Inner crisp line
      if (!map.getLayer(`${sourceId}-line`)) {
        map.addLayer({
          id: `${sourceId}-line`,
          type: "line",
          source: sourceId,
          paint: {
            "line-color": "#ffffff",
            "line-width": 3,
            "line-opacity": 0.9,
          },
        })
      }

      const labelSourceId = `${sourceId}-label-src`
      const labelPoint = turf.destination(center, dist, 0, { units: "kilometers" })
      labelPoint.properties = { label: `${dist} KM` }

      if (!map.getSource(labelSourceId)) {
        map.addSource(labelSourceId, { type: "geojson", data: labelPoint })
      }

      if (!map.getLayer(`${sourceId}-label`)) {
        map.addLayer({
          id: `${sourceId}-label`,
          type: "symbol",
          source: labelSourceId,
          layout: {
            "text-field": ["get", "label"],
            "text-size": 11,
            "text-anchor": "bottom",
            "text-offset": [0, -0.3],
          },
          paint: {
            "text-color": "#ffffff",
            "text-halo-color": "rgba(0,0,0,0.6)",
            "text-halo-width": 1.5,
          },
        })
      }
    })
  }

  function removeRadiusLayers(map) {
    RADIUS_IDS.forEach((id) => {
      if (map.getLayer(`${id}-label`)) map.removeLayer(`${id}-label`)
      if (map.getLayer(`${id}-line`)) map.removeLayer(`${id}-line`)
      if (map.getLayer(`${id}-glow`)) map.removeLayer(`${id}-glow`)
      if (map.getSource(`${id}-label-src`)) map.removeSource(`${id}-label-src`)
      if (map.getSource(id)) map.removeSource(id)
    })
  }

  // Handle panel close
  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.loaded()) return

    if (!selectedProject) {
      map.easeTo({ pitch: 0, bearing: 0, zoom: 12, duration: 800 })
      removeRadiusLayers(map)
    }
  }, [selectedProject])

  // Layer toggles
  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.loaded()) return

    handlePoiLayer(map, "education", activeLayers.education)
    handlePoiLayer(map, "hospitals", activeLayers.hospitals)
    handlePoiLayer(map, "shopping", activeLayers.shopping)
    handleMetroLayer(map, activeLayers.metro)
    handleRoadsLayer(map, activeLayers.roads)
  }, [activeLayers])

  function handlePoiLayer(map, key, isActive) {
    const config = layerData[key]

    if (isActive) {
      if (poiMarkersRef.current[key]) return // already added

      const markers = config.points.map((point) => {
        const el = createPoiMarkerEl(key, config.color, point.name)
        return new mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(point.coordinates)
          .addTo(map)
      })

      poiMarkersRef.current[key] = markers
    } else {
      if (poiMarkersRef.current[key]) {
        poiMarkersRef.current[key].forEach((m) => m.remove())
        delete poiMarkersRef.current[key]
      }
    }
  }

  function handleMetroLayer(map, isActive) {
    const { stations, lines } = layerData.metro

    if (isActive) {
      // Metro lines (keep as GeoJSON layers)
      lines.forEach((line) => {
        const sourceId = `metro-line-${line.id}`
        const layerId = `metro-line-layer-${line.id}`

        if (!map.getSource(sourceId)) {
          map.addSource(sourceId, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: { type: "LineString", coordinates: line.coordinates },
            },
          })
        }

        if (!map.getLayer(layerId)) {
          map.addLayer({
            id: layerId,
            type: "line",
            source: sourceId,
            paint: {
              "line-color": line.color,
              "line-width": 3,
              "line-dasharray": [2, 1.5],
              "line-opacity": 0.9,
            },
          })
        }
      })

      // Metro station icon markers
      if (!poiMarkersRef.current["metro"]) {
        const markers = stations.map((station) => {
          const el = createPoiMarkerEl("metro", layerData.metro.color, station.name)
          return new mapboxgl.Marker({ element: el, anchor: "bottom" })
            .setLngLat(station.coordinates)
            .addTo(map)
        })
        poiMarkersRef.current["metro"] = markers
      }
    } else {
      // Remove station markers
      if (poiMarkersRef.current["metro"]) {
        poiMarkersRef.current["metro"].forEach((m) => m.remove())
        delete poiMarkersRef.current["metro"]
      }

      // Remove line layers
      lines.forEach((line) => {
        const layerId = `metro-line-layer-${line.id}`
        const sourceId = `metro-line-${line.id}`
        if (map.getLayer(layerId)) map.removeLayer(layerId)
        if (map.getSource(sourceId)) map.removeSource(sourceId)
      })
    }
  }

  function handleRoadsLayer(map, isActive) {
    const roadLayers = map.getStyle().layers.filter(
      (l) => l.id.includes("road") || l.id.includes("street") || l.id.includes("highway")
    )
    roadLayers.forEach((l) => {
      try {
        map.setLayoutProperty(l.id, "visibility", isActive ? "visible" : "none")
      } catch (_) {}
    })
  }

  return (
    <div
      ref={containerRef}
      style={{ width: "100vw", height: "100vh", position: "absolute", inset: 0 }}
    />
  )
}
