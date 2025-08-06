package com.cricinfo.config;

import com.cricinfo.entity.*;
import com.cricinfo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private NewsArticleRepository newsRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if database is empty
        if (matchRepository.count() == 0) {
            initializeMatches();
        }
        if (newsRepository.count() == 0) {
            initializeNews();
        }
        if (playerRepository.count() == 0) {
            initializePlayers();
        }
        if (teamRepository.count() == 0) {
            initializeTeams();
        }
        if (tournamentRepository.count() == 0) {
            initializeTournaments();
        }
    }

    private void initializeMatches() {
        // Live match
        Match liveMatch = new Match();
        liveMatch.setTeam1("India");
        liveMatch.setTeam2("Australia");
        liveMatch.setTeam1Flag("🇮🇳");
        liveMatch.setTeam2Flag("🇦🇺");
        liveMatch.setTeam1Score("287/4");
        liveMatch.setTeam2Score("156/8");
        liveMatch.setTeam1Overs("45.2");
        liveMatch.setTeam2Overs("32.1");
        liveMatch.setStatus("LIVE");
        liveMatch.setVenue("Melbourne Cricket Ground");
        liveMatch.setFormat("ODI");
        liveMatch.setSeries("India tour of Australia 2024");
        liveMatch.setRunRate("6.32");
        liveMatch.setRequiredRate("8.45");
        liveMatch.setCurrentBatsmen(Arrays.asList("Virat Kohli 89*", "KL Rahul 45*"));
        liveMatch.setCurrentBowler("Pat Cummins");
        liveMatch.setStartTime(LocalDateTime.now().minusHours(3));
        matchRepository.save(liveMatch);

        // Completed match
        Match completedMatch = new Match();
        completedMatch.setTeam1("England");
        completedMatch.setTeam2("Pakistan");
        completedMatch.setTeam1Flag("🏴󠁧󠁢󠁥󠁮󠁧󠁿");
        completedMatch.setTeam2Flag("🇵🇰");
        completedMatch.setTeam1Score("178/6");
        completedMatch.setTeam2Score("145/9");
        completedMatch.setTeam1Overs("18.4");
        completedMatch.setTeam2Overs("20.0");
        completedMatch.setStatus("England won by 33 runs");
        completedMatch.setVenue("Lord's Cricket Ground");
        completedMatch.setFormat("T20I");
        completedMatch.setSeries("Pakistan tour of England 2024");
        completedMatch.setPlayerOfMatch("Jos Buttler - 67* (45 balls, 6 fours, 2 sixes)");
        completedMatch.setStartTime(LocalDateTime.now().minusDays(1));
        completedMatch.setEndTime(LocalDateTime.now().minusDays(1).plusHours(4));
        matchRepository.save(completedMatch);

        // Upcoming match
        Match upcomingMatch = new Match();
        upcomingMatch.setTeam1("Sri Lanka");
        upcomingMatch.setTeam2("Afghanistan");
        upcomingMatch.setTeam1Flag("🇱🇰");
        upcomingMatch.setTeam2Flag("🇦🇫");
        upcomingMatch.setStatus("Upcoming");
        upcomingMatch.setVenue("Colombo");
        upcomingMatch.setFormat("Test");
        upcomingMatch.setSeries("Afghanistan tour of Sri Lanka 2024");
        upcomingMatch.setStartTime(LocalDateTime.now().plusDays(2));
        matchRepository.save(upcomingMatch);
    }

    private void initializeNews() {
        NewsArticle news1 = new NewsArticle();
        news1.setTitle("Kohli's masterclass guides India to commanding position against Australia");
        news1.setSummary("The former captain's unbeaten 89 puts India in driver's seat in the third ODI at Melbourne");
        news1.setContent("In a masterful display of batting prowess, Virat Kohli once again proved why he is considered one of the greatest batsmen of all time...");
        news1.setImageUrl("/placeholder.svg?height=400&width=600&text=Kohli+Batting");
        news1.setCategory("Match Report");
        news1.setAuthor("Rahul Sharma");
        news1.setPublishedAt(LocalDateTime.now().minusHours(2));
        news1.setReadTime("4 min read");
        news1.setViews(12500);
        news1.setComments(89);
        news1.setFeatured(true);
        newsRepository.save(news1);

        NewsArticle news2 = new NewsArticle();
        news2.setTitle("ICC announces new playing conditions for T20 World Cup 2024");
        news2.setSummary("Several changes including powerplay modifications and DRS updates to be implemented");
        news2.setContent("The International Cricket Council (ICC) has announced several revolutionary changes...");
        news2.setImageUrl("/placeholder.svg?height=300&width=400&text=ICC+Announcement");
        news2.setCategory("Tournament News");
        news2.setAuthor("ICC Media Team");
        news2.setPublishedAt(LocalDateTime.now().minusHours(4));
        news2.setReadTime("3 min read");
        news2.setViews(8200);
        news2.setComments(45);
        news2.setFeatured(true);
        newsRepository.save(news2);

        NewsArticle news3 = new NewsArticle();
        news3.setTitle("Babar Azam steps down as Pakistan captain across all formats");
        news3.setSummary("The star batsman cites workload management and team's future as key factors in decision");
        news3.setContent("In a shocking turn of events, Babar Azam has announced his decision to step down...");
        news3.setImageUrl("/placeholder.svg?height=300&width=400&text=Babar+Azam");
        news3.setCategory("Breaking News");
        news3.setAuthor("Wasim Jaffer");
        news3.setPublishedAt(LocalDateTime.now().minusHours(6));
        news3.setReadTime("5 min read");
        news3.setViews(15700);
        news3.setComments(156);
        news3.setFeatured(true);
        newsRepository.save(news3);
    }

    private void initializePlayers() {
        Player player1 = new Player();
        player1.setName("Virat Kohli");
        player1.setCountry("India");
        player1.setImageUrl("/placeholder.svg?height=80&width=80&text=VK");
        player1.setRuns("12344");
        player1.setAverage("58.07");
        player1.setCenturies("43");
        player1.setRecentForm("89*, 76, 45, 112*");
        player1.setPosition("Batsman");
        player1.setBattingStyle("Right-handed");
        player1.setBowlingStyle("Right-arm medium");
        playerRepository.save(player1);

        Player player2 = new Player();
        player2.setName("Babar Azam");
        player2.setCountry("Pakistan");
        player2.setImageUrl("/placeholder.svg?height=80&width=80&text=BA");
        player2.setRuns("8567");
        player2.setAverage("56.83");
        player2.setCenturies("31");
        player2.setRecentForm("67, 34, 89, 23");
        player2.setPosition("Batsman");
        player2.setBattingStyle("Right-handed");
        player2.setBowlingStyle("Right-arm medium");
        playerRepository.save(player2);

        Player player3 = new Player();
        player3.setName("Joe Root");
        player3.setCountry("England");
        player3.setImageUrl("/placeholder.svg?height=80&width=80&text=JR");
        player3.setRuns("11234");
        player3.setAverage("49.23");
        player3.setCenturies("29");
        player3.setRecentForm("45, 78, 156, 67");
        player3.setPosition("Batsman");
        player3.setBattingStyle("Right-handed");
        player3.setBowlingStyle("Right-arm off-break");
        playerRepository.save(player3);
    }

    private void initializeTeams() {
        // Test rankings
        Team team1 = new Team();
        team1.setName("India");
        team1.setFlag("🇮🇳");
        team1.setRanking(1);
        team1.setPoints(116);
        team1.setFormat("Test");
        team1.setMatchesPlayed(45);
        team1.setMatchesWon(28);
        team1.setMatchesLost(12);
        team1.setMatchesDrawn(5);
        teamRepository.save(team1);

        Team team2 = new Team();
        team2.setName("Australia");
        team2.setFlag("🇦🇺");
        team2.setRanking(2);
        team2.setPoints(111);
        team2.setFormat("Test");
        team2.setMatchesPlayed(42);
        team2.setMatchesWon(26);
        team2.setMatchesLost(14);
        team2.setMatchesDrawn(2);
        teamRepository.save(team2);

        Team team3 = new Team();
        team3.setName("England");
        team3.setFlag("🏴󠁧󠁢󠁥󠁮󠁧󠁿");
        team3.setRanking(3);
        team3.setPoints(105);
        team3.setFormat("Test");
        team3.setMatchesPlayed(48);
        team3.setMatchesWon(24);
        team3.setMatchesLost(18);
        team3.setMatchesDrawn(6);
        teamRepository.save(team3);
    }

    private void initializeTournaments() {
        Tournament tournament1 = new Tournament();
        tournament1.setName("ICC Men's T20 World Cup 2024");
        tournament1.setStatus("Upcoming");
        tournament1.setStartDate(LocalDateTime.of(2024, 6, 1, 10, 0));
        tournament1.setEndDate(LocalDateTime.of(2024, 6, 29, 20, 0));
        tournament1.setLocation("USA & West Indies");
        tournament1.setTeams(20);
        tournament1.setDescription("The premier T20 international tournament featuring 20 teams competing for cricket's ultimate prize");
        tournament1.setPrizeMoney("$5.6 million");
        tournamentRepository.save(tournament1);

        Tournament tournament2 = new Tournament();
        tournament2.setName("Indian Premier League 2024");
        tournament2.setStatus("Live");
        tournament2.setStartDate(LocalDateTime.of(2024, 3, 22, 19, 30));
        tournament2.setEndDate(LocalDateTime.of(2024, 5, 26, 20, 0));
        tournament2.setLocation("India");
        tournament2.setTeams(10);
        tournament2.setDescription("The world's most popular T20 franchise league featuring the best players from around the globe");
        tournament2.setPrizeMoney("$15 million");
        tournamentRepository.save(tournament2);

        Tournament tournament3 = new Tournament();
        tournament3.setName("The Ashes 2025");
        tournament3.setStatus("Upcoming");
        tournament3.setStartDate(LocalDateTime.of(2025, 11, 21, 10, 30));
        tournament3.setEndDate(LocalDateTime.of(2026, 1, 7, 18, 0));
        tournament3.setLocation("Australia");
        tournament3.setTeams(2);
        tournament3.setDescription("The historic Test series between England and Australia, one of cricket's oldest and most prestigious contests");
        tournament3.setPrizeMoney("$2 million");
        tournamentRepository.save(tournament3);
    }
}
