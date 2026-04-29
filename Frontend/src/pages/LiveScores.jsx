import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, MapPin, RefreshCcw } from "lucide-react"
import { fetchLiveMatches, fetchUpcomingMatches, fetchRecentMatches } from "@/lib/api"

export default function LiveScoresPage() {
  const [liveMatches, setLiveMatches] = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [recentMatches, setRecentMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  
  useEffect(() => {
  let isMounted = true;

  const loadDataSafe = async () => {
    try {
      setLoading(true);

      const live = await fetchLiveMatches();
      if (isMounted) setLiveMatches(live);

      const upcoming = await fetchUpcomingMatches();
      if (isMounted) setUpcomingMatches(upcoming);

      const recent = await fetchRecentMatches();
      if (isMounted) setRecentMatches(recent);

    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  loadDataSafe(); 

  const interval = setInterval(() => {
    loadDataSafe(); 
  }, 5000);

  return () => {
    isMounted = false;
    clearInterval(interval);
  };
}, []);

 const handleRefresh = async () => {
  setRefreshing(true);
  try {
    const live = await fetchLiveMatches();
    setLiveMatches(live);

    const upcoming = await fetchUpcomingMatches();
    setUpcomingMatches(upcoming);

    const recent = await fetchRecentMatches();
    setRecentMatches(recent);
  } catch (error) {
    console.error(error);
  } finally {
    setRefreshing(false);
  }
};
  
  return (
    <>
    <div className = "px-10">
      <div className=" text-5xl font-semibold mt-20 mb-5">
        Cricket Scores
      </div>
      <div className="flex">
      <p className="text-xl">Live updates from matches across the globe</p>
      <div></div>
      <Button variant ="outline" onClick ={handleRefresh} disabled={refreshing} className="gap-2 bg-transparent  ml-auto">
      <RefreshCcw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
      Refresh
      </Button>
      </div>
      <Tabs defaultValue="live" className="w-full">
        <TabsList className="grid grid-cols-3 gap-6">
        <TabsTrigger value="live">Live({liveMatches.length})</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming({upcomingMatches.length})</TabsTrigger>
        <TabsTrigger value="recent">Recent ({recentMatches.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="live"className="space-y-6" >
          {liveMatches.length > 0 ?
          (<div className="grid grid-cols-3 gap-6">
            {liveMatches.map((match)=>
            (<MatchCard key={match.id} match ={match} status="LIVE"/>))}
          </div>
          ):
          <EmptyState message="No live matches at the moment" />
          }
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} status="UPCOMING" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentMatches.map((match) => (
              <MatchCard key={match.id} match={match} status="RESULT" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      </div>
      
    </>
  )
}
function MatchCard({ match, status }) {
  const isUpcoming = status === "UPCOMING"

  return (
    <Card className="border border-slate-200 hover:shadow-lg transition">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">
            {match.series}
          </CardTitle>
          <span className="text-xs text-gray-500">
            {match.format}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="font-semibold">
          {match.team1} vs {match.team2}
        </div>

        {!isUpcoming && (
          <>
            <div className="flex justify-between">
              <span>{match.team1}</span>
              <span>{match.team1Score}</span>
            </div>
            <div className="flex justify-between">
              <span>{match.team2}</span>
              <span>{match.team2Score}</span>
            </div>
          </>
        )}

        <div className="text-sm font-medium text-gray-700">
          {match.status}
        </div>

        <div className="text-xs text-gray-500 flex items-center gap-1 pt-2 border-t">
          <MapPin className="h-3 w-3" />
          {match.venue}
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-slate-100 hover:shadow-2xl transition-shadow">
      <Trophy className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
      <p className="text-muted-foreground font-medium">{message}</p>
    </div>
  )
}