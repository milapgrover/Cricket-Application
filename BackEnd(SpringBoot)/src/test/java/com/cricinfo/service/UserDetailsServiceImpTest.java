/*
package Lat.example.Last.service;

import Lat.example.Last.entity.User;
import Lat.example.Last.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.assertEquals;
import  static  org.mockito.Mockito.*;
@SpringBootTest
public class UserDetailsServiceImpTest {

    @InjectMocks
    private UserDetailsServiceImp userDetailsService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp()
    {
        MockitoAnnotations.initMocks(this);
    }
    @Test
    void loadUserByUsername() {
        when(userRepository.findByUsername("milap")).thenReturn(User.builder().username("milap").password("encrypted-password").build());

        UserDetails userDetails = userDetailsService.loadUserByUsername("milap");

        assertEquals("milap", userDetails.getUsername());
    }
}
*/
