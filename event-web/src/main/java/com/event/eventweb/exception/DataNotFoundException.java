package com.event.eventweb.exception;


import com.event.eventweb.dto.PlatformResponse;

public class DataNotFoundException extends ServerException {

    public DataNotFoundException(final String message) {
        super(message);
    }

    public DataNotFoundException(final PlatformResponse platformResponse) {
        super(platformResponse);
    }
}
