# Property Search App

A modern property search application built with Next.js that integrates with the Microburbs API to display real estate listings across Australia.

## 🚀 Live Demo

**[View Live Application](https://my-app-eosin-beta-51.vercel.app)**

## 📋 Overview

This application provides a comprehensive property search experience with real-time data from the Microburbs API. Users can search for properties by location, filter by various criteria, and view detailed property information in an intuitive interface.

## ✨ Features

- **Real-time Property Search** - Integrated with Microburbs API for up-to-date listings
- **Advanced Filtering** - Filter by price range, bedrooms, bathrooms, and property type
- **URL-based Search** - Shareable links with search parameters
- **Property Details Modal** - View comprehensive property descriptions and details
- **Responsive Design** - Optimized for desktop and mobile devices
- **Fallback System** - Mock data fallback when API is unavailable
- **Map View** - Interactive map functionality (coming soon)

## 🔗 URL Parameters

The application supports URL parameters for creating shareable search links:

- `location` - Search location (e.g., "Belmont North", "Canterbury")
- `type` - Listing type: "Buy", "Rent", or "Sold" (default: "Buy")
- `property` - Property type: "House", "Unit", "Apartment", "Townhouse", "Land", or "all" (default: "all")

### Example URLs:
- `/?location=Canterbury&type=Buy&property=House` - Houses for sale in Canterbury
- `/?location=Belmont+North&property=Unit` - Units in Belmont North
- `/?type=Rent` - Rental properties (default location)

## 🏗️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **API Integration**: Microburbs Property API
- **Deployment**: Vercel
- **Icons**: Lucide React

## 🔌 API Integration

This application integrates with the Microburbs API to fetch real property data:
- Suburb-based property search across Australia
- Property type filtering (house, unit, apartment, etc.)
- Real-time property listings with coordinates, pricing, and detailed descriptions
- Automatic data transformation and error handling

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Environment Setup

1. Clone the repository and navigate to the project directory
2. Copy the environment example file:
```bash
cp .env.example .env.local
```

3. Update the environment variables in `.env.local`:
```env
MICROBURBS_API_URL=https://www.microburbs.com.au/report_generator/api/suburb/properties
MICROBURBS_API_TOKEN=your_api_token_here
```

### Installation & Running

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Start searching for properties by location and applying filters!

## 📱 Usage

1. **Search Properties**: Enter a suburb name in the search bar (e.g., "Belmont North", "Canterbury")
2. **Apply Filters**: Use the filter panel to narrow down results by:
   - Listing type (Buy/Rent/Sold)
   - Property type (House/Unit/Apartment/etc.)
   - Price range
   - Number of bedrooms/bathrooms
3. **View Details**: Click "View Description" on any property card to see detailed information
4. **Share Results**: Copy the URL to share your search results with others

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Deployment

This application is deployed on Vercel. To deploy your own instance:

1. Fork this repository
2. Import your project on [Vercel](https://vercel.com/new)
3. Add the environment variables in the Vercel dashboard:
   - `MICROBURBS_API_URL`
   - `MICROBURBS_API_TOKEN`
4. Deploy!

The application automatically falls back to mock data if the API is unavailable, ensuring a smooth user experience.

## Project Structure

```
my-app/
├── app/
│   ├── api/properties/route.ts    # API route for property data
│   ├── page.tsx                   # Main property search page
│   └── layout.tsx                 # App layout
├── components/
│   ├── property-card.tsx          # Property listing card
│   ├── map-view.tsx              # Interactive map component
│   ├── filter-panel.tsx          # Search filters
│   └── ui/                       # Reusable UI components
├── lib/
│   ├── mock-data.ts              # Mock data and type definitions
│   ├── property-service.ts       # API service and data transformation
│   └── utils.ts                  # Utility functions
└── .env.local                    # Environment variables (not committed)
```
