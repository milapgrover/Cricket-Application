"use client"
// Tells Next.js this is a Client Component (not server-side).
// Required when using hooks like useState or useEffect.
// This tells Next.js that the file uses browser features like useState and useEffect.


import { useEffect, useState } from "react"
// useState: React hook to create state variables.
// useEffect: React hook to run side effects (e.g. fetch data after render).

import { Card, CardContent, CardHeader } from "@/components/ui/card"
// UI components used to structure content inside a card layout.
// These are ready-made Card UI components to neatly show match info.

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// Badge: A UI component to display small labels or tags, often used for statuses.
// Used to show match statuses like "LIVE", "Recent", etc.  
// Button: A UI component for clickable buttons.
// Used for the refresh button to reload match data.

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Tabs: A UI component to create tabbed navigation.
// Used to switch between Live, Recent, and Upcoming matches. 

import { Skeleton } from "@/components/ui/skeleton"
// Skeleton: A UI component to show loading placeholders.
// Used to display loading states while fetching match data.

import { RefreshCw, MapPin, Calendar } from "lucide-react"
// Icons from Lucide React library for visual elements like refresh, location, and date.

import { fetchLiveMatches, fetchRecentMatches, fetchUpcomingMatches, type Match } from "@/lib/api"
// Importing functions to fetch match data from the API.

