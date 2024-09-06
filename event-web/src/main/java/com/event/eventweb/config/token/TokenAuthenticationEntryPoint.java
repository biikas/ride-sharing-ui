package com.event.eventweb.config.token;

import com.event.eventweb.config.ResponseMsg;
import com.event.eventweb.dto.UnauthorizedResponse;
import com.event.eventweb.util.JacksonUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

@Slf4j
@Component
public class TokenAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

    private static HttpMessageConverter<String> messageConverter = new StringHttpMessageConverter();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException {
        log.error("Error message : {}", authException.getMessage());

        UnauthorizedResponse unauthorizedResponse = ResponseMsg.unauthorizedResponse(authException.getMessage());
        ServerHttpResponse outputMessage = new ServletServerHttpResponse(response);
        outputMessage.setStatusCode(HttpStatus.UNAUTHORIZED);

        messageConverter.write(JacksonUtil.convertPojotoString(unauthorizedResponse), MediaType.APPLICATION_JSON, outputMessage);
    }

}
