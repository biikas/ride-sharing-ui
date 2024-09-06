package com.event.eventweb.authentication;

import com.event.eventweb.dto.ModelBase;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author Anusha Shresthah
 */
@Data
public class LoginRequest extends ModelBase {

    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
