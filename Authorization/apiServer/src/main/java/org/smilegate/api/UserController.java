package org.smilegate.api;

import lombok.extern.slf4j.Slf4j;
import org.smilegate.dto.User;
import org.smilegate.model.DefaultRes;
import org.smilegate.model.SignUpReq;
import org.smilegate.repository.RedisRepository;
import org.smilegate.service.JwtService;
import org.smilegate.service.UserService;
import org.smilegate.utils.ResponseMessage;
import org.smilegate.utils.StatusCode;
import org.smilegate.utils.auth.Auth;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.smilegate.model.DefaultRes.FAIL_DEFAULT_RES;

/**
 * Created hyunjk on 2019-01-08.
 * Github : https://github.com/hyunjkluz
 */
@Slf4j
@RestController
@RequestMapping("user")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;


    public UserController(final UserService userService, final JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("signup")
    public ResponseEntity signup(@RequestBody final SignUpReq signUpReq) {
        try {
            return new ResponseEntity<>(userService.signUp(signUpReq), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("test")
    public ResponseEntity getAllUserTest() {
        try {
            return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Auth
    @GetMapping("")
    public ResponseEntity getAllUser(@RequestHeader(value = "Authorization") final String token) {
        try {
            JwtService.Token decodedToken = jwtService.decode(token);

            if (decodedToken.getName().equals("master")) {
                return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(DefaultRes.res(StatusCode.BAD_REQUEST, ResponseMessage.DO_NOT_HAVE_ACCESS_RIGHTS), HttpStatus.OK);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Auth
    @PutMapping("")
    public ResponseEntity updateUser(@RequestHeader(value = "Authorization") final String token,
                                     @RequestBody final User user) {
        try {
            JwtService.Token decodedToken = jwtService.decode(token);
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);


        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}