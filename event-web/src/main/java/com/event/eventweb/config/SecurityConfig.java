package com.event.eventweb.config;

import com.event.eventweb.config.token.TokenAuthenticationEntryPoint;
import com.event.eventweb.config.token.TokenAuthenticationProvider;
import com.event.eventweb.config.token.TokenAuthorizationFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.*;
import org.springframework.security.web.header.writers.StaticHeadersWriter;

/**
 * @author Anusha Shresthah
 */
@Slf4j
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private TokenAuthenticationProvider tokenAuthenticationProvider;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        log.info("auth.mode : {}", authMode);
        http
                // Custom JWT based security filter
                .exceptionHandling()
                .and()
                .cors()
                .and()
                .csrf()
                .disable()
                .headers()
                .addHeaderWriter(new StaticHeadersWriter("X-Content-Security-Policy", "script-src 'self'"))
                .frameOptions()
                .disable()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

//                .addFilterBefore();


        http.addFilterBefore(tokenAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests(authz -> authz
//                        .anyRequest().permitAll() // Allow all requests
//                )
//                .csrf().disable(); // Disable CSRF protection (optional, based on your requirements)
//
//        return http.build();
//    }

    TokenAuthorizationFilter tokenAuthorizationFilter() throws Exception {
        final TokenAuthorizationFilter filter = new TokenAuthorizationFilter(RestPath.JWT_URLS);
        filter.setAuthenticationManager(tokenAuthenticationProvider);
        filter.setAuthenticationSuccessHandler(successHandler());
        filter.setAuthenticationFailureHandler(failureHandler());
        return filter;
    }

    @Bean
    SimpleUrlAuthenticationSuccessHandler successHandler() {
        final SimpleUrlAuthenticationSuccessHandler successHandler = new SimpleUrlAuthenticationSuccessHandler();
        successHandler.setRedirectStrategy(new NoRedirectStrategy());
        return successHandler;
    }
    @Bean
    AuthenticationFailureHandler failureHandler() {
        final AuthenticationFailureHandler failureHandler = new AuthenticationEntryPointFailureHandler(authenticationEntryPoint());
        return failureHandler;
    }
    AuthenticationEntryPoint authenticationEntryPoint() {
        return new TokenAuthenticationEntryPoint();
    }

    @Bean
    AuthenticationEntryPoint forbiddenEntryPoint() {
        return new HttpStatusEntryPoint(HttpStatus.FORBIDDEN);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
