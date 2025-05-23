package Lat.example.Last.repository;

import Lat.example.Last.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find a user by their unique username
    User findByUsername(String username);
    void deleteByUsername(String username);
}
