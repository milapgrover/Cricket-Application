package com.cricinfo.controller;

import com.cricinfo.entity.Team;
import com.cricinfo.service.TeamService;
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
// tick
    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.getAllTeams();
        return ResponseEntity.ok(teams);
    }
// tick
    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
        Optional<Team> team = teamService.getTeamById(id);
        return team.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // dont have any data but not giving any error
    @GetMapping("/rankings")
    public ResponseEntity<List<Team>> getTeamRankings(@RequestParam(defaultValue = "Test") String format) {
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
// tick
    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        Team createdTeam = teamService.createTeam(team);
        return ResponseEntity.ok(createdTeam);
    }
// tick
    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Long id, @RequestBody Team team) {
        Optional<Team> updatedTeam = teamService.updateTeam(id, team);
        return updatedTeam.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
// tick
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        boolean deleted = teamService.deleteTeam(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
