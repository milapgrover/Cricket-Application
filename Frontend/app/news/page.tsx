"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Eye, Calendar, User } from "lucide-react"
import Image from "next/image"
import { fetchAllNews, fetchNewsByCategory, searchNews, type NewsArticle } from "@/lib/api"

const categories = ["All", "International", "Domestic", "IPL", "Analysis", "Interviews"]

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [searching, setSearching] = useState(false)

  const loadNews = async (category = "All") => {
    try {
      setLoading(true)
      const articles = category === "All" ? await fetchAllNews() : await fetchNewsByCategory(category)
      setNews(articles)
    } catch (error) {
      console.error("Error loading news:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadNews(activeCategory)
      return
    }

    try {
      setSearching(true)
      const results = await searchNews(searchQuery)
      setNews(results)
    } catch (error) {
      console.error("Error searching news:", error)
    } finally {
      setSearching(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setSearchQuery("")
    loadNews(category)
  }

  useEffect(() => {
    loadNews()
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Cricket News</h1>
        <p className="text-muted-foreground">Latest cricket news, analysis, and insights from around the world</p>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} disabled={searching}>
          {searching ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Categories */}
      <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="mb-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* News Grid */}
      {news.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              {searchQuery ? "No news found for your search." : "No news available."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={article.imageUrl || "/placeholder.svg?height=200&width=400&query=cricket news"}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {article.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {article.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span>{article.views}</span>
          </div>
        </div>

        <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3>

        <p className="text-sm text-muted-foreground line-clamp-3">{article.summary}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
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

      <div className="flex gap-2 mb-6">
        <Skeleton className="h-10 flex-1 max-w-md" />
        <Skeleton className="h-10 w-20" />
      </div>

      <Skeleton className="h-10 w-full mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <Skeleton className="aspect-video w-full" />
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
