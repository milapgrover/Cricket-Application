"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Trophy, TrendingUp, Target } from "lucide-react"
import Image from "next/image"
import { fetchTeamRankings, type Team } from "@/lib/api"

const formats = ["Test", "ODI", "T20I"]

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFormat, setActiveFormat] = useState("Test")

  const loadTeams = async (format: string) => {
    try {
      setLoading(true)
      const rankings = await fetchTeamRankings(format)
      setTeams(rankings)
    } catch (error) {
      console.error("Error loading team rankings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFormatChange = (format: string) => {
    setActiveFormat(format)
    loadTeams(format)
  }

  useEffect(() => {
    loadTeams("Test")
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Team Rankings</h1>
        <p className="text-muted-foreground">ICC team rankings across all formats</p>
      </div>

      <Tabs value={activeFormat} onValueChange={handleFormatChange} className="mb-8">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          {formats.map((format) => (
            <TabsTrigger key={format} value={format}>
              {format}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {teams.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No team rankings available.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {teams.map((team, index) => (
            <TeamCard key={team.id} team={team} position={index + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

function TeamCard({ team, position }: { team: Team; position: number }) {
  const getRankingColor = (rank: number) => {
    if (rank === 1) return "text-yellow-600"
    if (rank <= 3) return "text-gray-600"
    if (rank <= 5) return "text-orange-600"
    return "text-muted-foreground"
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`text-2xl font-bold ${getRankingColor(position)}`}>#{position}</div>
            <div className="w-12 h-8 relative">
              <Image
                src={team.flagUrl || "/placeholder.svg?height=32&width=48&query=country flag"}
                alt={`${team.name} flag`}
                fill
                className="object-cover rounded"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{team.name}</h3>
              <p className="text-sm text-muted-foreground">{team.format} Format</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Points</span>
              </div>
              <p className="text-xl font-bold text-primary">{team.points}</p>
            </div>

            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Matches</span>
              </div>
              <p className="text-lg font-semibold">{team.matches}</p>
            </div>

            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Win %</span>
              </div>
             <p className="text-lg font-semibold">
  {typeof team.winPercentage === "number" ? `${team.winPercentage.toFixed(1)}%` : "N/A"}
</p>

            </div>

            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">W-L-D</div>
              <p className="text-sm font-mono">
                {team.wins}-{team.losses}-{team.draws}
              </p>
            </div>
          </div>
        </div>
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

      <Skeleton className="h-10 w-80 mb-8" />

      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
