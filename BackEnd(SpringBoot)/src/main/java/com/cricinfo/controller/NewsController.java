package com.cricinfo.controller;

import com.cricinfo.entity.NewsArticle;
import com.cricinfo.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
// tick
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    public ResponseEntity<List<NewsArticle>> getAllNews() {
        List<NewsArticle> news = newsService.getAllNews();
        return ResponseEntity.ok(news);
    }
// tick
    @GetMapping("/{id}")
    public ResponseEntity<NewsArticle> getNewsById(@PathVariable Long id) {
        Optional<NewsArticle> news = newsService.getNewsById(id);
        return news.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
// tick
    @GetMapping("/featured")
    public ResponseEntity<List<NewsArticle>> getFeaturedNews() {
        List<NewsArticle> featuredNews = newsService.getFeaturedNews();
        return ResponseEntity.ok(featuredNews);
    }
    // tick
    @GetMapping("/category/{category}")
    public ResponseEntity<List<NewsArticle>> getNewsByCategory(@PathVariable String category) {
        List<NewsArticle> news = newsService.getNewsByCategory(category);
        return ResponseEntity.ok(news);
    }
// tick
    @GetMapping("/author/{author}")
    public ResponseEntity<List<NewsArticle>> getNewsByAuthor(@PathVariable String author) {
        List<NewsArticle> news = newsService.getNewsByAuthor(author);
        return ResponseEntity.ok(news);
    }
// Error
    @GetMapping("/search")
    public ResponseEntity<List<NewsArticle>> searchNews(@RequestParam String q) {
        List<NewsArticle> news = newsService.searchNews(q);
        return ResponseEntity.ok(news);
    }
// tick
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = newsService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
// tick
    @GetMapping("/authors")
    public ResponseEntity<List<String>> getAllAuthors() {
        List<String> authors = newsService.getAllAuthors();
        return ResponseEntity.ok(authors);
    }
// tick
    @PostMapping
    public ResponseEntity<NewsArticle> createNews(@RequestBody NewsArticle newsArticle) {
        NewsArticle createdNews = newsService.createNews(newsArticle);
        return ResponseEntity.ok(createdNews);
    }
//tick
    @PutMapping("/{id}")
    public ResponseEntity<NewsArticle> updateNews(@PathVariable Long id, @RequestBody NewsArticle newsArticle) {
        Optional<NewsArticle> updatedNews = newsService.updateNews(id, newsArticle);
        return updatedNews.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
// tick
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        boolean deleted = newsService.deleteNews(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
// tick
    @PutMapping("/{id}/views")
    public ResponseEntity<NewsArticle> incrementViews(@PathVariable Long id) {
        Optional<NewsArticle> updatedNews = newsService.incrementViews(id);
        return updatedNews.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
