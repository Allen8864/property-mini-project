"use client"

import { useEffect, useRef } from "react"
import type { Property } from "@/lib/mock-data"

interface MapViewProps {
  properties: Property[]
  selectedProperty: string | null
  onPropertySelect: (id: string) => void
}

export function MapView({ properties, selectedProperty, onPropertySelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real implementation, this would initialize Leaflet or Google Maps
    // For now, we'll create a simple visual representation
    console.log("[v0] Map would be initialized here with properties:", properties)
  }, [properties])

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full relative">
        {/* Placeholder map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10" />

        {/* Property markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-8 p-8">
            {properties.slice(0, 9).map((property) => (
              <button
                key={property.id}
                onClick={() => onPropertySelect(property.id)}
                className={`relative w-12 h-12 rounded-full transition-all ${
                  selectedProperty === property.id
                    ? "bg-primary scale-125 shadow-lg"
                    : "bg-accent hover:bg-accent/80 hover:scale-110"
                }`}
                title={property.address}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent-foreground">
                    $
                    {property.price.includes("per week")
                      ? property.price.split(" ")[0].slice(1, 2) + "k"
                      : (Number.parseInt(property.price.replace(/[$,]/g, "")) / 1000000).toFixed(1) + "M"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map attribution */}
        <div className="absolute bottom-2 right-2 bg-card/90 px-2 py-1 rounded text-xs text-muted-foreground">
          Interactive Map View
        </div>
      </div>
    </div>
  )
}
