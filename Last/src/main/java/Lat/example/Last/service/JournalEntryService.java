package Lat.example.Last.service;

import Lat.example.Last.entity.JournalEntry;
import Lat.example.Last.entity.User;
import Lat.example.Last.repository.JournalEntryRepository;
import Lat.example.Last.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JournalEntryService {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void saveEntry(JournalEntry entry, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found: " + username);
        }
        entry.setUser(user);
        journalEntryRepository.save(entry);
    }


    public Optional<JournalEntry> findByIdAndUser(Long id, String username) {
        return journalEntryRepository.findByIdAndUser_Username(id, username);
    }

    public List<JournalEntry> getAllEntriesByUsername(String username) {
        return journalEntryRepository.findByUser_Username(username);
    }

    public boolean deleteById(Long id, String username) {
        Optional<JournalEntry> entry = findByIdAndUser(id, username);
        if (entry.isPresent()) {
            journalEntryRepository.delete(entry.get());
            return true;
        }
        return false;
    }
}
