package com.cricinfo.controller;

import com.cricinfo.entity.Player;
import com.cricinfo.service.PlayerService;
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
    // tick
    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }
// tick
    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable Long id) {
        Optional<Player> player = playerService.getPlayerById(id);
        return player.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
// tick
    @GetMapping("/spotlight")
    public ResponseEntity<List<Player>> getSpotlightPlayers() {
        List<Player> players = playerService.getSpotlightPlayers();
        return ResponseEntity.ok(players);
    }
// tick
    @GetMapping("/top/runs")
    public ResponseEntity<List<Player>> getTopPlayersByRuns() {
        List<Player> players = playerService.getTopPlayersByRuns();
        return ResponseEntity.ok(players);
    }
// tick
    @GetMapping("/top/average")
    public ResponseEntity<List<Player>> getTopPlayersByAverage() {
        List<Player> players = playerService.getTopPlayersByAverage();
        return ResponseEntity.ok(players);
    }
// tick
    @GetMapping("/top/centuries")
    public ResponseEntity<List<Player>> getTopPlayersByCenturies() {
        List<Player> players = playerService.getTopPlayersByCenturies();
        return ResponseEntity.ok(players);
    }
// tick
    @GetMapping("/country/{country}")
    public ResponseEntity<List<Player>> getPlayersByCountry(@PathVariable String country) {
        List<Player> players = playerService.getPlayersByCountry(country);
        return ResponseEntity.ok(players);
    }
// Can work
    @GetMapping("/position/{position}")
    public ResponseEntity<List<Player>> getPlayersByPosition(@PathVariable String position) {
        List<Player> players = playerService.getPlayersByPosition(position);
        return ResponseEntity.ok(players);
    }
// Error
    @GetMapping("/search")
    public ResponseEntity<List<Player>> searchPlayers(@RequestParam String name) {
        List<Player> players = playerService.searchPlayersByName(name);
        return ResponseEntity.ok(players);
    }
// tick
    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        Player createdPlayer = playerService.createPlayer(player);
        return ResponseEntity.ok(createdPlayer);
    }
// tick
    @PutMapping("/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Long id, @RequestBody Player player) {
        Optional<Player> updatedPlayer = playerService.updatePlayer(id, player);
        return updatedPlayer.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
// tick
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {
        boolean deleted = playerService.deletePlayer(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
