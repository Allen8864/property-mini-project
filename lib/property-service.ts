import { ApiProperty, ApiResponse, Property, mockProperties } from './mock-data'

// Transform API property to UI property format
export function transformApiProperty(apiProperty: ApiProperty): Property {
  const propertyTypeMap: Record<string, Property['type']> = {
    'House': 'House',
    'Unit': 'Unit',
    'Apartment': 'Apartment',
    'Townhouse': 'Townhouse',
    'Land': 'Land'
  }

  return {
    id: apiProperty.gnaf_pid,
    address: apiProperty.address.street,
    suburb: apiProperty.address.sal,
    state: apiProperty.address.state,
    price: `$${apiProperty.price.toLocaleString()}`,
    type: propertyTypeMap[apiProperty.property_type] || 'House',
    bedrooms: apiProperty.attributes.bedrooms || 0,
    bathrooms: apiProperty.attributes.bathrooms || 0,
    area: apiProperty.attributes.land_size ? parseInt(apiProperty.attributes.land_size.replace(/[^\d]/g, '')) || 0 : 0,
    image: '/placeholder.svg', // Default image since API doesn't provide images
    coordinates: {
      lat: apiProperty.coordinates.latitude,
      lng: apiProperty.coordinates.longitude
    },
    listingType: 'Buy', // API seems to be for sale properties
    description: apiProperty.attributes.description,
    garageSpaces: apiProperty.attributes.garage_spaces || undefined,
    landSize: apiProperty.attributes.land_size || undefined,
    listingDate: apiProperty.listing_date
  }
}

// Fetch properties from API
export async function fetchProperties(suburb: string = 'Belmont North', propertyType: string = 'all'): Promise<Property[]> {
  try {
    const params = new URLSearchParams({
      suburb,
      property_type: propertyType
    })
    
    const response = await fetch(`/api/properties?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: ApiResponse = await response.json()
    
    if (!data.results || data.results.length === 0) {
      // Return filtered mock data based on search location
      return mockProperties.filter(property => 
        suburb.toLowerCase() === 'belmont north' || 
        property.suburb.toLowerCase().includes(suburb.toLowerCase())
      )
    }
    
    return data.results.map(transformApiProperty)
    
  } catch (error) {
    console.error('Error fetching properties:', error)
    // Return mock data as fallback
    return mockProperties
  }
}

// Get available suburbs (you can expand this list)
export const availableSuburbs = [
  'Belmont North NSW',
  'Canterbury NSW',
  'Burwood NSW',
  'Ashfield NSW',
  'Strathfield NSW',
  'Campsie NSW',
  'Lakemba NSW',
]