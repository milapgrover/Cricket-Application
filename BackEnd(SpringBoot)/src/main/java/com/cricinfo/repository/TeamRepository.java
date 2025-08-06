package com.cricinfo.repository;

import com.cricinfo.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    @Query("SELECT t FROM Team t WHERE t.format = ?1 ORDER BY t.ranking ASC")
    List<Team> findByFormatOrderByRanking(String format);

    @Query("SELECT t FROM Team t ORDER BY t.points DESC")
    List<Team> findAllOrderByPointsDesc();

    @Query("SELECT t FROM Team t WHERE t.name = ?1")
    Team findByName(String name);

    @Query("SELECT DISTINCT t.format FROM Team t ORDER BY t.format")
    List<String> findAllFormats();
}
