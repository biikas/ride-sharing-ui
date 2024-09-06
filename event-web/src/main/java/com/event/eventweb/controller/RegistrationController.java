package com.event.eventweb.controller;

import com.event.eventweb.dto.PlatformResponse;
import com.event.eventweb.registration.RegistrationService;
import com.event.eventweb.registration.dto.RegistrationRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("register")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping(value = "user", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@NotNull @RequestBody RegistrationRequest registrationRequest) {
        PlatformResponse platformResponse = registrationService.registerUser(registrationRequest);
        return new ResponseEntity<>(platformResponse, HttpStatus.OK);

    }
}
