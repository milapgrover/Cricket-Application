import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, TrendingUp, Calendar, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import {
  fetchLiveMatches,
  fetchRecentMatches,
  fetchFeaturedNews,
  fetchPlayerSpotlight,
  fetchTournaments,
} from "@/lib/api";
export default function Home() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([])
  const [playerSpotlight, setPlayerSpotlight] = useState([])
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
 useEffect(()=>{
  let isMounted = true;

  async function loadData() {
    try{
      setError(null)

      const live = await fetchLiveMatches()
      if(isMounted) setLiveMatches(live)

      const recent = await fetchRecentMatches()
      if(isMounted) setRecentMatches(recent) 

      const news = await fetchFeaturedNews()
      if(isMounted) setFeaturedNews(news) 

      const players = await fetchPlayerSpotlight()
      if(isMounted) setPlayerSpotlight(players) 

      const tourns = await fetchTournaments()
      if(isMounted) setTournaments(tourns)
    }
    catch(err)
    {
      setError("Failed to load data. Please check your connection.")
    }
    finally{
      setLoading(false)
    }
  }

  loadData()

  const interval = setInterval(()=>{
    loadData()
  },5000)   

  return ()=>{
    isMounted = false
    clearInterval(interval)
  }
},[])


  return (
    <>
      <div className="container mx-auto px-12 py-5 space-y-20">
        <section className="cricket-gradient rounded-2xl px-12 py-14 text-white">
          <h1 className=" text-4xl mb-6">Live Cricket Action</h1>
          <p className="text-2xl opacity-90 mb-6">
            Stay updated with live scores, latest news, and cricket insights
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="border-2 border-white-500  px-5 py-3 secondary">
              <Link to="/live-scores">View Live Scores</Link>
            </button>
            <button className="border-2 border-white-500 px-5 py-3 secondary">
              <Link to="/news">Latest News</Link>
            </button>
          </div>
        </section>
      </div>
      {liveMatches.length > 0 && (
        <div>
          <section className="flex items-center px-20 gap-3 ">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="text-4xl py-3 font-extralight">Live Matches</div>
            <button className="ml-auto mr-20 border-2 rounded-2xl bg-blue-400 text-white px-5 py-3 ">
              <Link to="/live-scores">View All</Link>
            </button>
          </section>
          <div className="px-16 grid grid-cols-3  gap-6 mb-8">
            {liveMatches.slice(0, 3).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}
      {recentMatches.length > 0 && (
        <div>
          <section className="flex">
            <div className="text-4xl  font-normal px-16">Recent Matches</div>
            <button className="ml-auto mr-20 border-2 rounded-2xl bg-blue-400 text-white px-5 py-3 ">
              <Link to="/live-scores">View All</Link>
            </button>
          </section>
          <div className=" px-16 grid grid-cols-3 gap-6 mt-3">
            {recentMatches.slice(0, 3).map((match) => (
              <MatchCard key={match.id} match={match} isLive />
            ))}
          </div>
        </div>
      )}
      {
        featuredNews.length >0 &&(
          <div className="mt-8">
            <section className="flex items-center ">
            <div className=" font-normal text-4xl px-16 mb-3">Features News</div>
            <button className="ml-auto mr-20 border-2 rounded-2xl bg-blue-400 text-white px-5 py-3 mb-3"> <Link to="/news">View All</Link></button>
            </section>
            <div className="grid grid-cols-3 px-16 gap-6 mt-3">
            {featuredNews.slice(0,3).map((article)=>(<NewsCard key={article.id} article={article}/>))}
          </div>
          </div>
        )
      }
      {
        playerSpotlight.length > 0 && 
        <div className="mt-8">
            <section className="flex items-center ">
            <div className=" font-normal text-4xl px-16 mb-3">Player Spotlight</div>
            <button className="ml-auto mr-20 border-2 rounded-2xl bg-blue-400 text-white px-5 py-3 mb-3"> <Link to="/players">View All</Link></button>
            </section>
            <div className="grid grid-cols-4 px-16 gap-6 mt-3">
            {playerSpotlight.slice(0,4).map((player)=>(<PlayerCard key={player.id} player={player}/>))}
          </div>
          </div>
      }
      {
        tournaments.length > 0 && 
        <div className="mt-8">
            <section className="flex items-center ">
            <div className=" font-normal text-4xl px-16 mb-3">Tournaments</div>
            <button className="ml-auto mr-20 border-2 rounded-2xl bg-blue-400 text-white px-5 py-3 mb-3"> <Link to="/series">View All</Link></button>
            </section>
            <div className="grid grid-cols-3 px-16 gap-6 mt-3">
            {tournaments.slice(0,3).map((tournament)=>(<TournamentCard key={tournament.id} tournament={tournament}/>))}
          </div>
          </div>
      }
    </>
  );
}
function MatchCard({ match, isLive = false }) {
  return (
    <Card className="border border-slate-100 hover:shadow-2xl transition-shadow  ">
      <CardHeader >
        <div className="flex items-center justify-between">
          <span className="font-semibold bg-gray-300 rounded-sm px-1 ">
            {!isLive ? "LIVE" : match.status}
          </span>

          <span className=" ">
            {match.format}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{match.team1}</span>
            <span className="font-semibold">{match.team1Score}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">{match.team2}</span>
            <span className="font-semibold">{match.team2Score}</span>
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

        <div className="mb-auto flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{match.venue}</span>
          <br />
          <br />
        </div>
      </CardContent>
    </Card>
  );
}

function NewsCard({ article }) {
  return (
    <Card className="border border-slate-100 transition-shadow hover:shadow-2xl">
      <div className="aspect-video">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <Badge variant="outline" className="bg-gray-300 w-fit">
          {article.category}
        </Badge>
        <h3 className="font-semibold text-lg leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {article.summary}
        </p>
        <span className="text-sm text-muted-foreground">
          {article.author}
        </span>
      </CardContent>
    </Card>
  )
}

function PlayerCard({ player }) {
  return (
    <Card className="border border-slate-100 hover:shadow-2xl transition-shadow">
      <CardContent className="p-4 ">
        <div className="w-16 h-16 mx-auto mb-3 relative">
         <img
  src={player.imageUrl || "/placeholder.png"}
  alt={player.name}
  className="w-full h-full rounded-full object-cover"
/>

        </div>
        <h2 className="font-semibold text-center mb-1">{player.name}  ({player.country})</h2>
        <p>Recent Form: {player.recentForm}</p>
        <h3 className=" flex mr-auto">
           {player.role}
        </h3>
      </CardContent>
    </Card>
  )
}

function TournamentCard({ tournament }) {
  return (
    <Card className="border border-slate-100 hover:shadow-2xl transition-shadow">
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
          <span>{tournament.location}</span>
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