package com.cricinfo.service;

import com.cricinfo.entity.NewsArticle;
import com.cricinfo.repository.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsService {

    @Autowired
    private NewsArticleRepository newsArticleRepository;

    public List<NewsArticle> getAllNews() {
        return newsArticleRepository.findAllOrderByPublishedAtDesc();
    }

    public Optional<NewsArticle> getNewsById(Long id) {
        return newsArticleRepository.findById(id);
    }

    public List<NewsArticle> getFeaturedNews() {
        return newsArticleRepository.findFeaturedNews();
    }

    public List<NewsArticle> getNewsByCategory(String category) {
        return newsArticleRepository.findByCategory(category);
    }

    public List<NewsArticle> getNewsByAuthor(String author) {
        return newsArticleRepository.findByAuthor(author);
    }

    public List<NewsArticle> searchNews(String query) {
        return newsArticleRepository.searchNews(query);
    }

    public List<String> getAllCategories() {
        return newsArticleRepository.findAllCategories();
    }

    public List<String> getAllAuthors() {
        return newsArticleRepository.findAllAuthors();
    }

    public NewsArticle createNews(NewsArticle newsArticle) {
        return newsArticleRepository.save(newsArticle);
    }

    public Optional<NewsArticle> updateNews(Long id, NewsArticle newsDetails) {
        return newsArticleRepository.findById(id)
                .map(news -> {
                    news.setTitle(newsDetails.getTitle());
                    news.setSummary(newsDetails.getSummary());
                    news.setContent(newsDetails.getContent());
                    news.setImageUrl(newsDetails.getImageUrl());
                    news.setCategory(newsDetails.getCategory());
                    news.setAuthor(newsDetails.getAuthor());
                    news.setPublishedAt(newsDetails.getPublishedAt());
                    news.setReadTime(newsDetails.getReadTime());
                    news.setViews(newsDetails.getViews());
                    news.setComments(newsDetails.getComments());
                    news.setFeatured(newsDetails.getFeatured());
                    return newsArticleRepository.save(news);
                });
    }

    public Optional<NewsArticle> incrementViews(Long id) {
        return newsArticleRepository.findById(id)
                .map(news -> {
                    news.setViews(news.getViews() + 1);
                    return newsArticleRepository.save(news);
                });
    }

    public boolean deleteNews(Long id) {
        return newsArticleRepository.findById(id)
                .map(news -> {
                    newsArticleRepository.delete(news);
                    return true;
                })
                .orElse(false);
    }
}
