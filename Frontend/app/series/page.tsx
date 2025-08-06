"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, MapPin, Users, Trophy, Clock } from "lucide-react"
import { fetchTournaments, type Tournament } from "@/lib/api"

export default function SeriesPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const data = await fetchTournaments()
        setTournaments(data)
      } catch (error) {
        console.error("Error loading tournaments:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTournaments()
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  const liveTournaments = tournaments.filter((t) => t.status === "Live")
  const upcomingTournaments = tournaments.filter((t) => t.status === "Upcoming")
  const completedTournaments = tournaments.filter((t) => t.status === "Completed")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Series & Tournaments</h1>
        <p className="text-muted-foreground">Cricket series, tournaments, and championship information</p>
      </div>

      <div className="space-y-8">
        {/* Live Tournaments */}
        {liveTournaments.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full match-live"></div>
              Live Tournaments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} isLive />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Tournaments */}
        {upcomingTournaments.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Upcoming Tournaments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          </section>
        )}

        {/* Completed Tournaments */}
        {completedTournaments.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Completed Tournaments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          </section>
        )}

        {tournaments.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No tournaments available at the moment.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function TournamentCard({ tournament, isLive = false }: { tournament: Tournament; isLive?: boolean }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "destructive"
      case "Upcoming":
        return "secondary"
      case "Completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card className={`hover:shadow-lg transition-shadow ${isLive ? "border-l-4 border-l-red-500" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg line-clamp-1">{tournament.name}</CardTitle>
          <Badge variant={getStatusColor(tournament.status)} className={isLive ? "match-live" : ""}>
            {tournament.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{tournament.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{tournament.venue}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {new Date(tournament.startDate).toLocaleDateString()} -{" "}
              {new Date(tournament.endDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{tournament.teams.length} teams</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <span>{tournament.format} Format</span>
          </div>
        </div>

        {tournament.teams.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Participating Teams:</p>
            <div className="flex flex-wrap gap-1">
              {tournament.teams.slice(0, 4).map((team, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {team}
                </Badge>
              ))}
              {tournament.teams.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{tournament.teams.length - 4} more
                </Badge>
              )}
            </div>
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

      <div className="space-y-8">
        {[1, 2, 3].map((section) => (
          <section key={section}>
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((card) => (
                <Card key={card}>
                  <CardContent className="p-6">
                    <Skeleton className="h-32 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
