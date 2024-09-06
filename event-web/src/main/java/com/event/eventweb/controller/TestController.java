package com.event.eventweb.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Anusha Shresthah
 */
@RestController
public class TestController {

    @GetMapping(value = "/home")
    public String hello(){
        return "Bikas Shah";
    }
}
