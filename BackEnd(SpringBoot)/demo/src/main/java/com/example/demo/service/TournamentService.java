package com.example.demo.service;

import com.example.demo.entity.Tournament;
import com.example.demo.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;

    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAllOrderByStartDateDesc();
    }

    public Optional<Tournament> getTournamentById(Long id) {
        return tournamentRepository.findById(id);
    }

    public List<Tournament> getLiveTournaments() {
        return tournamentRepository.findLiveTournaments();
    }

    public List<Tournament> getUpcomingTournaments() {
        return tournamentRepository.findUpcomingTournaments();
    }

    public List<Tournament> getCompletedTournaments() {
        return tournamentRepository.findCompletedTournaments();
    }

    public List<Tournament> getTournamentsByLocation(String location) {
        return tournamentRepository.findTournamentsByLocation(location);
    }

    public List<Tournament> getTournamentsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return tournamentRepository.findTournamentsByDateRange(startDate, endDate);
    }
}