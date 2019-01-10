package org.smilegate.mapper;

import org.apache.ibatis.annotations.*;
import org.smilegate.dto.User;
import org.smilegate.model.SignUpReq;

import java.util.List;

/**
 * Created hyunjk on 2019-01-08.
 * Github : https://github.com/hyunjkluz
 */
@Mapper
public interface UserMapper {
    @Select("SELECT idx, id, name, email, gender, grade FROM user")
    List<User> findAll();

    @Select("SELECT * FROM user WHERE idx = #{idx}")
    User findUserByIdx(@Param(value = "idx") final Integer idx);

    @Insert("INSERT INTO user VALUES (#{id}, #{password}, #{name}, #{email}, #{gender})")
    @Options(useGeneratedKeys = true, keyColumn = "user.userIdx")
    int save(@Param("signUpReq") final SignUpReq signUpReq);

    @Update("UPDATE user SET name = #{user.name}, email = #{user.email}, gender = #{user.gender} WHERE idx = #{idx}")
    void update(@Param("idx") final Integer idx, @Param("user") final User user);

    @Delete("DELETE FROM user WHERE idx = #{idx}")
    void delete(@Param("idx") final Integer idx);
}
