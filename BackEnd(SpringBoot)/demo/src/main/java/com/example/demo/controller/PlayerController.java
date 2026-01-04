package com.example.demo.controller;
import com.example.demo.entity.Player;
import com.example.demo.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "*")
public class PlayerController {
    @Autowired
    private PlayerService playerService;

    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable Long id) {
        Optional<Player> player = playerService.getPlayerById(id);
        return player.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/spotlight")
    public ResponseEntity<List<Player>> getSpotlightPlayers() {
        List<Player> players = playerService.getSpotlightPlayers();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/top/runs")
    public ResponseEntity<List<Player>> getTopPlayersByRuns() {
        List<Player> players = playerService.getTopPlayersByRuns();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/top/average")
    public ResponseEntity<List<Player>> getTopPlayersByAverage() {
        List<Player> players = playerService.getTopPlayersByAverage();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/top/centuries")
    public ResponseEntity<List<Player>> getTopPlayersByCenturies() {
        List<Player> players = playerService.getTopPlayersByCenturies();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/country/{country}")
    public ResponseEntity<List<Player>> getPlayersByCountry(@PathVariable String country) {
        List<Player> players = playerService.getPlayersByCountry(country);
        return ResponseEntity.ok(players);
    }

    @GetMapping("/position/{position}")
    public ResponseEntity<List<Player>> getPlayersByPosition(@PathVariable String position) {
        List<Player> players = playerService.getPlayersByPosition(position);
        return ResponseEntity.ok(players);
    }



}