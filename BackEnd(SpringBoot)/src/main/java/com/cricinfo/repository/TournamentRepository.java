package com.cricinfo.repository;

import com.cricinfo.entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {

    @Query("SELECT t FROM Tournament t WHERE t.status = 'Live' ORDER BY t.startDate DESC")
    List<Tournament> findLiveTournaments();

    @Query("SELECT t FROM Tournament t WHERE t.status = 'Upcoming' ORDER BY t.startDate ASC")
    List<Tournament> findUpcomingTournaments();

    @Query("SELECT t FROM Tournament t WHERE t.status = 'Completed' ORDER BY t.endDate DESC")
    List<Tournament> findCompletedTournaments();

    @Query("SELECT t FROM Tournament t WHERE t.startDate BETWEEN ?1 AND ?2 ORDER BY t.startDate ASC")
    List<Tournament> findTournamentsByDateRange(LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT t FROM Tournament t WHERE LOWER(t.location) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Tournament> findTournamentsByLocation(String location);

    @Query("SELECT t FROM Tournament t ORDER BY t.startDate DESC")
    List<Tournament> findAllOrderByStartDateDesc();
}
