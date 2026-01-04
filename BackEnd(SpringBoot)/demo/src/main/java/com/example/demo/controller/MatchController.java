package com.example.demo.controller;
import com.example.demo.entity.Match;
import com.example.demo.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "*")
public class MatchController {
    @Autowired
    private MatchService matchService;

    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches()
    {
        List<Match> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }
    @GetMapping("/live")
    public  ResponseEntity<List<Match>> getLiveMatches()
    {
        List<Match> liveMatches = matchService.getLiveMatches();
        return ResponseEntity.ok(liveMatches);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id)
    {
        Optional<Match> matches = matchService.getMatchById(id);
        return matches.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/recent")
    public ResponseEntity<List<Match>> getRecentMatches() {
        List<Match> recentMatches = matchService.getRecentMatches();
        return ResponseEntity.ok(recentMatches);
    }
    @GetMapping("/upcoming")
    public ResponseEntity<List<Match>> getUpcomingMatches() {
        List<Match> upcomingMatches = matchService.getUpcomingMatches();
        return ResponseEntity.ok(upcomingMatches);
    }
    @GetMapping("/team/{teamName}")
    public ResponseEntity<List<Match>> getMatchesByTeam(@PathVariable String teamName) {
        List<Match> matches = matchService.getMatchesByTeam(teamName);
        return ResponseEntity.ok(matches);
    }
    @GetMapping("/series/{seriesName}")
    public ResponseEntity<List<Match>> getMatchesBySeries(@PathVariable String seriesName) {
        List<Match> matches = matchService.getMatchesBySeries(seriesName);
        return ResponseEntity.ok(matches);
    }
    @GetMapping("/format/{format}")
    public ResponseEntity<List<Match>> getMatchesByFormat(@PathVariable String format) {
        List<Match> matches = matchService.getMatchesByFormat(format);
        return ResponseEntity.ok(matches);
    }


}