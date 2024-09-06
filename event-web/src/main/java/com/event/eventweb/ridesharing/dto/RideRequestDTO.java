package com.event.eventweb.ridesharing.dto;

import com.event.eventweb.dto.ModelBase;
import lombok.Data;

import javax.persistence.*;

/**
 * @author Bikash Shah
 */
@Data
public class RideRequestDTO extends ModelBase {

    private Long id;
    private Long riderId;
    private String riderName;
    private Double amount;
    private String startLocationName;
    private String endLocationName;
    private String startLocationLatitude;
    private String startLocationLongitude;
    private String endLocationLatitude;
    private String endLocationLongitude;
    private String distance;
}
