package Lat.example.Last.controller;

import Lat.example.Last.entity.JournalEntry;
import Lat.example.Last.entity.User;
import Lat.example.Last.service.JournalEntryService;
import Lat.example.Last.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/journal")
@Tag(name = "Journal APIs")
public class JournalEntryController {

    @Autowired
    private JournalEntryService journalEntryService;

    @Autowired
    private UserService userService;

    @GetMapping
    @Operation(summary = "Get all journal entries of the logged-in user")
    public ResponseEntity<?> getAllJournalEntriesOfUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUserName(username);

        if (user != null && user.getJournalEntries() != null && !user.getJournalEntries().isEmpty()) {
            return ResponseEntity.ok(user.getJournalEntries());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No journal entries found.");
    }

    @PostMapping
    @Operation(summary = "Create a new journal entry for the logged-in user")
    public ResponseEntity<?> createEntry(@RequestBody JournalEntry myEntry) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            journalEntryService.saveEntry(myEntry, username);
            return ResponseEntity.status(HttpStatus.CREATED).body(myEntry);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/id/{myId}")
    @Operation(summary = "Get a specific journal entry by ID")
    public ResponseEntity<?> getJournalEntryById(@PathVariable Long myId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<JournalEntry> entry = journalEntryService.findByIdAndUser(myId, username);

        if (entry.isPresent()) {
            return ResponseEntity.ok(entry.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Journal entry not found.");
        }
    }

    @DeleteMapping("/id/{myId}")
    @Operation(summary = "Delete a journal entry by ID")
    public ResponseEntity<?> deleteJournalEntryById(@PathVariable Long myId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        boolean removed = journalEntryService.deleteById(myId, username);

        if (removed) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to delete journal entry.");
    }

    @PutMapping("/id/{myId}")
    @Operation(summary = "Update a journal entry by ID")
    public ResponseEntity<?> updateJournalById(@PathVariable Long myId, @RequestBody JournalEntry newEntry) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<JournalEntry> entryOpt = journalEntryService.findByIdAndUser(myId, username);

        if (entryOpt.isPresent()) {
            JournalEntry existing = entryOpt.get();

            if (newEntry.getTitle() != null && !newEntry.getTitle().isBlank()) {
                existing.setTitle(newEntry.getTitle());
            }
            if (newEntry.getContent() != null && !newEntry.getContent().isBlank()) {
                existing.setContent(newEntry.getContent());
            }

            journalEntryService.saveEntry(existing, username);
            return ResponseEntity.ok(existing);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Entry to update not found.");
    }
}
