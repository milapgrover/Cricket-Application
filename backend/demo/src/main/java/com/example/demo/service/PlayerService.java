package com.example.demo.service;
import com.example.demo.entity.Player;
import com.example.demo.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Optional<Player> getPlayerById(Long id) {
        return playerRepository.findById(id);
    }

    public List<Player> getSpotlightPlayers() {
        return playerRepository.findSpotlightPlayers();
    }

    public List<Player> getTopPlayersByRuns() {
        return playerRepository.findTopPlayersByRuns();
    }

    public List<Player> getTopPlayersByAverage() {
        return playerRepository.findTopPlayersByAverage();
    }

    public List<Player> getTopPlayersByCenturies() {
        return playerRepository.findTopPlayersByCenturies();
    }

    public List<Player> getPlayersByCountry(String country) {
        return playerRepository.findPlayersByCountry(country);
    }

    public List<Player> getPlayersByPosition(String position) {
        return playerRepository.findPlayersByPosition(position);
    }
}