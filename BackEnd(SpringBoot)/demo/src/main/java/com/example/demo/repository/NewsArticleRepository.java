package com.example.demo.repository;
import com.example.demo.entity.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle , Long>{
    @Query("select n from NewsArticle n where n.featured = true")
    List<NewsArticle> findFeaturedNews();
    @Query("select n from NewsArticle n order by n.publishedAt desc")
    List<NewsArticle> findAllOrderByPublishedAtDesc();
    @Query("SELECT n FROM NewsArticle n WHERE n.category = ?1")
    List<NewsArticle> findByCategory(String category);
    @Query("select n from NewsArticle n where n.author = ?1")
    List<NewsArticle>findByAuthor(String author);
    @Query("select distinct  n.category from NewsArticle n")
    List<String> findAllCategories();
    @Query("select distinct  n.author from NewsArticle n")
    List<String> findAllAuthors();

}