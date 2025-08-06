package com.cricinfo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "matches")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "team1_name", nullable = false)
    private String team1;

    @Column(name = "team2_name", nullable = false)
    private String team2;

    @Column(name = "team1_flag")
    private String team1Flag;

    @Column(name = "team2_flag")
    private String team2Flag;

    @Column(name = "team1_score")
    private String team1Score;

    @Column(name = "team2_score")
    private String team2Score;

    @Column(name = "team1_overs")
    private String team1Overs;

    @Column(name = "team2_overs")
    private String team2Overs;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String venue;

    @Column(nullable = false)
    private String format;

    @Column(nullable = false)
    private String series;

    @Column(name = "run_rate")
    private String runRate;

    @Column(name = "required_rate")
    private String requiredRate;

    @ElementCollection
    @CollectionTable(name = "match_current_batsmen", joinColumns = @JoinColumn(name = "match_id"))
    @Column(name = "batsman")
    private List<String> currentBatsmen;

    @Column(name = "current_bowler")
    private String currentBowler;

    @Column(name = "match_type")
    private String matchType;

    @Column(name = "player_of_match")
    private String playerOfMatch;

    @Column(name = "match_date_time", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime matchDateTime;

    @Column(name = "start_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;

    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
