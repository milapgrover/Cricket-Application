package com.cricinfo.service;

import com.cricinfo.entity.Tournament;
import com.cricinfo.repository.TournamentRepository;
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

    public Tournament createTournament(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    public Optional<Tournament> updateTournament(Long id, Tournament tournamentDetails) {
        return tournamentRepository.findById(id)
                .map(tournament -> {
                    tournament.setName(tournamentDetails.getName());
                    tournament.setStatus(tournamentDetails.getStatus());
                    tournament.setStartDate(tournamentDetails.getStartDate());
                    tournament.setEndDate(tournamentDetails.getEndDate());
                    tournament.setLocation(tournamentDetails.getLocation());
                    tournament.setTeams(tournamentDetails.getTeams());
                    tournament.setDescription(tournamentDetails.getDescription());
                    tournament.setPrizeMoney(tournamentDetails.getPrizeMoney());
                    return tournamentRepository.save(tournament);
                });
    }

    public boolean deleteTournament(Long id) {
        return tournamentRepository.findById(id)
                .map(tournament -> {
                    tournamentRepository.delete(tournament);
                    return true;
                })
                .orElse(false);
    }
}
