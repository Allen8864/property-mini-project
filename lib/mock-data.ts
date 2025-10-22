// API Response Types
export interface ApiProperty {
  address: {
    sa1: string
    sal: string
    state: string
    street: string
  }
  area_level: string
  area_name: string
  attributes: {
    bathrooms: number | null
    bedrooms: number | null
    building_size: string | null
    description: string
    garage_spaces: number | null
    land_size: string | null
  }
  coordinates: {
    latitude: number
    longitude: number
  }
  gnaf_pid: string
  listing_date: string
  price: number
  property_type: string
}

export interface ApiResponse {
  results: ApiProperty[]
}

// UI Property Interface (for compatibility with existing components)
export interface Property {
  id: string
  address: string
  suburb: string
  state: string
  price: string
  type: "House" | "Apartment" | "Townhouse" | "Land" | "Unit"
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  coordinates: {
    lat: number
    lng: number
  }
  listingType: "Buy" | "Rent" | "Sold"
  description?: string
  garageSpaces?: number
  landSize?: string
  listingDate?: string
}

export const mockProperties: Property[] = [
  {
    id: "1",
    address: "42 Canterbury Road",
    suburb: "Canterbury",
    state: "NSW",
    price: "$1,250,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 2,
    area: 320,
    image: "/modern-house-exterior.png",
    coordinates: { lat: -33.9125, lng: 151.1175 },
    listingType: "Buy",
  },
  {
    id: "2",
    address: "15/88 Burwood Road",
    suburb: "Burwood",
    state: "NSW",
    price: "$650,000",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    image: "/modern-apartment.png",
    coordinates: { lat: -33.8765, lng: 151.1043 },
    listingType: "Buy",
  },
  {
    id: "3",
    address: "7 Lakeside Drive",
    suburb: "Canterbury",
    state: "NSW",
    price: "$950,000",
    type: "Townhouse",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: "/contemporary-townhouse.jpg",
    coordinates: { lat: -33.9145, lng: 151.1195 },
    listingType: "Buy",
  },
  {
    id: "4",
    address: "123 Park Avenue",
    suburb: "Ashfield",
    state: "NSW",
    price: "$2,100 per week",
    type: "House",
    bedrooms: 5,
    bathrooms: 3,
    area: 450,
    image: "/luxury-family-home.jpg",
    coordinates: { lat: -33.8897, lng: 151.1254 },
    listingType: "Rent",
  },
  {
    id: "5",
    address: "56 Victoria Street",
    suburb: "Canterbury",
    state: "NSW",
    price: "$1,450,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: 380,
    image: "/renovated-brick-house.jpg",
    coordinates: { lat: -33.9105, lng: 151.1165 },
    listingType: "Buy",
  },
  {
    id: "6",
    address: "22/150 Canterbury Road",
    suburb: "Canterbury",
    state: "NSW",
    price: "$580,000",
    type: "Unit",
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    image: "/modern-unit-with-balcony.jpg",
    coordinates: { lat: -33.9135, lng: 151.1185 },
    listingType: "Buy",
  },
  {
    id: "7",
    address: "89 High Street",
    suburb: "Ashfield",
    state: "NSW",
    price: "$1,800,000",
    type: "House",
    bedrooms: 5,
    bathrooms: 3,
    area: 520,
    image: "/heritage-home-with-garden.jpg",
    coordinates: { lat: -33.8887, lng: 151.1264 },
    listingType: "Sold",
  },
  {
    id: "8",
    address: "34 River Road",
    suburb: "Burwood",
    state: "NSW",
    price: "$750,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    image: "/spacious-apartment-with-city-views.jpg",
    coordinates: { lat: -33.8775, lng: 151.1053 },
    listingType: "Buy",
  },
]

export const suburbs = [
  "Canterbury NSW",
  "Burwood NSW",
  "Ashfield NSW",
  "Strathfield NSW",
  "Campsie NSW",
  "Lakemba NSW",
]
