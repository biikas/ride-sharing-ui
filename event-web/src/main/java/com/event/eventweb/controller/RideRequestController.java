package com.event.eventweb.controller;

import com.event.eventweb.dto.PlatformResponse;
import com.event.eventweb.registration.dto.RegistrationRequest;
import com.event.eventweb.ridesharing.RideRequestService;
import com.event.eventweb.ridesharing.dto.RideRequestDTO;
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
 * @author Bikash Shah
 */
@Slf4j
@RestController
@RequestMapping("ride/request")
public class RideRequestController {

    @Autowired
    private RideRequestService rideRequestService;

    @PostMapping(value = "create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(@NotNull @RequestBody RideRequestDTO rideRequestDTO) {
        PlatformResponse platformResponse = rideRequestService.createRide(rideRequestDTO);
        return new ResponseEntity<>(platformResponse, HttpStatus.OK);

    }
}
