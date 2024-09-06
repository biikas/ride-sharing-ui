package com.event.eventweb.exception;

import com.event.eventweb.dto.PlatformResponse;

public class InvalidDataException extends ServerException {

    public InvalidDataException(final String message) {
        super(message);
    }

    public InvalidDataException(final PlatformResponse platformResponse) {
        super(platformResponse);
    }
}
