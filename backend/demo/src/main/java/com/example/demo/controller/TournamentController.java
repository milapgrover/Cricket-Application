package com.example.demo.controller;
import com.example.demo.entity.Tournament;
import com.example.demo.service.TournamentService;
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

    @GetMapping
    public ResponseEntity<List<Tournament>> getAllTournaments() {
        List<Tournament> tournaments = tournamentService.getAllTournaments();
        return ResponseEntity.ok(tournaments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tournament> getTournamentById(@PathVariable Long id) {
        Optional<Tournament> tournament = tournamentService.getTournamentById(id);
        return tournament.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/live")
    public ResponseEntity<List<Tournament>> getLiveTournaments() {
        List<Tournament> tournaments = tournamentService.getLiveTournaments();
        return ResponseEntity.ok(tournaments);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<Tournament>> getUpcomingTournaments() {
        List<Tournament> tournaments = tournamentService.getUpcomingTournaments();
        return ResponseEntity.ok(tournaments);
    }

    @GetMapping("/completed")
    public ResponseEntity<List<Tournament>> getCompletedTournaments() {
        List<Tournament> tournaments = tournamentService.getCompletedTournaments();
        return ResponseEntity.ok(tournaments);
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Tournament>> getTournamentsByLocation(@PathVariable String location) {
        List<Tournament> tournaments = tournamentService.getTournamentsByLocation(location);
        return ResponseEntity.ok(tournaments);
    }

}