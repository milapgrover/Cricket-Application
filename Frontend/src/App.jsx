import { Routes, Route } from "react-router-dom";
import Home  from "./pages/Home";
import { Header } from "./components/header";
import  LiveScores from "./pages/LiveScores"
import  News from "./pages/News"
import  Players from "./pages/Players"
import  Series from "./pages/Series"
import MatchCenter from "./pages/MatchCenter"
import Rankings from "./pages/Rankings"

export default function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element ={<Home />}></Route>
        <Route path="/live-scores" element ={<LiveScores />}></Route>
        <Route path="/news" element ={<News />}></Route>
        <Route path="/match-center" element ={<MatchCenter />}></Route>
        <Route path="/players" element ={<Players />}></Route>
        <Route path="/series" element ={<Series />}></Route>
        <Route path="/rankings" element ={<Rankings />}></Route>
      </Routes>
    </>
  );
}