export default function LiveScoresPage() {
  // Main component for the Live Scores page.
  const [liveMatches, setLiveMatches] = useState<Match[]>([])
  // State to hold live matches data.
  // Match is a type that defines the structure of a match object.  
  const [recentMatches, setRecentMatches] = useState<Match[]>([])
  // State to hold recent matches data.
  // Using useState to create state variables for live, recent, and upcoming matches.
  // Each state variable is initialized as an empty array of type Match[].
  // Match[] indicates an array of Match objects, which is a type defined in the API module.
  // This allows TypeScript to understand the structure of the match data.
  // This helps in type-checking and ensures that the data fetched matches the expected structure.
  // This is useful for ensuring that the data fetched from the API matches the expected structure.
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([])
  // State to hold upcoming matches data. 
  // Using useState to create state variables for live, recent, and upcoming matches.
  // Each state variable is initialized as an empty array of type Match[].
  // Match[] indicates an array of Match objects, which is a type defined in the API module.
  // This allows TypeScript to understand the structure of the match data.
  const [loading, setLoading] = useState(true)
  // State to track loading state while fetching data.
  // Initially set to true to show loading skeletons until data is fetched.
  const [refreshing, setRefreshing] = useState(false)
  // State to track if the data is being refreshed.
  // Initially set to false, but set to true when the user clicks the refresh button.

  const loadData = async () => {
    // Function to load match data from the API.
    setLoading(true)
    // Set loading state to true to show loading skeletons.
    setRefreshing(true)
    // Set refreshing state to true to indicate data is being refreshed.
    // This is useful for showing a loading spinner or disabling the refresh button while data is being
    try {
      // Fetch live, recent, and upcoming matches concurrently using Promise.all.
      const [live, recent, upcoming] = await Promise.all([
        // Using Promise.all to fetch all match data concurrently.
        // This allows all three API calls to run in parallel, improving performance.
        fetchLiveMatches(),
        // Fetch live matches from the API. 
        // This function is defined in the API module and returns a Promise that resolves to an array of live matches.
        fetchRecentMatches(),
        // Fetch recent matches from the API.
        // This function is defined in the API module and returns a Promise that resolves to an array
        fetchUpcomingMatches(),
        // Fetch upcoming matches from the API.
        // This function is defined in the API module and returns a Promise that resolves to an array
      ])

      setLiveMatches(live)
      // Update the liveMatches state with the fetched live matches.
      setRecentMatches(recent)
      // Update the recentMatches state with the fetched recent matches.
      setUpcomingMatches(upcoming)
      // Update the upcomingMatches state with the fetched upcoming matches.
      // This updates the state variables with the fetched data, triggering a re-render of the component
    } catch (error) {
      console.error("Error loading matches:", error)
    } finally {
      setLoading(false)
      // Set loading state to false to hide loading skeletons.
      setRefreshing(false)
      // Set refreshing state to false to indicate data has been refreshed.
    }
  }

  useEffect(() => {
    loadData()
  }, [])
  // useEffect hook to load data when the component mounts.
  // The empty dependency array [] ensures this runs only once when the component mounts.   
  // This is where the initial data fetch happens.

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadData()
  }
  // Function to handle refresh button click.
  // Sets refreshing state to true, calls loadData to fetch the latest matches,
  // and then sets refreshing state back to false once data is loaded.

  if (loading) {
    return <LoadingSkeleton />
  }
  // If loading is true, show the loading skeleton.
  // This is a fallback UI that shows a loading state while data is being fetched.

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main container for the Live Scores page */}
      {/* mx-auto centers the container, px-4 adds horizontal padding, py-8 adds vertical padding */}
      {/* This is where the main content of the Live Scores page will be rendered. */}
      {/* The container class is used to center the content and add padding. */}
      <div className="flex items-center justify-between mb-8">
      {/* Header section with title and refresh button */}
      {/* mb-8 adds margin-bottom to create space below the header */}
      {/* This section contains the title and a button to refresh the match data */}
        {/* flex makes the container a flexbox, items-center vertically centers items, justify-between spaces items evenly */}
        {/* This is where the header content will be rendered. */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Live Cricket Scores</h1>
          {/* Title of the page */}
          {/* text-4xl sets the font size to 4xl, font-bold makes the text bold, mb-2 adds margin-bottom */}
          {/* This is the main title of the Live Scores page. */}
          {/* This is where the title content will be rendered. */}
          <p className="text-muted-foreground">Stay updated with live cricket matches from around the world</p>
          {/* Subtitle providing context about the page */}
          {/* text-muted-foreground applies a muted color to the text */}
          {/* This is a brief description of the Live Scores page. */}
          {/* This is where the subtitle content will be rendered. */}  
        </div>
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline" size="sm">
        {/* Button to refresh match data */}
        {/* onClick handler calls handleRefresh function when the button is clicked */}
        {/* disabled prop prevents clicking while refreshing */}
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          {/* Refresh icon with spin animation when refreshing */}
          {/* h-4 w-4 sets the icon size, mr-2 adds margin-right */}
          {/* animate-spin class applies a spinning animation when refreshing is true */}
          {/* This is the button that allows users to refresh the match data. */}
          {/* This is where the refresh button content will be rendered. */}
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="live" className="space-y-6">
      {/* Tabs component to switch between Live, Recent, and Upcoming matches */}
      {/* defaultValue sets the initial active tab to "live" */}
      {/* space-y-6 adds vertical spacing between tabs and content */}
      {/* This is where the tabs for Live, Recent, and Upcoming matches will be rendered. */}
      {/* The Tabs component is used to create a tabbed interface for the Live Scores page. */}
        {/* This allows users to switch between different categories of matches easily. */}
        <TabsList className="grid w-full grid-cols-3">
        {/* TabsList component to hold the individual tab triggers */}
        {/* grid makes the list a grid layout, w-full sets width to full, grid-cols-3 creates three equal columns */}
        {/* This is where the individual tab triggers will be rendered. */}
          {/* Each tab trigger will represent a category of matches (Live, Recent, Upcoming) */}
          <TabsTrigger value="live" className="flex items-center gap-2">
          {/* Tab trigger for Live matches */}
          {/* value prop sets the value for this tab trigger */}
          {/* className applies flexbox layout, items-center vertically centers items, gap-2 adds horizontal spacing */}
            {/* This is the tab that shows live matches */}
            <div className="w-2 h-2 bg-red-500 rounded-full match-live"></div>
            {/* Small red dot indicator for live matches */}
            {/* w-2 h-2 sets the size, bg-red-500 applies a red background, rounded-full makes it circular */}
            {/* This visually indicates that this tab is for live matches */}
            {/* This is where the live matches tab content will be rendered. */}  
            Live ({liveMatches.length})
            {/* Displays the number of live matches */}
            {/* liveMatches.length gives the count of live matches */}
            {/* This is where the count of live matches will be displayed. */}
          </TabsTrigger>
          {/* Tab trigger for Recent matches */}
          <TabsTrigger value="recent" className="flex items-center gap-2">
            {/* value prop sets the value for this tab trigger */}
            {/* className applies flexbox layout, items-center vertically centers items, gap-2 adds horizontal spacing */}
            Recent ({recentMatches.length})
            {/* Displays the number of recent matches */}
            {/* recentMatches.length gives the count of recent matches */}
            {/* This is where the count of recent matches will be displayed. */}
          </TabsTrigger>
          {/* Tab trigger for Upcoming matches */}
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            {/* value prop sets the value for this tab trigger */}
            {/* className applies flexbox layout, items-center vertically centers items, gap-2 adds horizontal spacing */}
            Upcoming ({upcomingMatches.length})
            {/* Displays the number of upcoming matches */}
            {/* upcomingMatches.length gives the count of upcoming matches */}
            {/* This is where the count of upcoming matches will be displayed. */}
            Live ({liveMatches.length})
            
          </TabsTrigger>
          <TabsTrigger value="recent">Recent ({recentMatches.length})</TabsTrigger>
          {/* Tab trigger for Recent matches */}
          {/* value prop sets the value for this tab trigger */}
          {/* className applies flexbox layout, items-center vertically centers items, gap-2 adds horizontal spacing */}
          {/* Displays the number of recent matches */}
          {/* recentMatches.length gives the count of recent matches */}
          {/* This is where the count of recent matches will be displayed. */}
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
          {/* Tab trigger for Upcoming matches */}
          {/* value prop sets the value for this tab trigger */}
          {/* className applies flexbox layout, items-center vertically centers items, gap-2 adds horizontal spacing */}
            Upcoming ({upcomingMatches.length})
            {/* Displays the number of upcoming matches */}
            {/* upcomingMatches.length gives the count of upcoming matches */}
            {/* This is where the count of upcoming matches will be displayed. */}
          </TabsTrigger>
          {/* Tab trigger for Upcoming matches */}
          {/* value prop sets the value for this tab trigger */}
          {/* className applies flexbox layout, items-center vertically centers items, gap-2 adds horizontal spacing */}
          {/* Displays the number of upcoming matches */}
          {/* upcomingMatches.length gives the count of upcoming matches */}
          <TabsTrigger value="upcoming">Upcoming ({upcomingMatches.length})</TabsTrigger>
          {/* Displays the number of upcoming matches */}
          {/* upcomingMatches.length gives the count of upcoming matches */}
          {/* This is where the count of upcoming matches will be displayed. */}
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {/* Content for Live matches tab */}
          {/* space-y-6 adds vertical spacing between content items */}
          {/* This is where the live matches content will be rendered. */}
          {/* The content inside this tab will show live matches */}
          {liveMatches.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No live matches at the moment</p>
                {/* Message displayed when there are no live matches */}
                {/* text-muted-foreground applies a muted color to the text */}
                {/* This is where the message for no live matches will be displayed. */}    

              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {liveMatches.map((match) => (
                <LiveMatchCard key={match.id} match={match} />
                // Render each live match using the LiveMatchCard component
                // match.id is used as the key for each card to ensure uniqueness
                // This is where each live match card will be rendered.
                // The LiveMatchCard component is used to display detailed information about each live match.
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          {recentMatches.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                {/* Content for Recent matches tab */}
                {/* space-y-6 adds vertical spacing between content items */}
                {/* This is where the recent matches content will be rendered. */}
                {/* The content inside this tab will show recent matches */}
                <p className="text-muted-foreground">No recent matches</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {recentMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
                // Render each recent match using the MatchCard component
                // match.id is used as the key for each card to ensure uniqueness
                // This is where each recent match card will be rendered.
                // The MatchCard component is used to display detailed information about each recent match.
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingMatches.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
              {/* Content for Upcoming matches tab */}
              {/* space-y-6 adds vertical spacing between content items */}
              {/* This is where the upcoming matches content will be rendered. */}
                <p className="text-muted-foreground">No upcoming matches</p>
              </CardContent>
            </Card>
          // Content for Upcoming matches tab
          // space-y-6 adds vertical spacing between content items
          // This is where the upcoming matches content will be rendered.         
          // The content inside this tab will show upcoming matches
          // This is where the message for no upcoming matches will be displayed.   

          ) : (
            <div className="grid gap-6">
              {upcomingMatches.map((match) => (
                // Render each upcoming match using the MatchCard component
                // match.id is used as the key for each card to ensure uniqueness
                // This is where each upcoming match card will be rendered.
                // The MatchCard component is used to display detailed information about each upcoming match.
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LiveMatchCard({ match }: { match: Match }) {
  return (
    <Card className="border-l-4 border-l-red-500">
      <CardHeader>
      {/* CardHeader component to display match header */}
      {/* border-l-4 adds a left border, border-l-red-500 sets the color to red */}
      {/* This is where the header content of the live match card will be rendered. */}
      {/* The CardHeader component is used to display the header of the live match card. */}
      {/* This visually indicates that this card is for a live match */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">{match.status}</Badge>
            {/* Badge component to display match status */}
            {/* variant="secondary" applies a secondary style to the badge */}
            {/* This is where the match status badge will be rendered. */}
            {/* The Badge component is used to display the status of the match (e.g., LIVE, Recent, Upcoming) */}
            <span className="text-sm text-muted-foreground">{match.date}</span>
            {/* Displays the match date */}
            {/* text-sm sets the font size to small, text-muted-foreground applies a muted color to the text */}
            {/* This is where the match date will be displayed. */}
          </div>
          {/* Flex container to align items horizontally */}
          {/* items-center vertically centers items, gap-3 adds horizontal spacing */}
          {/* This is where the match status and date content will be rendered. */}
          <div className="flex items-center gap-3">
            <Badge variant="destructive" className="match-live">  
              {/* Badge component to indicate live status */}
              {/* variant="destructive" applies a red style to indicate live status */}
              {/* This is where the live status badge will be rendered. */}
              {/* The Badge component is used to visually indicate that the match is currently live */}
              LIVE

            </Badge>
            <span className="font-medium">{match.format}</span>
          </div>
          <div className="text-sm text-muted-foreground">{match.overs && `${match.overs} overs`}</div>
          {/* Displays the number of overs if available */}
          {/* text-sm sets the font size to small, text-muted-foreground applies a muted color to the text */}
          {/* This is where the overs information will be displayed. */}
          {/* The overs information indicates how many overs have been bowled in the match */}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grid layout to display team scores side by side on larger screens */}
          {/* grid-cols-1 sets one column on small screens, md:grid-cols-2 sets two columns on medium and larger screens */}
          {/* gap-6 adds spacing between the grid items */}
          {/* This is where the team scores will be displayed in a grid layout. */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              {/* Flex container to align team scores horizontally */}
              {/* items-center vertically centers items, justify-between spaces items evenly */}
              {/* This is where the team scores will be displayed in a flex layout. */}
              <div>
                <h3 className="font-semibold text-lg">{match.team1}</h3>
                {/* Displays the name of Team 1 */}
                {/* font-semibold sets the font weight to semi-bold, text-lg sets the font size to large */}
                {/* This is where the name of Team 1 will be displayed. */}
                <p className="text-2xl font-bold text-primary">{match.team1Score}</p>
                {/* Displays the score of Team 1 */}
                {/* text-2xl sets the font size to 2xl, font-bold makes the text bold, text-primary applies primary color */}
                {/* This is where the score of Team 1 will be displayed. */}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              {/* Flex container to align team scores horizontally */}
              {/* items-center vertically centers items, justify-between spaces items evenly */}
              {/* This is where the team scores will be displayed in a flex layout. */}
              <div>
                <h3 className="font-semibold text-lg">{match.team2}</h3>
                {/* Displays the name of Team 2 */}
                {/* font-semibold sets the font weight to semi-bold, text-lg sets the font size to large */}
                {/* This is where the name of Team 2 will be displayed. */}
                <p className="text-2xl font-bold text-primary">{match.team2Score}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Space for additional match details like current batsmen, bowler, target, etc. */}
            {/* space-y-4 adds vertical spacing between the items */}
            {/* This is where additional match details will be displayed. */}
            {match.currentBatsman1 && (
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-medium mb-2 text-primary">Current Partnership</h4>
                {/* Displays the current partnership information */}
                {/* font-medium sets the font weight to medium, mb-2 adds margin-bottom, text-primary applies primary color */}
                {/* This is where the current partnership information will be displayed. */}
                <div className="space-y-1 text-sm">
                  {/* Space for individual batsmen and bowler details */}
                  {/* space-y-1 adds vertical spacing between the items */}
                  {/* This is where the individual batsmen and bowler details will be displayed. */}
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
                <h4 className="font-medium mb-2 text-orange-700 dark:text-orange-300">Target</h4>
                {/* Displays the target score if available */}
                {/* font-medium sets the font weight to medium, mb-2 adds margin-bottom, text-orange-700 applies orange color */}
                {/* This is where the target score information will be displayed. */}
                <p className="text-lg font-bold">{match.target} runs</p>
                {match.required && <p className="text-sm text-muted-foreground">{match.required}</p>}
                {/* Displays the required runs if available */}
                {/* text-sm sets the font size to small, text-muted-foreground applies a muted color to the text */}
                {/* This is where the required runs information will be displayed. */}  
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-t pt-4">
          {/* Flex container to display match details like venue and date */}
          {/* flex-wrap allows items to wrap to the next line if they don't fit in one line */}
          {/* gap-4 adds horizontal spacing between the items, text-sm sets the font size to small */}
          {/* This is where the match details will be displayed. */}
          <div className="flex items-center gap-2">
            {/* Flex container to align items horizontally */}
            {/* items-center vertically centers items, gap-2 adds horizontal spacing */}
            <MapPin className="h-4 w-4" />
            {/* MapPin icon to indicate venue */}
            {/* h-4 w-4 sets the icon size */}
            {/* This is where the venue icon will be displayed. */}
            {/* The MapPin icon visually indicates the location of the match venue */}
            <span>{match.venue}</span>
            {/* Displays the match venue */}
            {/* This is where the match venue will be displayed. */}
          </div>
          <div className="flex items-center gap-2">
            {/* Flex container to align items horizontally */}
            {/* items-center vertically centers items, gap-2 adds horizontal spacing */}
            <Calendar className="h-4 w-4" />
            <span>{new Date(match.date).toLocaleDateString()}</span>
            {/* Displays the match date in a localized format */}
            {/* new Date(match.date).toLocaleDateString() converts the date to a readable format */}
            {/* This is where the match date will be displayed. */}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MatchCard({ match }: { match: Match }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
    {/* Card component to display match details */}
    {/* hover:shadow-lg adds a shadow effect on hover, transition-shadow smooths the transition */}
    {/* This is where the match card content will be rendered. */}
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{match.status}</Badge>
          {/* Badge component to display match status */}
          {/* variant="secondary" applies a secondary style to the badge */}
          {/* This is where the match status badge will be rendered. */}
          <span className="text-sm text-muted-foreground">{match.format}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
          {/* Grid layout to display team scores side by side */}
          {/* grid-cols-2 sets two equal columns, gap-4 adds spacing between the columns */}
          {/* This is where the team scores will be displayed in a grid layout. */}
            <h3 className="font-semibold mb-1">{match.team1}</h3>
            <p className="text-lg font-bold text-primary">{match.team1Score}</p>
            {/* Displays the name and score of Team 1 */}
            {/* font-semibold sets the font weight to semi-bold, mb-1 adds margin-bottom, text-lg sets the font size to large, font-bold makes the text bold, text-primary applies primary color */}
            {/* This is where the name and score of Team 1 will be displayed. */}
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
          {/* Flex container to align team scores horizontally */}
          {/* items-center vertically centers items, justify-between spaces items evenly */}
            <h3 className="font-semibold mb-1">{match.team2}</h3>
            <p className="text-lg font-bold text-primary">{match.team2Score}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{match.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Flex container to align items horizontally */}
            {/* items-center vertically centers items, gap-2 adds horizontal spacing */}
            {/* This is where the match details will be displayed. */}
            {/* The MapPin icon visually indicates the location of the match venue */}
            {/* MapPin icon to indicate venue */}
            {/* h-4 w-4 sets the icon size */}
            {/* This is where the venue icon will be displayed. */}
            {/* Displays the match venue */}
            {/* This is where the match venue will be displayed. */}
            <span>{match.venue}</span>
            {/* Displays the match venue */}
            {/* This is where the match venue will be displayed. */}    
            <Calendar className="h-4 w-4" />
            {/* Calendar icon to indicate match date */}
            {/* h-4 w-4 sets the icon size */}
            {/* This is where the calendar icon will be displayed. */}
            {/* Displays the match date in a localized format */}
            {/* new Date(match.date).toLocaleDateString() converts the date to a readable format */}
            {/* This is where the match date will be displayed. */}
            <span>{new Date(match.date).toLocaleDateString()}</span>
            
          </div>
        </div>
      </CardContent>
    </Card>
   
  ) 
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Loading skeleton for the Live Scores page */}
      {/* mx-auto centers the container, px-4 adds horizontal padding, py-8 adds vertical padding */}
      {/* This is a placeholder UI that shows while data is being fetched */}
      {/* The container class is used to center the content and add padding. */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <Skeleton className="h-10 w-80 mb-2" />
          {/* Skeleton for the title */}
          {/* h-10 sets the height to 10, w-80 sets the width to 80 */}
          {/* mb-2 adds margin-bottom to create space below the title */}
          {/* This is where the title skeleton will be displayed. */}
          <Skeleton className="h-5 w-96" />
          {/* Skeleton for the subtitle */}
          {/* h-5 sets the height to 5, w-96 sets the width to 96 */}
          {/* This is where the subtitle skeleton will be displayed. */}
        </div>
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="space-y-6">
        {/* Space for loading skeletons for live, recent, and upcoming matches */}
        {/* space-y-6 adds vertical spacing between the skeletons */}
        {/* This is where the loading skeletons for live, recent, and upcoming matches will be displayed. */}
        <Skeleton className="h-10 w-full" />
        {[1, 2, 3].map((i) => (
          // Loop to create multiple skeleton cards for matches
          // [1, 2, 3] creates an array of three items to generate three skeleton cards
          // This is where the skeleton cards for matches will be displayed.
          <Card key={i}>
            <CardContent className="p-6">
              {/* CardContent component to hold the skeleton content */}
              {/* p-6 adds padding to the content */}
              {/* This is where the skeleton content for each match card will be displayed. */}
              <Skeleton className="h-32 w-full" />
              {/* Skeleton for match card content */}
              {/* h-32 sets the height to 32, w-full sets the width to full */}
              {/* This is where the skeleton for each match card will be displayed. */}
            </CardContent>
          </Card>
        ))}
        {/* Skeleton for each match card */}
        {/* h-32 sets the height to 32, w-full sets the width to full */}
        {/* This is where the skeleton for each match card will be displayed. */}
        {/* The Card component is used to create a card-like structure for each match */}
        {/* The CardContent component is used to hold the content of each match card */}
      </div>
    </div>
  )
}
