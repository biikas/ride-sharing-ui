package com.event.eventweb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Anusha Shresthah
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    private String role;
    private String content;//prompt
}
