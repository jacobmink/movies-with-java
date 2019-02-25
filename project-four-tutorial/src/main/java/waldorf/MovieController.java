package waldorf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/movies")
    public Iterable<Movie> index(){
        return movieRepository.findAll();
    }

    @PostMapping("/api/movies")
    public Movie create(@RequestBody Movie movie, HttpSession session){
        User currentUser = userRepository.findByUsername(session.getAttribute("username").toString());
        movie.setUser(currentUser);
        return movieRepository.save(movie);
    }
}
