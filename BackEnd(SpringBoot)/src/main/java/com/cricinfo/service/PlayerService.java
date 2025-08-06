package com.cricinfo.service;

import com.cricinfo.entity.Player;
import com.cricinfo.repository.PlayerRepository;
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

    public List<Player> searchPlayersByName(String name) {
        return playerRepository.searchPlayersByName(name);
    }

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Optional<Player> updatePlayer(Long id, Player playerDetails) {
        return playerRepository.findById(id)
                .map(player -> {
                    player.setName(playerDetails.getName());
                    player.setCountry(playerDetails.getCountry());
                    player.setImageUrl(playerDetails.getImageUrl());
                    player.setRuns(playerDetails.getRuns());
                    player.setAverage(playerDetails.getAverage());
                    player.setCenturies(playerDetails.getCenturies());
                    player.setRecentForm(playerDetails.getRecentForm());
                    player.setPosition(playerDetails.getPosition());
                    player.setBattingStyle(playerDetails.getBattingStyle());
                    player.setBowlingStyle(playerDetails.getBowlingStyle());
                    player.setDateOfBirth(playerDetails.getDateOfBirth());
                    player.setDebutDate(playerDetails.getDebutDate());
                    player.setActive(playerDetails.getActive());
                    return playerRepository.save(player);
                });
    }

    public boolean deletePlayer(Long id) {
        return playerRepository.findById(id)
                .map(player -> {
                    playerRepository.delete(player);
                    return true;
                })
                .orElse(false);
    }
}
