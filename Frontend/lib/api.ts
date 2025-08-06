const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// Types
export interface Match {
  id: number
  team1: string
  team2: string
  team1Score: string
  team2Score: string
  status: string
  venue: string
  date: string
  format: string
  currentBatsman1?: string
  currentBatsman2?: string
  currentBowler?: string
  overs?: string
  target?: number
  required?: string
}

export interface NewsArticle {
  id: number
  title: string
  summary: string
  content: string
  author: string
  publishedAt: string
  category: string
  imageUrl: string
  featured: boolean
  views: number
}

export interface Player {
  id: number
  name: string
  team: string
  role: string
  battingAverage: number
  bowlingAverage: number
  matches: number
  runs: number
  wickets: number
  imageUrl: string
  recentForm: string
  ranking: number
}

export interface Team {
  id: number
  name: string
  format: string
  ranking: number
  points: number
  matches: number
  wins: number
  losses: number
  draws: number
  winPercentage: number
  flagUrl: string
}

export interface Tournament {
  id: number
  name: string
  startDate: string
  endDate: string
  venue: string
  format: string
  status: string
  teams: string[]
  description: string
}

// API Functions
export async function fetchLiveMatches(): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/live`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch live matches: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching live matches:", error)
    throw error
  }
}

export async function fetchRecentMatches(): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/recent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch recent matches: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching recent matches:", error)
    throw error
  }
}

export async function fetchUpcomingMatches(): Promise<Match[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/upcoming`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch upcoming matches: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching upcoming matches:", error)
    throw error
  }
}

export async function fetchFeaturedNews(): Promise<NewsArticle[]> {
  const response = await fetch(`${API_BASE_URL}/news/featured`)
  if (!response.ok) throw new Error("Failed to fetch featured news")
  return await response.json()
}

export async function fetchAllNews(): Promise<NewsArticle[]> {
  const response = await fetch(`${API_BASE_URL}/news`)
  if (!response.ok) throw new Error("Failed to fetch news")
  return await response.json()
}

export async function fetchNewsByCategory(category: string): Promise<NewsArticle[]> {
  const response = await fetch(`${API_BASE_URL}/news/category/${category}`)
  if (!response.ok) throw new Error("Failed to fetch news by category")
  return await response.json()
}

export async function fetchPlayerSpotlight(): Promise<Player[]> {
  const response = await fetch(`${API_BASE_URL}/players/spotlight`)
  if (!response.ok) throw new Error("Failed to fetch player spotlight")
  return await response.json()
}

export async function fetchAllPlayers(): Promise<Player[]> {
  const response = await fetch(`${API_BASE_URL}/players`)
  if (!response.ok) throw new Error("Failed to fetch players")
  return await response.json()
}

export async function fetchTeamRankings(format: string): Promise<Team[]> {
  const response = await fetch(`${API_BASE_URL}/teams/rankings?format=${format}`)
  if (!response.ok) throw new Error("Failed to fetch team rankings")
  return await response.json()
}

export async function fetchTournaments(): Promise<Tournament[]> {
  const response = await fetch(`${API_BASE_URL}/tournaments`)
  if (!response.ok) throw new Error("Failed to fetch tournaments")
  return await response.json()
}

export async function searchNews(query: string): Promise<NewsArticle[]> {
  const response = await fetch(`${API_BASE_URL}/news/search?q=${encodeURIComponent(query)}`)
  if (!response.ok) throw new Error("Failed to search news")
  return await response.json()
}

export async function searchPlayers(query: string): Promise<Player[]> {
  const response = await fetch(`${API_BASE_URL}/players/search?q=${encodeURIComponent(query)}`)
  if (!response.ok) throw new Error("Failed to search players")
  return await response.json()
}
