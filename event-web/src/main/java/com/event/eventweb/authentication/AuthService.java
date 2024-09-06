package com.event.eventweb.authentication;

import com.event.eventweb.dto.PlatformResponse;

public interface AuthService {

    PlatformResponse login(LoginRequest loginRequest);

}
