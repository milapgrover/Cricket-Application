package com.cricinfo.controller;

import com.cricinfo.entity.Tournament;
import com.cricinfo.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tournaments")
@CrossOrigin(origins = "*")
public class TournamentController {

    @Autowired
    private TournamentService tournamentService;
// tick
    @GetMapping
    public ResponseEntity<List<Tournament>> getAllTournaments() {
        List<Tournament> tournaments = tournamentService.getAllTournaments();
        return ResponseEntity.ok(tournaments);
    }
// tick
    @GetMapping("/{id}")
    public ResponseEntity<Tournament> getTournamentById(@PathVariable Long id) {
        Optional<Tournament> tournament = tournamentService.getTournamentById(id);
        return tournament.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // tick
    @GetMapping("/live")
    public ResponseEntity<List<Tournament>> getLiveTournaments() {
        List<Tournament> tournaments = tournamentService.getLiveTournaments();
        return ResponseEntity.ok(tournaments);
    }
// tick
    @GetMapping("/upcoming")
    public ResponseEntity<List<Tournament>> getUpcomingTournaments() {
        List<Tournament> tournaments = tournamentService.getUpcomingTournaments();
        return ResponseEntity.ok(tournaments);
    }
    // tick
    @GetMapping("/completed")
    public ResponseEntity<List<Tournament>> getCompletedTournaments() {
        List<Tournament> tournaments = tournamentService.getCompletedTournaments();
        return ResponseEntity.ok(tournaments);
    }
// tick
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Tournament>> getTournamentsByLocation(@PathVariable String location) {
        List<Tournament> tournaments = tournamentService.getTournamentsByLocation(location);
        return ResponseEntity.ok(tournaments);
    }
// tick
    @PostMapping
    public ResponseEntity<Tournament> createTournament(@RequestBody Tournament tournament) {
        Tournament createdTournament = tournamentService.createTournament(tournament);
        return ResponseEntity.ok(createdTournament);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tournament> updateTournament(@PathVariable Long id, @RequestBody Tournament tournament) {
        Optional<Tournament> updatedTournament = tournamentService.updateTournament(id, tournament);
        return updatedTournament.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTournament(@PathVariable Long id) {
        boolean deleted = tournamentService.deleteTournament(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
