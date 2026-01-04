package com.example.demo.controller;
import com.example.demo.service.NewsService;
import com.example.demo.entity.NewsArticle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class NewsController {
    @Autowired
    private NewsService newsService;

    @GetMapping
    public ResponseEntity<List<NewsArticle>> getAllNews()
    {
        List<NewsArticle> news = newsService.getAllNews();
        return ResponseEntity.ok(news);
    }
    @GetMapping("/{id}")
    public ResponseEntity<NewsArticle> getNewsById(@PathVariable Long id)
    {
        Optional<NewsArticle> news = newsService.getNewsById(id);
        return news.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/featured")
    public ResponseEntity<List<NewsArticle>> getFeaturedNews() {
        List<NewsArticle> featuredNews = newsService.getFeaturedNews();
        return ResponseEntity.ok(featuredNews);
    }
    @GetMapping("/category/{category}")
    public ResponseEntity<List<NewsArticle>> getNewsByCategory(@PathVariable String category) {
        List<NewsArticle> news = newsService.getNewsByCategory(category);
        return ResponseEntity.ok(news);
    }

    @GetMapping("/author/{author}")
    public ResponseEntity<List<NewsArticle>> getNewsByAuthor(@PathVariable String author) {
        List<NewsArticle> news = newsService.getNewsByAuthor(author);
        return ResponseEntity.ok(news);
    }
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = newsService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/authors")
    public ResponseEntity<List<String>> getAllAuthors() {
        List<String> authors = newsService.getAllAuthors();
        return ResponseEntity.ok(authors);
    }
}