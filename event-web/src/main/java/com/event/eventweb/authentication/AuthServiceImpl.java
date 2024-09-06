package com.event.eventweb.authentication;

import com.event.eventweb.config.token.AdminTokenUtil;
import com.event.eventweb.config.ResponseMsg;
import com.event.eventweb.dto.PlatformResponse;
import com.event.eventweb.entity.ApplicationUser;
import com.event.eventweb.exception.UnauthorizedException;
import com.event.eventweb.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author Anusha Shresthah
 */
@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    PasswordEncoder bcrypt;
    @Autowired
    private ApplicationUserRepository applicationUserRepository;
    @Autowired
    private ApplicationUserManager applicationUserManager;
    @Autowired
    private AdminTokenUtil adminTokenUtil;


    @Override
    public PlatformResponse login(LoginRequest loginRequest) {
        PlatformResponse platformResponse = new PlatformResponse();


        ApplicationUser applicationUser = applicationUserManager.loadUserByUsername(loginRequest.getUsername());

        validateCredential(loginRequest,applicationUser);

        // get username from application check valid username check valid credentials
        //check valid application user type

        String token = adminTokenUtil.generateToken(applicationUser.getUsername(),"WEB");


        //Here we can put the token in redis later on.
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setUsername(applicationUser.getUsername());
        loginResponse.setFirstName(applicationUser.getLastName());
        loginResponse.setLastName(applicationUser.getLastName());
        loginResponse.setUserType(applicationUser.getUserType());
        loginResponse.setName(applicationUser.getFirstName()+" "+applicationUser.getLastName());
        loginResponse.setSuccess(true);
        loginResponse.setToken(token);
        loginResponse.setUserId(applicationUser.getId());

        platformResponse.setSuccess(true);
        platformResponse.setMessage("Login Successfull");
        platformResponse.setObj(loginResponse);
        return platformResponse;
    }

    private void validateCredential(LoginRequest loginRequest,ApplicationUser applicationUser) {
        boolean valid = bcrypt.matches(loginRequest.getPassword(), applicationUser.getPassword());
       // refreshPasswordAttemptCounter(valid);
        if (valid) {
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(applicationUser, null));
        } else {
            throw new UnauthorizedException(ResponseMsg.failureResponse("Invalid Username Password"));
        }
    }
}
