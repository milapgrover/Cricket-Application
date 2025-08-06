package com.cricinfo.repository;

import com.cricinfo.entity.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Long> {

    @Query("SELECT n FROM NewsArticle n WHERE n.featured = true ORDER BY n.publishedAt DESC")
    List<NewsArticle> findFeaturedNews();

    @Query("SELECT n FROM NewsArticle n ORDER BY n.publishedAt DESC")
    List<NewsArticle> findAllOrderByPublishedAtDesc();

    @Query("SELECT n FROM NewsArticle n WHERE n.category = ?1 ORDER BY n.publishedAt DESC")
    List<NewsArticle> findByCategory(String category);

    @Query("SELECT n FROM NewsArticle n WHERE n.author = ?1 ORDER BY n.publishedAt DESC")
    List<NewsArticle> findByAuthor(String author);

    @Query("SELECT n FROM NewsArticle n WHERE LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(n.summary) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(n.content) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "ORDER BY n.publishedAt DESC")
    List<NewsArticle> searchNews(@Param("query") String query);

    @Query("SELECT DISTINCT n.category FROM NewsArticle n ORDER BY n.category")
    List<String> findAllCategories();

    @Query("SELECT DISTINCT n.author FROM NewsArticle n ORDER BY n.author")
    List<String> findAllAuthors();
}
