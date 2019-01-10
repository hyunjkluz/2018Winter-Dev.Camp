package org.smilegate.service;

import lombok.extern.slf4j.Slf4j;
import org.smilegate.domain.Token;
import org.smilegate.mapper.HashMapping;
import org.smilegate.repository.RedisRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created hyunjk on 2019-01-10.
 * Github : https://github.com/hyunjkluz
 */
@Slf4j
@Service
public class RedisService {
    private final RedisRepository redisRepository;
    private final HashMapping hashMapping;

    public RedisService(final RedisRepository redisRepository, final HashMapping hashMapping) {
        this.redisRepository = redisRepository;
        this.hashMapping = hashMapping;
    }

    public List<Token> getAllRedisToken() {
        return redisRepository.findAll();
    }

    public Token getToken() {
        return hashMapping.loadHash("token");
    }
}
