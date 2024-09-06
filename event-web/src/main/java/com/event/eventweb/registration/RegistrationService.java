package com.event.eventweb.registration;

import com.event.eventweb.registration.dto.RegistrationRequest;
import com.event.eventweb.dto.PlatformResponse;

/**
 * @author Anusha Shresthah
 */
public interface RegistrationService {

   PlatformResponse registerUser(RegistrationRequest registrationRequest);
}
