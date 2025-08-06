package com.cricinfo.controller;

import com.cricinfo.entity.Match;
import com.cricinfo.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
// tick
@RequestMapping("/api/matches")
@CrossOrigin(origins = "*")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches() {
        List<Match> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }
// tick
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
        Optional<Match> match = matchService.getMatchById(id);
        return match.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
// not giving any answer but running
    @GetMapping("/live")
    public ResponseEntity<List<Match>> getLiveMatches() {
        List<Match> liveMatches = matchService.getLiveMatches();
        return ResponseEntity.ok(liveMatches);
    }
// tick
    @GetMapping("/recent")
    public ResponseEntity<List<Match>> getRecentMatches() {
        List<Match> recentMatches = matchService.getRecentMatches();
        return ResponseEntity.ok(recentMatches);
    }
// tick
    @GetMapping("/upcoming")
    public ResponseEntity<List<Match>> getUpcomingMatches() {
        List<Match> upcomingMatches = matchService.getUpcomingMatches();
        return ResponseEntity.ok(upcomingMatches);
    }
// tick
    @GetMapping("/team/{teamName}")
    public ResponseEntity<List<Match>> getMatchesByTeam(@PathVariable String teamName) {
        List<Match> matches = matchService.getMatchesByTeam(teamName);
        return ResponseEntity.ok(matches);
    }
// tick
    @GetMapping("/series/{seriesName}")
    public ResponseEntity<List<Match>> getMatchesBySeries(@PathVariable String seriesName) {
        List<Match> matches = matchService.getMatchesBySeries(seriesName);
        return ResponseEntity.ok(matches);
    }
// tick
    @GetMapping("/format/{format}")
    public ResponseEntity<List<Match>> getMatchesByFormat(@PathVariable String format) {
        List<Match> matches = matchService.getMatchesByFormat(format);
        return ResponseEntity.ok(matches);
    }
// error
    @PostMapping
    public ResponseEntity<Match> createMatch(@RequestBody Match match) {
        Match createdMatch = matchService.createMatch(match);
        return ResponseEntity.ok(createdMatch);
    }
// tick
    @PutMapping("/{id}")
    public ResponseEntity<Match> updateMatch(@PathVariable Long id, @RequestBody Match match) {
        Optional<Match> updatedMatch = matchService.updateMatch(id, match);
        return updatedMatch.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
// tick
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        boolean deleted = matchService.deleteMatch(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
