package org.smilegate.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.util.Date;

/**
 * Created hyunjk on 2019-01-09.
 * Github : https://github.com/hyunjkluz
 */
@Data
@RedisHash("token")
public class Token {
    @Id
    private Integer id;
    @Indexed
    private String token;
    @Indexed
    private String timestamp;
    //parsing
}
