import { Home } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Home className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No properties found</h3>
      <p className="text-muted-foreground max-w-md text-balance">
        {
          "We couldn't find any properties matching your search criteria. Try adjusting your filters or search in a different area."
        }
      </p>
    </div>
  )
}
