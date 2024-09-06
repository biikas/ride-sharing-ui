package com.event.eventweb.authentication;

import com.event.eventweb.dto.BaseResponse;
import lombok.Data;

/**
 * @author Anusha Shresthah
 */

@Data
public class LoginResponse extends BaseResponse {


//    private String passwordFlag;
    private String username;
    private String firstName;
    private String lastName;
    private String token;
    private String userType;
    private String name;
    private Long userId;

//    private String name;
//    private String branchName;
//    private String userType;
//    private Integer passwordExpiryDays;
//    private String token;
//    private String accountNumber;
//    private String mobileNumber;
//    private String emailAddress;
//    private String authMode;
//    private List<MenuDTO> roles;
}
