const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://cricket-application.onrender.com/api";
export async function fetchLiveMatches() {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/live`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch live matches: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching live matches:", error);
    throw error;
  }
}

export async function fetchRecentMatches() {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/recent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch recent matches: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching recent matches:", error);
    throw error;
  }
}

export async function fetchUpcomingMatches() {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/upcoming`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch upcoming matches: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    throw error;
  }
}

// =======================
// NEWS APIs
// =======================
export async function fetchFeaturedNews() {
  const response = await fetch(`${API_BASE_URL}/news/featured`);
  if (!response.ok) throw new Error("Failed to fetch featured news");
  return await response.json();
}

export async function fetchAllNews() {
  const response = await fetch(`${API_BASE_URL}/news`);
  if (!response.ok) throw new Error("Failed to fetch news");
  return await response.json();
}

export async function fetchNewsByCategory(category) {
  const response = await fetch(`${API_BASE_URL}/news/category/${category}`);
  if (!response.ok) throw new Error("Failed to fetch news by category");
  return await response.json();
}

export async function searchNews(query) {
  const response = await fetch(
    `${API_BASE_URL}/news/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("Failed to search news");
  return await response.json();
}

// =======================
// PLAYER APIs
// =======================
export async function fetchPlayerSpotlight() {
  const response = await fetch(`${API_BASE_URL}/players/spotlight`);
  if (!response.ok) throw new Error("Failed to fetch player spotlight");
  return await response.json();
}

export async function fetchAllPlayers() {
  const response = await fetch(`${API_BASE_URL}/players`);
  if (!response.ok) throw new Error("Failed to fetch players");
  return await response.json();
}

export async function searchPlayers(query) {
  const response = await fetch(
    `${API_BASE_URL}/players/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("Failed to search players");
  return await response.json();
}

// =======================
// TEAM & TOURNAMENT APIs
// =======================
export async function fetchTeamRankings(format) {
  const response = await fetch(
    `${API_BASE_URL}/teams/rankings?format=${format}`
  );
  if (!response.ok) throw new Error("Failed to fetch team rankings");
  return await response.json();
}

export async function fetchTournaments() {
  const response = await fetch(`${API_BASE_URL}/tournaments`);
  if (!response.ok) throw new Error("Failed to fetch tournaments");
  return await response.json();
}
