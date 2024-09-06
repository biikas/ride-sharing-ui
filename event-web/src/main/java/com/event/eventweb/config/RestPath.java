package com.event.eventweb.config;

import org.springframework.security.web.util.matcher.*;

/**
 * @author Anusha Shresthah
 */
public class RestPath {

    public static final RequestMatcher PUBLIC_URLS = new OrRequestMatcher(
            new AntPathRequestMatcher("/public/**"),
            new AntPathRequestMatcher("/error/**"),
            new AntPathRequestMatcher("/swagger-ui.html"),
            new AntPathRequestMatcher("/swagger-resources/**"),
            new AntPathRequestMatcher("/v2/api-docs/**"),
            new AntPathRequestMatcher("/swagger-resources/configuration/ui"),
            new AntPathRequestMatcher("/*.html"),
            new AntPathRequestMatcher("/**/*.html"),
            new AntPathRequestMatcher("/**/*.css"),
            new AntPathRequestMatcher("/**/*.js"),
            new AntPathRequestMatcher("/**/*.png"),
            new AntPathRequestMatcher("/**/*.ttf"),
            new AntPathRequestMatcher("/**/*.gif"),
            new AntPathRequestMatcher("/actuator/**"),
            new AntPathRequestMatcher("/auth/**"),
            new AntPathRequestMatcher("/register/**"),
            new AntPathRequestMatcher("/"),
            new AntPathRequestMatcher("/public/**"),
            new AntPathRequestMatcher("/initial/data"),
            new AntPathRequestMatcher("/check-username")


            );

    public static final RequestMatcher JWT_URLS = new AndRequestMatcher(
            new NegatedRequestMatcher(PUBLIC_URLS),
            new AntPathRequestMatcher("/**")
    );
}
