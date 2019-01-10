package org.smilegate.mapper;

import org.smilegate.domain.Token;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.hash.HashMapper;
import org.springframework.data.redis.hash.ObjectHashMapper;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created hyunjk on 2019-01-10.
 * Github : https://github.com/hyunjkluz
 */
@Service
public class HashMapping {
    private final HashOperations<String, byte[], byte[]> hashOperations;

    public HashMapping(HashOperations<String, byte[], byte[]> hashOperations) {
        this.hashOperations = hashOperations;
    }

    HashMapper<Object, byte[], byte[]> mapper = new ObjectHashMapper();

    public void writeHash(String key, Token token) {
        Map<byte[], byte[]> mappedHash = mapper.toHash(token);
        hashOperations.putAll(key, mappedHash);
    }

    public Token loadHash(String key) {
        Map<byte[], byte[]> loaded = hashOperations.entries("key");
        return (Token) mapper.fromHash(loaded);
    }
}
