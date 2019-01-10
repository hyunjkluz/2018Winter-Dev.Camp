package org.smilegate.model;

import lombok.Data;

/**
 * Created hyunjk on 2019-01-08.
 * Github : https://github.com/hyunjkluz
 */
@Data
public class SignUpReq {
    private String id;
    private String pw;
    private String name;
    private String email;
    private String gender;
}
