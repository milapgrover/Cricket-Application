import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { fetchRecentMatches, fetchUpcomingMatches } from "@/lib/api"

export default function MatchCenterPage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
  const loadMatches = async () => {
    try {
      setLoading(true)
      const recent = await fetchRecentMatches()
      const upcoming = await fetchUpcomingMatches()
      setMatches([...recent, ...upcoming])
    } catch (error) {
      console.error("Error loading matches:", error)
    } finally {
      setLoading(false)
    }
  }

  loadMatches()
}, [])


  const filteredMatches = matches.filter((m) =>
  [m.series, m.team1, m.team2]
    .filter(Boolean)
    .some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
);


  return (
    <div className="px-10">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <h1 className="text-4xl font-bold">Match Center</h1>
        
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredMatches.map((match) => (
          <Card key={match.id} className="border border-slate-100 hover:shadow-2xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-base line-clamp-1">{match.series}</CardTitle>
                <Badge variant="secondary">{match.format}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center bg-muted/30 p-2 rounded">
                  <span className="font-medium">{match.team1}</span>
                  <span className="font-mono font-bold">{match.team1Score }</span>
                </div>
                <div className="flex justify-between items-center bg-muted/30 p-2 rounded">
                  <span className="font-medium">{match.team2}</span>
                  <span className="font-mono font-bold">{match.team2Score }</span>
                </div>
              </div>
              <div className="text-sm font-medium text-primary">{match.result || "Upcoming"}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground border-t pt-3">
                <MapPin className="h-3 w-3" />
                <span>{match.venue}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  )
}
