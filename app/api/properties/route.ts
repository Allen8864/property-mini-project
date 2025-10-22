import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const suburb = searchParams.get('suburb') || 'Belmont North'
  const propertyType = searchParams.get('property_type') || 'all'
  
  const apiUrl = process.env.MICROBURBS_API_URL || 'https://www.microburbs.com.au/report_generator/api/suburb/properties'
  const apiToken = process.env.MICROBURBS_API_TOKEN || 'test'
  
  try {
    // Build the API URL
    let fullApiUrl = `${apiUrl}?suburb=${encodeURIComponent(suburb)}`
    
    // Add property_type filter if not 'all'
    if (propertyType !== 'all') {
      fullApiUrl += `&property_type=${propertyType.toLowerCase()}`
    }
    
    const response = await fetch(fullApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }
    
    const text = await response.text()
    
    // Replace NaN values with null before parsing JSON
    const cleanedText = text.replace(/:\s*NaN/g, ':null')
    const data = JSON.parse(cleanedText)
    
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch properties', results: [] },
      { status: 500 }
    )
  }
}