package com.event.eventweb.ridesharing;

import com.event.eventweb.dto.PlatformResponse;
import com.event.eventweb.ridesharing.dto.RideRequestDTO;

/**
 * @author Bikash Shah
 */
public interface RideRequestService {

    PlatformResponse createRide(RideRequestDTO rideRequestDTO);
}
