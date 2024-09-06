package com.event.eventweb.exception;


import com.event.eventweb.config.ResponseMsg;
import com.event.eventweb.dto.PlatformResponse;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ServerException extends RuntimeException {

    private PlatformResponse platformResponse;

    public boolean isInvalidLogin() {
        return false;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public Integer getCode() {
        return null;
    }

    public String getProcessingCode() {
        return null;
    }

    public ServerException() {
        super();
    }

    public ServerException(final String message) {
        super(message);
    }

    public ServerException(final PlatformResponse platformResponse) {
        this.platformResponse = platformResponse;
    }

    public PlatformResponse getServerResponse() {
        if (platformResponse == null) {
            return ResponseMsg.failureResponse("Internal Server Error");
        }
        return platformResponse;
    }
}
