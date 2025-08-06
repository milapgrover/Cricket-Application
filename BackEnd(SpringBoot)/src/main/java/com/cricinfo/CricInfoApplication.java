package com.cricinfo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CricInfoApplication {
    public static void main(String[] args) {
        SpringApplication.run(CricInfoApplication.class, args);
    }
}
