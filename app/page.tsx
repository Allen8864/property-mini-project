"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyCard } from "@/components/property-card"
import { PropertySkeleton } from "@/components/property-skeleton"
import { FilterPanel } from "@/components/filter-panel"

import { EmptyState } from "@/components/empty-state"
import { Property } from "@/lib/mock-data"
import { fetchProperties, availableSuburbs } from "@/lib/property-service"

export default function PropertySearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize state from URL parameters
  const [searchLocation, setSearchLocation] = useState(() => 
    searchParams.get('location') || "Belmont North"
  )
  const [listingType, setListingType] = useState<"Buy" | "Rent" | "Sold">(() => 
    (searchParams.get('type') as "Buy" | "Rent" | "Sold") || "Buy"
  )
  const [propertyType, setPropertyType] = useState<string>(() => 
    searchParams.get('property') || "all"
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000])
  const [bedrooms, setBedrooms] = useState<number>(0)
  const [bathrooms, setBathrooms] = useState<number>(0)
  const [includeSurrounding, setIncludeSurrounding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Function to update URL parameters
  const updateURL = (location: string, type: "Buy" | "Rent" | "Sold", property: string) => {
    const params = new URLSearchParams()
    if (location && location !== "Belmont North") params.set('location', location)
    if (type && type !== "Buy") params.set('type', type)
    if (property && property !== "all") params.set('property', property)
    
    const queryString = params.toString()
    const newURL = queryString ? `/?${queryString}` : '/'
    router.push(newURL, { scroll: false })
  }

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Filter by listing type
      if (property.listingType !== listingType) return false

      // Filter by property type
      if (propertyType !== "all" && property.type !== propertyType) return false

      // Filter by price (simplified for demo)
      const propertyPrice = Number.parseInt(property.price.replace(/[$,]/g, ""))
      if (propertyPrice < priceRange[0] || propertyPrice > priceRange[1]) return false

      // Filter by bedrooms
      if (bedrooms > 0 && property.bedrooms < bedrooms) return false

      // Filter by bathrooms
      if (bathrooms > 0 && property.bathrooms < bathrooms) return false

      return true
    })
  }, [properties, listingType, propertyType, priceRange, bedrooms, bathrooms])

  const handleSearch = async () => {
    setIsLoading(true)
    setHasSearched(true)
    
    // Update URL with current search parameters
    updateURL(searchLocation, listingType, propertyType)
    
    try {
      // Extract suburb name from search location (remove state if present)
      const suburbName = searchLocation.replace(/\s+(NSW|VIC|QLD|SA|WA|TAS|NT|ACT)$/i, '').trim()
      const fetchedProperties = await fetchProperties(suburbName, propertyType)
      setProperties(fetchedProperties)
    } catch (error) {
      console.error('Error searching properties:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setPriceRange([0, 3000000])
    setBedrooms(0)
    setBathrooms(0)
    setIncludeSurrounding(false)
  }

  const filteredSuggestions = availableSuburbs.filter((suburb) => suburb.toLowerCase().includes(searchLocation.toLowerCase()))

  // Load initial data and respond to URL parameter changes
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true)
      setHasSearched(true)
      
      try {
        const suburbName = searchLocation.replace(/\s+(NSW|VIC|QLD|SA|WA|TAS|NT|ACT)$/i, '').trim()
        const fetchedProperties = await fetchProperties(suburbName, propertyType)
        setProperties(fetchedProperties)
      } catch (error) {
        console.error('Error loading initial properties:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadInitialData()
  }, [searchLocation, propertyType])

  // Update state when URL parameters change (browser back/forward)
  useEffect(() => {
    const location = searchParams.get('location') || "Belmont North"
    const type = (searchParams.get('type') as "Buy" | "Rent" | "Sold") || "Buy"
    const property = searchParams.get('property') || "all"
    
    setSearchLocation(location)
    setListingType(type)
    setPropertyType(property)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header with Search */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Home className="h-6 w-6 text-primary" />
              <span>PropertySearch</span>
            </div>

            <div className="flex-1 flex items-center gap-2 flex-wrap min-w-0">
              {/* Location Input */}
              <div className="relative flex-1 min-w-[200px]">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suburb (e.g., Canterbury NSW)"
                  value={searchLocation}
                  onChange={(e) => {
                    setSearchLocation(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-10"
                />
                {showSuggestions && searchLocation && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                    {filteredSuggestions.map((suburb) => (
                      <button
                        key={suburb}
                        onClick={() => {
                          setSearchLocation(suburb)
                          setShowSuggestions(false)
                          updateURL(suburb, listingType, propertyType)
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                      >
                        {suburb}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Listing Type */}
              <Select value={listingType} onValueChange={(value: "Buy" | "Rent" | "Sold") => {
                setListingType(value)
                updateURL(searchLocation, value, propertyType)
              }}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                </SelectContent>
              </Select>

              {/* Property Type */}
              <Select value={propertyType} onValueChange={(value) => {
                setPropertyType(value)
                updateURL(searchLocation, listingType, value)
              }}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Townhouse">Townhouse</SelectItem>
                  <SelectItem value="Land">Land</SelectItem>
                  <SelectItem value="Unit">Unit</SelectItem>
                </SelectContent>
              </Select>

              {/* Search Button */}
              <Button onClick={handleSearch} className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Filter Panel - Desktop Sidebar */}
          <aside className="hidden lg:block">
            <FilterPanel
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              bedrooms={bedrooms}
              onBedroomsChange={setBedrooms}
              bathrooms={bathrooms}
              onBathroomsChange={setBathrooms}
              includeSurrounding={includeSurrounding}
              onIncludeSurroundingChange={setIncludeSurrounding}
              onReset={handleReset}
            />
          </aside>

          {/* Main Content Area */}
          <main>
            {/* Mobile Filter Panel */}
            <div className="lg:hidden mb-4">
              <FilterPanel
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                bedrooms={bedrooms}
                onBedroomsChange={setBedrooms}
                bathrooms={bathrooms}
                onBathroomsChange={setBathrooms}
                includeSurrounding={includeSurrounding}
                onIncludeSurroundingChange={setIncludeSurrounding}
                onReset={handleReset}
              />
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
              </p>
            </div>

            {/* List/Map View Tabs */}
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="mt-0">
                {isLoading ? (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <PropertySkeleton key={i} />
                    ))}
                  </div>
                ) : filteredProperties.length === 0 && hasSearched ? (
                  <EmptyState />
                ) : (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isHighlighted={selectedProperty === property.id}
                        onClick={() => setSelectedProperty(property.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="map" className="mt-0">
                <div className="h-[600px] lg:h-[700px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🚧</div>
                    <h3 className="text-lg font-semibold mb-2">Feature Under Development</h3>
                    <p className="text-muted-foreground">
                      Map view is currently being developed and will be available soon.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}

function Home({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
