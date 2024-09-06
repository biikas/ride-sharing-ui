package com.event.eventweb.authentication;

import com.event.eventweb.config.ResponseMsg;
import com.event.eventweb.entity.ApplicationUser;
import com.event.eventweb.exception.UnauthorizedException;
import com.event.eventweb.repository.ApplicationUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * @author Anusha Shresthah
 */
@Slf4j
@Component
public class ApplicationUserManager {

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Transactional(readOnly = true)
    public ApplicationUser loadUserByUsername(String userName) {
        Optional<ApplicationUser> user = applicationUserRepository.findByUserName(userName);
        if (user.isPresent()) {
            //valid username
            //log.debug("Logged in application user : {}", user.get().getId());
            return user.get();
        }
        throw new UnauthorizedException(ResponseMsg.failureResponse("Invalid Username"));
    }
}
