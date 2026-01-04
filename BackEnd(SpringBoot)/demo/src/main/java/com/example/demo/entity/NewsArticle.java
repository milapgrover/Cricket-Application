package com.example.demo.entity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

@Entity
@Table(name = "news_articles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class NewsArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(nullable = false, length = 500)
    private String summary;

    @Column(name = "image_url")
    private String imageUrl;
    @Column(columnDefinition = "TEXT")
    private String content;
    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String author;

    @Column(name = "published_at", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime publishedAt;

    @Column(name = "read_time")
    private String readTime;

    @Column(nullable = false ,columnDefinition = "int default 0")
    private Integer views = 0;

    @Column(nullable = false,columnDefinition = "int default 0")
    private Integer comments = 0;

    @Column(nullable = false,columnDefinition = "int default 0")
    private Boolean featured = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
