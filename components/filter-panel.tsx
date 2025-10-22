"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface FilterPanelProps {
  priceRange: [number, number]
  onPriceRangeChange: (value: [number, number]) => void
  bedrooms: number
  onBedroomsChange: (value: number) => void
  bathrooms: number
  onBathroomsChange: (value: number) => void
  includeSurrounding: boolean
  onIncludeSurroundingChange: (value: boolean) => void
  onReset: () => void
}

export function FilterPanel({
  priceRange,
  onPriceRangeChange,
  bedrooms,
  onBedroomsChange,
  bathrooms,
  onBathroomsChange,
  includeSurrounding,
  onIncludeSurroundingChange,
  onReset,
}: FilterPanelProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={onReset}>
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Price Range</Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={onPriceRangeChange}
              min={0}
              max={3000000}
              step={50000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${(priceRange[0] / 1000).toFixed(0)}k</span>
            <span>${(priceRange[1] / 1000).toFixed(0)}k</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Bedrooms</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={num}
                variant={bedrooms === num ? "default" : "outline"}
                size="sm"
                onClick={() => onBedroomsChange(num)}
                className="flex-1"
              >
                {num === 5 ? "5+" : num}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Bathrooms</Label>
          <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <Button
                key={num}
                variant={bathrooms === num ? "default" : "outline"}
                size="sm"
                onClick={() => onBathroomsChange(num)}
                className="flex-1"
              >
                {num === 3 ? "3+" : num}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="surrounding" checked={includeSurrounding} onCheckedChange={onIncludeSurroundingChange} />
          <Label htmlFor="surrounding" className="text-sm font-normal cursor-pointer">
            Include surrounding suburbs
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
