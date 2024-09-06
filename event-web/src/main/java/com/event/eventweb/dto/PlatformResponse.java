package com.event.eventweb.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlatformResponse extends BaseResponse {

    private Object obj;
    private Object errObj;

    public PlatformResponse(boolean success) {
        this.success = success;
    }

    public PlatformResponse(boolean success, Object obj) {
        this.success = success;
        this.obj = obj;
    }
}
