import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header() {

  const navigation = [
    { name: "Home", to: "/" },
    { name: "Live Scores", to: "/live-scores" },
    { name: "News", to: "/news" },
    { name: "Match Center", to: "/match-center" },
    { name: "Players", to: "/players" },
    { name: "Rankings", to: "/rankings" },
    { name: "Series", to: "/series" },
  ]

  return (
    <>
    <header className="sticky top-0  w-full border border-slate-200 backdrop-blur mb-8">
  <div className="container mx-auto px-4">
    <div className="flex h-16 items-center justify-between ">

      <Link to="/" className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full cricket-gradient flex items-center justify-center">
          <span className="text-white font-bold text-sm">CI</span>
        </div>
        <span className="font-bold text-xl text-primary">CricInfo</span>
      </Link>

      <nav className="flex items-center justify-between mr-auto ml-30 space-x-15 font-bold">
        {navigation.map((match) => (
          <Link
            to={match.to}
            key={match.name}
            className="font-semibold text-xl hover:text-primary transition-colors"
          >
            {match.name}
          </Link>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <Input type="text" placeholder="Search..." className="border border-slate-100 w-40 h-8"/>
        <Search className="h-4 w-4 text-muted-foreground">Search</Search>
      </div>
        
    </div>
  </div>
</header>
    </>
  )
}
