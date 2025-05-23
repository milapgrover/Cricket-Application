package Lat.example.Last.controller;

import Lat.example.Last.entity.User;
import Lat.example.Last.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/public")
public class PublicController {
    @Autowired
    private UserService userService;
    @PostMapping("/create-user")
    public ResponseEntity<String> createUser(@Valid @RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.ok("User created successfully");
    }
    @GetMapping("/health-check")

    public ResponseEntity<Map<String, String>> status() {
        return ResponseEntity.ok(Map.of("message", "OK"));
    }


}