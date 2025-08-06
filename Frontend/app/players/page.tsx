"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, TrendingUp, Award, Target } from "lucide-react"
import Image from "next/image"
import { fetchAllPlayers, searchPlayers, type Player } from "@/lib/api"

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searching, setSearching] = useState(false)

  const loadPlayers = async () => {
    try {
      setLoading(true)
      const allPlayers = await fetchAllPlayers()
      setPlayers(allPlayers)
    } catch (error) {
      console.error("Error loading players:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadPlayers()
      return
    }

    try {
      setSearching(true)
      const results = await searchPlayers(searchQuery)
      setPlayers(results)
    } catch (error) {
      console.error("Error searching players:", error)
    } finally {
      setSearching(false)
    }
  }

  useEffect(() => {
    loadPlayers()
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Cricket Players</h1>
        <p className="text-muted-foreground">Discover player profiles, statistics, and performance insights</p>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} disabled={searching}>
          {searching ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Players Grid */}
      {players.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              {searchQuery ? "No players found for your search." : "No players available."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  )
}

function PlayerCard({ player }: { player: Player }) {
  return (
    <Card className="hover:shadow-lg transition-shadow group">
      <CardContent className="p-6 text-center space-y-4">
        <div className="relative w-20 h-20 mx-auto">
          <Image
  src={player.imageUrl || "/players/ViratKohli.jpg"}
  alt={player.name}
  fill
  className="rounded-full object-cover group-hover:scale-105 transition-transform"
/>

          <div className="absolute -top-1 -right-1">
            <Badge variant="secondary" className="text-xs px-1 py-0">
              #{player.ranking}
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{player.name}</h3>
          <p className="text-sm text-muted-foreground">{player.team}</p>
          <Badge variant="outline" className="mt-1 text-xs">
            {player.role}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="flex items-center gap-1 justify-center mb-1">
              <Target className="h-3 w-3 text-primary" />
              <span className="text-xs text-muted-foreground">Matches</span>
            </div>
            <p className="font-semibold">{player.matches}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-2">
            <div className="flex items-center gap-1 justify-center mb-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-xs text-muted-foreground">Runs</span>
            </div>
            <p className="font-semibold">{player.runs}</p>
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

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-80 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="flex gap-2 mb-8">
        <Skeleton className="h-10 flex-1 max-w-md" />
        <Skeleton className="h-10 w-20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i}>
            <CardContent className="p-6 text-center space-y-4">
              <Skeleton className="w-20 h-20 rounded-full mx-auto" />
              <div>
                <Skeleton className="h-5 w-32 mx-auto mb-1" />
                <Skeleton className="h-4 w-24 mx-auto mb-2" />
                <Skeleton className="h-5 w-16 mx-auto" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
