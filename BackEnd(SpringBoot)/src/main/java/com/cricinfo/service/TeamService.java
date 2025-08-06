package com.cricinfo.service;

import com.cricinfo.entity.Team;
import com.cricinfo.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Optional<Team> getTeamById(Long id) {
        return teamRepository.findById(id);
    }

    public List<Team> getTeamsByFormat(String format) {
        return teamRepository.findByFormatOrderByRanking(format);
    }

    public Team getTeamByName(String name) {
        return teamRepository.findByName(name);
    }

    public List<String> getAllFormats() {
        return teamRepository.findAllFormats();
    }

    public Team createTeam(Team team) {
        return teamRepository.save(team);
    }

    public Optional<Team> updateTeam(Long id, Team teamDetails) {
        return teamRepository.findById(id)
                .map(team -> {
                    team.setName(teamDetails.getName());
                    team.setFlag(teamDetails.getFlag());
                    team.setRanking(teamDetails.getRanking());
                    team.setPoints(teamDetails.getPoints());
                    team.setFormat(teamDetails.getFormat());
                    team.setMatchesPlayed(teamDetails.getMatchesPlayed());
                    team.setMatchesWon(teamDetails.getMatchesWon());
                    team.setMatchesLost(teamDetails.getMatchesLost());
                    team.setMatchesDrawn(teamDetails.getMatchesDrawn());
                    return teamRepository.save(team);
                });
    }

    public boolean deleteTeam(Long id) {
        return teamRepository.findById(id)
                .map(team -> {
                    teamRepository.delete(team);
                    return true;
                })
                .orElse(false);
    }
}
