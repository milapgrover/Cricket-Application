/*
package Lat.example.Last.service;

import Lat.example.Last.entity.User;
import Lat.example.Last.repository.UserRepository;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ArgumentsSource;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class UserServiceTests {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private  UserService userService;
    @ParameterizedTest
    @CsvSource({
            "milap",
            "ravi"
    })

    @ArgumentsSource(UserArgumentProvider.class)
    public void testFindByUserName(User user)
    {
        assertTrue(userService.saveNewUser(user));
    }
}
*/
