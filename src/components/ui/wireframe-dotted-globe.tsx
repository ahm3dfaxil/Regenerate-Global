"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import landFeaturesData from "@/data/ne_110m_land.json"

interface RotatingEarthProps {
  width?: number
  height?: number
  speed?: number
  className?: string
}

interface DotData {
  lng: number
  lat: number
  visible: boolean
}

const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
  const [x, y] = point
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]

    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
  }

  return inside
}

const pointInFeature = (point: [number, number], feature: any): boolean => {
  const geometry = feature.geometry

  if (geometry.type === "Polygon") {
    const coordinates = geometry.coordinates
    if (!pointInPolygon(point, coordinates[0])) {
      return false
    }
    for (let i = 1; i < coordinates.length; i++) {
      if (pointInPolygon(point, coordinates[i])) {
        return false
      }
    }
    return true
  } else if (geometry.type === "MultiPolygon") {
    for (const polygon of geometry.coordinates) {
      if (pointInPolygon(point, polygon[0])) {
        let inHole = false
        for (let i = 1; i < polygon.length; i++) {
          if (pointInPolygon(point, polygon[i])) {
            inHole = true
            break
          }
        }
        if (!inHole) {
          return true
        }
      }
    }
    return false
  }

  return false
}

const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
  const dots: [number, number][] = []
  const bounds = d3.geoBounds(feature)
  const [[minLng, minLat], [maxLng, maxLat]] = bounds

  const stepSize = dotSpacing * 0.08

  for (let lng = minLng; lng <= maxLng; lng += stepSize) {
    for (let lat = minLat; lat <= maxLat; lat += stepSize) {
      const point: [number, number] = [lng, lat]
      if (pointInFeature(point, feature)) {
        dots.push(point)
      }
    }
  }

  return dots
}

// Pre-compute halftone land dots once on module load for instant 0ms rendering
const precomputedDots: DotData[] = (() => {
  const dots: DotData[] = []
  if (landFeaturesData && (landFeaturesData as any).features) {
    (landFeaturesData as any).features.forEach((feature: any) => {
      const featureDots = generateDotsInPolygon(feature, 16)
      featureDots.forEach(([lng, lat]) => {
        dots.push({ lng, lat, visible: true })
      })
    })
  }
  return dots
})()

export default function RotatingEarth({
  width = 600,
  height = 600,
  speed = 1.2,
  className = ""
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Enforce strict 1:1 square dimensions to prevent oval distortion
    const size = Math.min(width, height)
    const radius = (size / 2) * 0.82

    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    context.scale(dpr, dpr)

    // Create orthographic projection centered perfectly in the square canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([size / 2, size / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, size, size)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw ocean sphere (globe background)
      context.beginPath()
      context.arc(size / 2, size / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = "#020B14"
      context.fill()
      context.strokeStyle = "#ffffff"
      context.lineWidth = 2 * scaleFactor
      context.stroke()

      // Draw graticule lines (pure crisp white with subtle opacity)
      const graticule = d3.geoGraticule()
      context.beginPath()
      path(graticule())
      context.strokeStyle = "#ffffff"
      context.lineWidth = 0.9 * scaleFactor
      context.globalAlpha = 0.35
      context.stroke()
      context.globalAlpha = 1

      // Draw land outlines (pure crisp white)
      context.beginPath()
      ;(landFeaturesData as any).features.forEach((feature: any) => {
        path(feature)
      })
      context.strokeStyle = "#ffffff"
      context.lineWidth = 1.2 * scaleFactor
      context.stroke()

      // Draw halftone dots (batched into a single path call for maximum performance)
      context.beginPath()
      context.fillStyle = "#999999"
      const dotRadius = 1.25 * scaleFactor
      const twoPi = 2 * Math.PI

      precomputedDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat])
        if (
          projected &&
          projected[0] >= 0 &&
          projected[0] <= size &&
          projected[1] >= 0 &&
          projected[1] <= size
        ) {
          context.moveTo(projected[0] + dotRadius, projected[1])
          context.arc(projected[0], projected[1], dotRadius, 0, twoPi)
        }
      })
      context.fill()
    }

    // Render first frame immediately
    render()
    setIsReady(true)

    // Set up continuous rotation
    const rotation: [number, number] = [0, -10] // Slight tilt for natural 3D earth perspective
    let isVisible = true

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { threshold: 0.05 })

    observer.observe(canvas)

    const rotate = () => {
      if (!isVisible) return
      rotation[0] += speed
      projection.rotate(rotation)
      render()
    }

    // Auto-rotation timer
    const rotationTimer = d3.timer(rotate)

    // Cleanup
    return () => {
      observer.disconnect()
      rotationTimer.stop()
    }
  }, [width, height, speed])

  return (
    <div className={`relative aspect-square flex items-center justify-center transition-opacity duration-300 ease-out ${isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full aspect-square rounded-full bg-transparent pointer-events-none object-contain"
        style={{ aspectRatio: "1 / 1" }}
      />
    </div>
  )
}
