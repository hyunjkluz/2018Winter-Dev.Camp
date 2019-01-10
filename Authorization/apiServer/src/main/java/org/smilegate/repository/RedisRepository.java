package org.smilegate.repository;

import org.smilegate.domain.Token;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created hyunjk on 2019-01-09.
 * Github : https://github.com/hyunjkluz
 */
public interface RedisRepository extends JpaRepository<Token, String> {
}
