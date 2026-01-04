
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Trophy, Clock } from "lucide-react"
import { fetchTournaments } from "@/lib/api"

export default function SeriesPage() {
  const [tournaments, setTournaments] = useState([])
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


const liveTournaments = tournaments.filter((t) => t.status === "ONGOING")
const upcomingTournaments = tournaments.filter((t) => t.status === "UPCOMING")
const completedTournaments = tournaments.filter((t) => t.status === "COMPLETED")


  return (
    <div className="px-10">
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
    </div>
  )
}

function TournamentCard({ tournament, isLive = false }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "LIVE":
        return "destructive"
      case "UPCOMING":
        return "secondary"
      case "COMPLETED":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="">
    <Card className={`border border-slate-100 hover:shadow-2xl transition-shadow ${isLive ? "border-l-4 border-l-red-500" : ""}`}>
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
            <span>{tournament.location}</span>
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
  <span>{tournament.teams} teams</span>
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
    </div>
  )
}

