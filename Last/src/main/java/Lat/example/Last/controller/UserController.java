package Lat.example.Last.controller;

import Lat.example.Last.entity.User;
import Lat.example.Last.repository.UserRepository;
import Lat.example.Last.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Get details of the currently logged-in user
    @GetMapping("/me")
    public ResponseEntity<?> getLoggedInUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUserName(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

    // ✅ Update logged-in user's username and password
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User updatedUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        User existingUser = userService.findByUserName(currentUsername);
        if (existingUser == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        // Update fields — encrypt the password
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        existingUser.setFullName(updatedUser.getFullName());

        userService.saveUser(existingUser);
        return ResponseEntity.ok(existingUser);
    }

    // ✅ Fetch any user by username
    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUserName(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

    // ✅ Delete current logged-in user
    @DeleteMapping
    public ResponseEntity<?> deleteUserById() {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        userRepository.deleteByUsername(currentUsername);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // ✅ List all users in the system
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
