package com.example.demo.service;
import com.example.demo.entity.Team;
import com.example.demo.repository.TeamRepository;
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
}