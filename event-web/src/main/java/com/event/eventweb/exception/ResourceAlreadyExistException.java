package com.event.eventweb.exception;

import com.event.eventweb.dto.PlatformResponse;

public class ResourceAlreadyExistException extends ServerException {

    public ResourceAlreadyExistException(final String message) {
        super(message);
    }

    public ResourceAlreadyExistException(final PlatformResponse platformResponse) {
        super(platformResponse);
    }
}
