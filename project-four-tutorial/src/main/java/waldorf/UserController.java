package waldorf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/api/auth/register")
    public User register(@RequestBody User user, HttpSession session) throws Exception{
        try{
            User newUser = userService.saveUser(user);
            session.setAttribute("username", newUser.getUsername());
            return newUser;
        }catch(Exception err){
            throw new Exception(err.getMessage());
        }
    }

    @PostMapping("/api/auth/login")
    public User login(@RequestBody User user, HttpSession session) throws Exception{
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
        User userLoggingIn = userRepository.findByUsername(user.getUsername());
        boolean validLogin = bCryptPasswordEncoder.matches(user.getPassword(), userLoggingIn.getPassword());
        if(validLogin){
            session.setAttribute("username", userLoggingIn.getUsername());
            return userLoggingIn;
        }else{
            throw new Exception("invalid credentials");
        }
    }

}
