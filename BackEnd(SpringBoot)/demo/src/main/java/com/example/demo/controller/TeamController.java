package com.example.demo.controller;
import com.example.demo.entity.Team;
import com.example.demo.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "*")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.getAllTeams();
        return ResponseEntity.ok(teams);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
        Optional<Team> team = teamService.getTeamById(id);
        return team.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/rankings")
    public ResponseEntity<List<Team>> getTeamRankings(@RequestParam(defaultValue = "TEST") String format) {
        List<Team> teams = teamService.getTeamsByFormat(format);
        return ResponseEntity.ok(teams);
    }

    // tick
    @GetMapping("/format/{format}")
    public ResponseEntity<List<Team>> getTeamsByFormat(@PathVariable String format) {
        List<Team> teams = teamService.getTeamsByFormat(format);
        return ResponseEntity.ok(teams);
    }

    // tick
    @GetMapping("/name/{name}")
    public ResponseEntity<Team> getTeamByName(@PathVariable String name) {
        Team team = teamService.getTeamByName(name);
        return team != null ? ResponseEntity.ok(team) : ResponseEntity.notFound().build();
    }

    // tick
    @GetMapping("/formats")
    public ResponseEntity<List<String>> getAllFormats() {
        List<String> formats = teamService.getAllFormats();
        return ResponseEntity.ok(formats);
    }
    @GetMapping("/test")
    public List<Team> getTestTeams() {
        return teamService.getTeamsByFormat("TEST");
    }

    @GetMapping("/odi")
    public List<Team> getOdiTeams() {
        return teamService.getTeamsByFormat("ODI");
    }

    @GetMapping("/t20")
    public List<Team> getT20Teams() {
        return teamService.getTeamsByFormat("T20");
    }
}