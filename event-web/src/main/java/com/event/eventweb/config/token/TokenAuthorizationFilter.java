package com.event.eventweb.config.token;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static java.util.Optional.ofNullable;

/**
 * @author Anusha Shresthah
 */
@Slf4j
public class TokenAuthorizationFilter extends AbstractAuthenticationProcessingFilter {

    public TokenAuthorizationFilter(final RequestMatcher requiresAuth) {
        super(requiresAuth);
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
       log.info("Intercepted by JWT filter");

        final String param = ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
                .orElse(request.getParameter("t"));

        final String token = ofNullable(param)
                .map(String::trim)
                .orElseThrow(() -> new BadCredentialsException("Missing Authentication Token"));

        final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(token, token);
        return getAuthenticationManager().authenticate(authentication);
    }

    @Override
    protected void successfulAuthentication(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final FilterChain chain,
            final Authentication authResult) throws IOException, ServletException {
        super.successfulAuthentication(request, response, chain, authResult);
        chain.doFilter(request, response);
    }
}
