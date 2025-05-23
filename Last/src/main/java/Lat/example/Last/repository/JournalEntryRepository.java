package Lat.example.Last.repository;
import Lat.example.Last.entity.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
    Optional<JournalEntry> findByIdAndUser_Username(Long id, String username);
    List<JournalEntry> findByUser_Username(String username);
}

