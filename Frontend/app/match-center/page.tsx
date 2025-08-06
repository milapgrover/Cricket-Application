"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, MapPin, Clock, Users, Trophy } from "lucide-react"
import { fetchLiveMatches, fetchRecentMatches, fetchUpcomingMatches, type Match } from "@/lib/api"

export default function MatchCenterPage() {
  const [liveMatches, setLiveMatches] = useState<Match[]>([])
  const [recentMatches, setRecentMatches] = useState<Match[]>([])
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const [live, recent, upcoming] = await Promise.all([
          fetchLiveMatches(),
          fetchRecentMatches(),
          fetchUpcomingMatches(),
        ])

        setLiveMatches(live)
        setRecentMatches(recent)
        setUpcomingMatches(upcoming)
      } catch (error) {
        console.error("Error loading matches:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMatches()
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Match Center</h1>
        <p className="text-muted-foreground">Complete cricket match coverage with live scores, results, and fixtures</p>
      </div>

      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="live" className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full match-live"></div>
            Live ({liveMatches.length})
          </TabsTrigger>
          <TabsTrigger value="recent">Recent ({recentMatches.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingMatches.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {liveMatches.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No live matches at the moment</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {liveMatches.map((match) => (
                <DetailedMatchCard key={match.id} match={match} isLive />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          {recentMatches.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No recent matches</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentMatches.map((match) => (
                <DetailedMatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingMatches.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No upcoming matches</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingMatches.map((match) => (
                <DetailedMatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DetailedMatchCard({ match, isLive = false }: { match: Match; isLive?: boolean }) {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${isLive ? "border-l-4 border-l-red-500" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant={isLive ? "destructive" : "secondary"} className={isLive ? "match-live" : ""}>
              {isLive ? "LIVE" : match.status}
            </Badge>
            <span className="font-medium">{match.format}</span>
            {isLive && match.overs && <span className="text-sm text-muted-foreground">{match.overs} overs</span>}
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-6 bg-primary/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{match.team1.substring(0, 3).toUpperCase()}</span>
                </div>
                <span className="font-semibold">{match.team1}</span>
              </div>
              <span className="text-lg font-bold text-primary">{match.team1Score}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-6 bg-primary/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{match.team2.substring(0, 3).toUpperCase()}</span>
                </div>
                <span className="font-semibold">{match.team2}</span>
              </div>
              <span className="text-lg font-bold text-primary">{match.team2Score}</span>
            </div>
          </div>

          <div className="space-y-3">
            {isLive && match.currentBatsman1 && (
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-medium mb-2 text-primary flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Current Partnership
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">{match.currentBatsman1}</span> - Batting
                  </p>
                  <p>
                    <span className="font-medium">{match.currentBatsman2}</span> - Batting
                  </p>
                  <p>
                    <span className="font-medium">{match.currentBowler}</span> - Bowling
                  </p>
                </div>
              </div>
            )}

            {match.target && (
              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <h4 className="font-medium mb-2 text-orange-700 dark:text-orange-300 flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Target
                </h4>
                <p className="text-lg font-bold">{match.target} runs</p>
                {match.required && <p className="text-sm text-muted-foreground">{match.required}</p>}
              </div>
            )}

            <div className="p-4 bg-muted/30 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{match.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(match.date).toLocaleDateString()}</span>
              </div>
              {isLive && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Live Now</span>
                </div>
              )}
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

      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
