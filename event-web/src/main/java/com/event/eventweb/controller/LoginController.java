package com.event.eventweb.controller;

import com.event.eventweb.authentication.AuthService;
import com.event.eventweb.authentication.LoginRequest;
import com.event.eventweb.authentication.LoginResponse;
import com.event.eventweb.dto.PlatformResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

/**
 * @author Anusha Shresthah
 */
@Slf4j
@RestController
@RequestMapping("auth")
public class LoginController {

    @Autowired
    private AuthService authService;

    @PostMapping(value = "login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@NotNull @RequestBody LoginRequest loginRequest) {
        PlatformResponse platformResponse = authService.login(loginRequest);

        LoginResponse loginResponse = (LoginResponse) platformResponse.getObj();

        HttpHeaders headers = new HttpHeaders();

        headers.add(HttpHeaders.AUTHORIZATION, loginResponse.getToken());

        return new ResponseEntity<>(platformResponse, headers, HttpStatus.OK);
    }
}
