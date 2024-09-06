package com.event.eventweb.exception;

public class UnauthorizedLoginException extends ServerException {

    public UnauthorizedLoginException(final String message) {
        super(message);
    }
}
