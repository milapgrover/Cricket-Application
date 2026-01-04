package  com.example.demo.service;
import com.example.demo.entity.NewsArticle;
import com.example.demo.repository.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NewsService {
    @Autowired
    private NewsArticleRepository newsArticleRepository;

    public List<NewsArticle> getAllNews(){return newsArticleRepository.findAllOrderByPublishedAtDesc();}
    public Optional<NewsArticle> getNewsById(Long id){return newsArticleRepository.findById(id);}
    public List<NewsArticle> getFeaturedNews() {
        return newsArticleRepository.findFeaturedNews();
    }

    public List<NewsArticle> getNewsByCategory(String category){return newsArticleRepository.findByCategory(category);}
    public List<NewsArticle> getNewsByAuthor(String author) {
        return newsArticleRepository.findByAuthor(author);
    }
    public List<String> getAllCategories() {
        return newsArticleRepository.findAllCategories();
    }

    public List<String> getAllAuthors() {
        return newsArticleRepository.findAllAuthors();
    }

}