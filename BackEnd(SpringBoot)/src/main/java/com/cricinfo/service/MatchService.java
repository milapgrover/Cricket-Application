package com.cricinfo.service;

import com.cricinfo.entity.Match;
import com.cricinfo.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }

    public List<Match> getLiveMatches() {
        return matchRepository.findLiveMatches();
    }

    public List<Match> getRecentMatches() {
        return matchRepository.findRecentMatches();
    }

    public List<Match> getUpcomingMatches() {
        return matchRepository.findUpcomingMatches();
    }

    public List<Match> getMatchesByTeam(String team) {
        return matchRepository.findMatchesByTeam(team);
    }

    public List<Match> getMatchesBySeries(String series) {
        return matchRepository.findMatchesBySeries(series);
    }

    public List<Match> getMatchesByFormat(String format) {
        return matchRepository.findMatchesByFormat(format);
    }

    public List<Match> getMatchesByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return matchRepository.findMatchesByDateRange(startDate, endDate);
    }

    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    public Optional<Match> updateMatch(Long id, Match matchDetails) {
        return matchRepository.findById(id)
                .map(match -> {
                    match.setTeam1(matchDetails.getTeam1());
                    match.setTeam2(matchDetails.getTeam2());
                    match.setTeam1Flag(matchDetails.getTeam1Flag());
                    match.setTeam2Flag(matchDetails.getTeam2Flag());
                    match.setTeam1Score(matchDetails.getTeam1Score());
                    match.setTeam2Score(matchDetails.getTeam2Score());
                    match.setTeam1Overs(matchDetails.getTeam1Overs());
                    match.setTeam2Overs(matchDetails.getTeam2Overs());
                    match.setStatus(matchDetails.getStatus());
                    match.setVenue(matchDetails.getVenue());
                    match.setFormat(matchDetails.getFormat());
                    match.setSeries(matchDetails.getSeries());
                    match.setRunRate(matchDetails.getRunRate());
                    match.setRequiredRate(matchDetails.getRequiredRate());
                    match.setCurrentBatsmen(matchDetails.getCurrentBatsmen());
                    match.setCurrentBowler(matchDetails.getCurrentBowler());
                    match.setMatchType(matchDetails.getMatchType());
                    match.setPlayerOfMatch(matchDetails.getPlayerOfMatch());
                    match.setStartTime(matchDetails.getStartTime());
                    match.setEndTime(matchDetails.getEndTime());
                    return matchRepository.save(match);
                });
    }

    public boolean deleteMatch(Long id) {
        return matchRepository.findById(id)
                .map(match -> {
                    matchRepository.delete(match);
                    return true;
                })
                .orElse(false);
    }
}
