package com.event.eventweb.dto;

import lombok.*;

import java.util.List;

/**
 * @author Anusha Shresthah
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatGptResponse {

    private List<Choice> choices;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Choice {

        private int index;
        private Message message;

    }
}
