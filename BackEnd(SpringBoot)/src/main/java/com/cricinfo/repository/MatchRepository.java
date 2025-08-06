package com.cricinfo.repository;

import com.cricinfo.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query("SELECT m FROM Match m WHERE m.status = 'LIVE' ORDER BY m.startTime DESC")
    List<Match> findLiveMatches();

    @Query("SELECT m FROM Match m WHERE m.status NOT IN ('LIVE', 'Upcoming') ORDER BY m.startTime DESC")
    List<Match> findRecentMatches();

    @Query("SELECT m FROM Match m WHERE m.status = 'Upcoming' ORDER BY m.startTime ASC")
    List<Match> findUpcomingMatches();

    @Query("SELECT m FROM Match m WHERE m.startTime BETWEEN ?1 AND ?2 ORDER BY m.startTime ASC")
    List<Match> findMatchesByDateRange(LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT m FROM Match m WHERE m.team1 = ?1 OR m.team2 = ?1 ORDER BY m.startTime DESC")
    List<Match> findMatchesByTeam(String team);

    @Query("SELECT m FROM Match m WHERE m.series = ?1 ORDER BY m.startTime ASC")
    List<Match> findMatchesBySeries(String series);

    @Query("SELECT m FROM Match m WHERE m.format = ?1 ORDER BY m.startTime DESC")
    List<Match> findMatchesByFormat(String format);
}
