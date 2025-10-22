"use client"

import { useState } from "react"
import type { Property } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bed, Bath, Maximize, X } from "lucide-react"
import Image from "next/image"

interface PropertyCardProps {
  property: Property
  isHighlighted?: boolean
  onClick?: () => void
}

export function PropertyCard({ property, isHighlighted, onClick }: PropertyCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewDescription = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click event
    setIsDialogOpen(true)
  }

  return (
    <>
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
        isHighlighted ? "ring-2 ring-primary" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        <Image src={property.image || "/placeholder.svg"} alt={property.address} fill className="object-cover" />
        <div className="absolute top-2 right-2 bg-card px-2 py-1 rounded text-xs font-semibold">
          {property.listingType}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-balance">{property.address}</h3>
          <p className="text-sm text-muted-foreground">
            {property.suburb}, {property.state}
          </p>
          <p className="text-xl font-bold text-primary">{property.price}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{property.area}m²</span>
            </div>
          </div>
          <Button 
            className="w-full mt-2 bg-transparent" 
            variant="outline"
            onClick={handleViewDescription}
          >
            View Description
          </Button>
        </div>
      </CardContent>
    </Card>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold pr-8">
            {property.address}
          </DialogTitle>
          <button 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            onClick={() => setIsDialogOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{property.suburb}, {property.state}</span>
            <span>•</span>
            <span className="font-semibold text-primary">{property.price}</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{property.area}m²</span>
            </div>
          </div>

          {property.description && (
            <div className="space-y-2">
              <h4 className="font-semibold">Description</h4>
              <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {property.description}
              </div>
            </div>
          )}

          {(property.garageSpaces || property.landSize || property.listingDate) && (
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-semibold">Additional Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {property.garageSpaces && (
                  <div>
                    <span className="font-medium">Garage:</span> {property.garageSpaces} space{property.garageSpaces !== 1 ? 's' : ''}
                  </div>
                )}
                {property.landSize && (
                  <div>
                    <span className="font-medium">Land Size:</span> {property.landSize}
                  </div>
                )}
                {property.listingDate && (
                  <div>
                    <span className="font-medium">Listed:</span> {new Date(property.listingDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
