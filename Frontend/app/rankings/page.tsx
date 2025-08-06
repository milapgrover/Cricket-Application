"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Trophy, Medal, Award, Target } from "lucide-react"
import Image from "next/image"
import { fetchTeamRankings, fetchAllPlayers, type Team, type Player } from "@/lib/api"

export default function RankingsPage() {
  const [testTeams, setTestTeams] = useState<Team[]>([])
  const [odiTeams, setOdiTeams] = useState<Team[]>([])
  const [t20Teams, setT20Teams] = useState<Team[]>([])
  const [topPlayers, setTopPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRankings = async () => {
      try {
        const [test, odi, t20, players] = await Promise.all([
          fetchTeamRankings("Test"),
          fetchTeamRankings("ODI"),
          fetchTeamRankings("T20I"),
          fetchAllPlayers(),
        ])

        setTestTeams(test.slice(0, 10))
        setOdiTeams(odi.slice(0, 10))
        setT20Teams(t20.slice(0, 10))
        setTopPlayers(players.slice(0, 20))
      } catch (error) {
        console.error("Error loading rankings:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRankings()
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">ICC Rankings</h1>
        <p className="text-muted-foreground">Official ICC team and player rankings across all formats</p>
      </div>

      <Tabs defaultValue="teams" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="teams">Team Rankings</TabsTrigger>
          <TabsTrigger value="players">Player Rankings</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <RankingCard title="Test Rankings" icon={<Trophy className="h-5 w-5" />} teams={testTeams} format="Test" />
            <RankingCard title="ODI Rankings" icon={<Medal className="h-5 w-5" />} teams={odiTeams} format="ODI" />
            <RankingCard title="T20I Rankings" icon={<Award className="h-5 w-5" />} teams={t20Teams} format="T20I" />
          </div>
        </TabsContent>

        <TabsContent value="players" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Top Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topPlayers.map((player, index) => (
                  <PlayerRankingCard key={player.id} player={player} position={index + 1} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RankingCard({
  title,
  icon,
  teams,
  format,
}: {
  title: string
  icon: React.ReactNode
  teams: Team[]
  format: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {teams.map((team, index) => (
          <div key={team.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <span
                className={`font-bold text-sm ${
                  index === 0 ? "text-yellow-600" : index < 3 ? "text-gray-600" : "text-muted-foreground"
                }`}
              >
                #{index + 1}
              </span>
              <div className="w-6 h-4 relative">
                <Image
                  src={team.flagUrl || "/placeholder.svg?height=16&width=24&query=country flag"}
                  alt={`${team.name} flag`}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
              <span className="font-medium text-sm">{team.name}</span>
            </div>
            <span className="text-sm font-semibold text-primary">{team.points}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function PlayerRankingCard({ player, position }: { player: Player; position: number }) {
  return (
    <div className="p-3 rounded-lg border hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <span
          className={`font-bold text-sm ${
            position === 1
              ? "text-yellow-600"
              : position <= 3
                ? "text-gray-600"
                : position <= 10
                  ? "text-orange-600"
                  : "text-muted-foreground"
          }`}
        >
          #{position}
        </span>
        <div className="w-8 h-8 relative">
          <Image
            src={player.imageUrl || "/placeholder.svg?height=32&width=32&query=cricket player"}
            alt={player.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>
      <h4 className="font-medium text-sm mb-1">{player.name}</h4>
      <p className="text-xs text-muted-foreground mb-1">{player.team}</p>
      <Badge variant="outline" className="text-xs">
        {player.role}
      </Badge>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-80 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-10 w-80" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4, 5].map((j) => (
                  <Skeleton key={j} className="h-8 w-full" />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
