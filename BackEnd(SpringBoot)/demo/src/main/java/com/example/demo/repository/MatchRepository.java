package  com.example.demo.repository;
import com.example.demo.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    @Query("SELECT m FROM Match m WHERE m.status = 'LIVE'")
    List<Match> findLiveMatches();


    @Query("select DISTINCT  m from Match m where m.status ='Upcoming'")
    List<Match> findUpcomingMatches();
    @Query("SELECT DISTINCT  m FROM Match m WHERE m.status NOT IN ('LIVE', 'Upcoming') ")
    List<Match> findRecentMatches();

    @Query("SELECT m FROM Match m WHERE m.team1 = ?1 OR m.team2 = ?1 ")
    List<Match> findMatchesByTeam(String team);

    @Query("select m from Match m where m.series =?1 ")
    List<Match> findMatchBySeries(String series);
    @Query("SELECT m FROM Match m WHERE m.format = ?1 ")
    List<Match> findMatchesByFormat(String format);
}