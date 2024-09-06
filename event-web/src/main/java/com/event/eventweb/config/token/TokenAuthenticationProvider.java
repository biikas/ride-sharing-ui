package com.event.eventweb.config.token;

import com.event.eventweb.config.user.UserAuthenticationService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * @author Anusha Shresthah
 */
@Primary
@Component
@AllArgsConstructor(access = AccessLevel.PACKAGE)
public final class TokenAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider implements AuthenticationManager {

    private UserAuthenticationService auth;

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
//nothing to do
    }

    @Override
    protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        System.out.println("Authenticating token in banksmart web");
        final Object token = authentication.getCredentials();
        return Optional
                .ofNullable(token)
                .map(String::valueOf)
                .flatMap(auth::findByToken)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid authentication token=" + token));
    }

}
