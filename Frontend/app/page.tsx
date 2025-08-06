"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Users, TrendingUp, Calendar, Trophy } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  fetchLiveMatches,
  fetchRecentMatches,
  fetchFeaturedNews,
  fetchPlayerSpotlight,
  fetchTournaments,
  type Match,
  type NewsArticle,
  type Player,
  type Tournament,
} from "@/lib/api"

export default function HomePage() {
  const [liveMatches, setLiveMatches] = useState<Match[]>([])
  const [recentMatches, setRecentMatches] = useState<Match[]>([])
  const [featuredNews, setFeaturedNews] = useState<NewsArticle[]>([])
  const [playerSpotlight, setPlayerSpotlight] = useState<Player[]>([])
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [live, recent, news, players, tourns] = await Promise.all([
          fetchLiveMatches().catch((err) => {
            console.error("Live matches error:", err)
            return []
          }),
          fetchRecentMatches().catch((err) => {
            console.error("Recent matches error:", err)
            return []
          }),
          fetchFeaturedNews().catch((err) => {
            console.error("Featured news error:", err)
            return []
          }),
          fetchPlayerSpotlight().catch((err) => {
            console.error("Player spotlight error:", err)
            return []
          }),
          fetchTournaments().catch((err) => {
            console.error("Tournaments error:", err)
            return []
          }),
        ])

        setLiveMatches(live)
        setRecentMatches(recent)
        setFeaturedNews(news)
        setPlayerSpotlight(players)
        setTournaments(tourns)
      } catch (error) {
        console.error("Error loading homepage data:", error)
        setError("Failed to load data. Please check your connection.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <section className="cricket-gradient rounded-lg p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Live Cricket Action</h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Stay updated with live scores, latest news, and cricket insights
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/live-scores">View Live Scores</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-sky-600 bg-transparent"
              asChild
            >
              <Link href="/news">Latest News</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full match-live"></div>
              Live Matches
            </h2>
            <Button variant="outline" asChild>
              <Link href="/live-scores">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.slice(0, 3).map((match) => (
              <MatchCard key={match.id} match={match} isLive />
            ))}
          </div>
        </section>
      )}

      {/* Recent Matches */}
      {recentMatches.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Recent Matches</h2>
            <Button variant="outline" asChild>
              <Link href="/match-center">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentMatches.slice(0, 3).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Featured News</h2>
            <Button variant="outline" asChild>
              <Link href="/news">View All News</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNews.slice(0, 3).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Player Spotlight */}
      {playerSpotlight.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              Player Spotlight
            </h2>
            <Button variant="outline" asChild>
              <Link href="/players">View All Players</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {playerSpotlight.slice(0, 4).map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>
      )}

      {/* Tournaments */}
      {tournaments.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              Tournaments
            </h2>
            <Button variant="outline" asChild>
              <Link href="/series">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.slice(0, 3).map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function MatchCard({ match, isLive = false }: { match: Match; isLive?: boolean }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant={isLive ? "destructive" : "secondary"} className="text-xs">
            {isLive ? "LIVE" : match.status}
          </Badge>
          <span className="text-sm text-muted-foreground">{match.format}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{match.team1}</span>
            <span className="font-mono text-sm">{match.team1Score}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">{match.team2}</span>
            <span className="font-mono text-sm">{match.team2Score}</span>
          </div>
        </div>

        {isLive && match.currentBatsman1 && (
          <div className="text-sm text-muted-foreground border-t pt-2">
            <p>
              Batting: {match.currentBatsman1}, {match.currentBatsman2}
            </p>
            <p>Bowling: {match.currentBowler}</p>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{match.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{new Date(match.date).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="aspect-video relative">
        <Image
          src={article.imageUrl || "/placeholder.svg?height=200&width=400&query=cricket news"}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <Badge variant="outline" className="mb-2 text-xs">
          {article.category}
        </Badge>
        <h3 className="font-semibold mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.summary}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{article.author}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function PlayerCard({ player }: { player: Player }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4 text-center">
        <div className="w-16 h-16 mx-auto mb-3 relative">
          <Image
            src={player.imageUrl || "/placeholder.svg?height=64&width=64&query=cricket player"}
            alt={player.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h3 className="font-semibold mb-1">{player.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{player.team}</p>
        <Badge variant="secondary" className="text-xs mb-2">
          #{player.ranking} {player.role}
        </Badge>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Matches:</span>
            <span className="font-mono">{player.matches}</span>
          </div>
          <div className="flex justify-between">
            <span>Runs:</span>
            <span className="font-mono">{player.runs}</span>
          </div>
          {player.wickets > 0 && (
            <div className="flex justify-between">
              <span>Wickets:</span>
              <span className="font-mono">{player.wickets}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function TournamentCard({ tournament }: { tournament: Tournament }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{tournament.name}</CardTitle>
          <Badge variant={tournament.status === "Live" ? "destructive" : "secondary"}>{tournament.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{tournament.description}</p>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{tournament.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{tournament.teams.length} teams</span>
        </div>
      </CardContent>
    </Card>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="rounded-lg p-8 bg-muted">
        <Skeleton className="h-12 w-96 mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mb-6" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {[1, 2, 3].map((section) => (
        <section key={section}>
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((card) => (
              <Card key={card}>
                <CardContent className="p-4">
                  <Skeleton className="h-32 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}


