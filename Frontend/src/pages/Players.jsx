
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, TrendingUp, Award, Target } from "lucide-react"
import { fetchAllPlayers, searchPlayers } from "@/lib/api"

export default function PlayersPage() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searching, setSearching] = useState(false)

 const loadPlayers = async() => {
  try {
    setLoading(true)
    const data = await fetchAllPlayers()
    setPlayers(data)
  } catch (error) {
    console.error("Error loading players:", error)
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  loadPlayers()
}, [])

return (
  <div className="px-10">
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Cricket Players</h1>
        <p className="text-muted-foreground">Discover player profiles, statistics, and performance insights</p>
      </div>

      {players.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              "No players available"
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

function PlayerCard({ player }) {
  return (
    <Card className="border border-slate-100 hover:shadow-2xl transition-shadow">
      <CardContent className="p-6 text-center space-y-4">
        <div className="relative w-20 h-20 mx-auto">
          <img
  src={player.imageUrl || "/players/ViratKohli.jpg"}
  alt={player.name}
  className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
/>


          
        </div>

        <div>
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{player.name}</h3>
          <p className="text-sm text-muted-foreground">{player.team}</p>
          
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="flex items-center gap-1 justify-center mb-1">
              <Target className="h-3 w-3 text-primary" />
              <span className="text-xs text-muted-foreground">Centuries</span>
            </div>
            <p className="font-semibold">{player.centuries}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-2">
            <div className="flex items-center gap-1 justify-center mb-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-xs text-muted-foreground">Country</span>
            </div>
            <p className="font-semibold">{player.country}</p>
          </div>

          {player.wickets > 0 && (
            <>
              <div className="bg-muted/50 rounded-lg p-2">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Award className="h-3 w-3 text-primary" />
                  <span className="text-xs text-muted-foreground">Wickets</span>
                </div>
                <p className="font-semibold">{player.wickets}</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-2">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <span className="text-xs text-muted-foreground">Bowl Avg</span>
                </div>
                <p className="font-semibold">{player.bowlingAverage.toFixed(1)}</p>
              </div>
            </>
          )}

          {player.wickets === 0 && (
            <div className="bg-muted/50 rounded-lg p-2 col-span-2">
              <div className="flex items-center gap-1 justify-center mb-1">
                <span className="text-xs text-muted-foreground">Batting Average</span>
              </div>
              <p className="font-semibold">{player.battingAverage.toFixed(1)}</p>
            </div>
          )}
        </div>

        {player.recentForm && (
          <div className="text-xs">
            <span className="text-muted-foreground">Recent Form: </span>
            <span className="font-mono">{player.recentForm}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

