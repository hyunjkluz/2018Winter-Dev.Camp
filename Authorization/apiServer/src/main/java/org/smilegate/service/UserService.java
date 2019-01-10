package org.smilegate.service;

import lombok.extern.slf4j.Slf4j;
import org.smilegate.domain.Token;
import org.smilegate.dto.User;
import org.smilegate.mapper.UserMapper;
import org.smilegate.model.DefaultRes;
import org.smilegate.model.SignUpReq;
import org.smilegate.repository.RedisRepository;
import org.smilegate.utils.ResponseMessage;
import org.smilegate.utils.StatusCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;

/**
 * Created hyunjk on 2019-01-08.
 * Github : https://github.com/hyunjkluz
 */
@Slf4j
@Service("user")
public class UserService {
    private final UserMapper userMapper;
    private final RedisService redisService;

    public UserService(final UserMapper userMapper, final RedisService redisService) {
        this.userMapper = userMapper;
        this.redisService = redisService;
    }

    @Transactional
    public DefaultRes signUp(final SignUpReq signUpReq) {
        try {
            int idx = userMapper.save(signUpReq);
            return DefaultRes.res(StatusCode.CREATED, ResponseMessage.CREATED_USER);
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            log.error(e.getMessage());
            return DefaultRes.res(StatusCode.DB_ERROR, ResponseMessage.DB_ERROR);
        }
    }

    @Transactional
    public DefaultRes update(final int idx, final User user) {
        User temp = userMapper.findUserByIdx(idx);
        if (temp == null)
            return DefaultRes.res(StatusCode.NOT_FOUND, ResponseMessage.NOT_FOUND_USER);

        try {
            if (user.getName() != null) temp.setName(user.getName());
            if (user.getEmail() != null) temp.setEmail(user.getEmail());
            if (user.getGender() != null) temp.setGender(user.getGender());

            userMapper.update(idx, temp);
            return DefaultRes.res(StatusCode.NO_CONTENT, ResponseMessage.UPDATE_USER);
        } catch (Exception e) {
            //Rollback
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

            log.error(e.getMessage());
            return DefaultRes.res(StatusCode.DB_ERROR, ResponseMessage.DB_ERROR);
        }
    }

    public DefaultRes findAll() {
        try {
            Token t = redisService.getToken();
            log.info(t.toString());
//            List<Token> tokenList = redisService.getAllRedisToken();
//
//            for (Token t : tokenList) {
//                log.info((t.toString()));
//            }

            List<User> userList = userMapper.findAll();

            if (userList.size() == 0) {
                return DefaultRes.res(StatusCode.NO_CONTENT, ResponseMessage.READ_USER);
            } else {
                return DefaultRes.res(StatusCode.OK, ResponseMessage.READ_USER, userList);
            }


        } catch (Exception e) {
            log.error(e.getMessage());
            return DefaultRes.res(StatusCode.DB_ERROR, ResponseMessage.DB_ERROR);
        }
    }

//    public boolean isVaildToken(final String token) {
//        try {
//            Token token1 = redisRepository.getOne()
//        } catch (Exception e) {
//            log.error(e.getMessage());
//            return false;
//        }
//    }
}
