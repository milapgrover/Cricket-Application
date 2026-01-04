import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Eye, Calendar, User } from "lucide-react";
import { fetchAllNews, fetchNewsByCategory, searchNews } from "@/lib/api";

const categories = [
  "All",
  "International",
  "Domestic",
  "IPL",
  "Analysis",
  "Interviews",
];

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true)
      const articles =
        activeCategory === "All"
          ? await fetchAllNews()
          : await fetchNewsByCategory(activeCategory)

      setNews(articles)
    } catch (error) {
      console.error("Error loading news:", error)
    } finally {
      setLoading(false)
    }
  }

  loadData()
}, [activeCategory])

const handleCategoryChange = (category) => {
  setActiveCategory(category)
}

  return (
    <>
      <div className=" px-10 container mx-auto  py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold mb-2">Cricket News</h1>
            <p className="text-muted-foreground text-lg">
              Latest cricket news, analysis, and insights from around the world
            </p>
          </div>
        </div>
        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="mb-8">
          <TabsList className="grid grid-cols-6 w-full">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {news.length === 0 ? (
          <p className="text-center text-muted-foreground">No news available</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
function NewsCard({ article }) {
  return (
    <Card className="border border-slate-100 hover:shadow-2xl transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={article.imageUrl || "/placeholder.png"}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {article.featured && (
          <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>
        )}
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

        <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.summary}
        </p>

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
  );
}
