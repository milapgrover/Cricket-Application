package com.example.demo.repository;
import com.example.demo.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Query("SELECT p FROM Player p WHERE p.active = true ")
    List<Player> findTopPlayersByRuns();

    @Query("SELECT p FROM Player p WHERE p.active = true")
    List<Player> findTopPlayersByAverage();

    @Query("SELECT p FROM Player p WHERE p.active = true ")
    List<Player> findTopPlayersByCenturies();

    @Query("SELECT p FROM Player p WHERE p.country = ?1 AND p.active = true ")
    List<Player> findPlayersByCountry(String country);

    @Query("SELECT p FROM Player p WHERE p.position = ?1 AND p.active = true ")
    List<Player> findPlayersByPosition(String position);

    @Query("SELECT p FROM Player p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', ?1, '%')) ")
    List<Player> searchPlayersByName(String name);

    @Query("SELECT p FROM Player p WHERE p.active = true")
    List<Player> findSpotlightPlayers();
}