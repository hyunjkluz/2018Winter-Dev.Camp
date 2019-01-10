package org.smilegate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Created hyunjk on 2019-01-08.
 * Github : https://github.com/hyunjkluz
 */
@Data
@AllArgsConstructor
public class User {
    private int idx;
    private String id;
    private String name;
    private String email;
    private String gender;
    private String grade;
}
