package com.event.eventweb.config.token;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@Slf4j
public class AdminTokenUtil implements Serializable {


    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getIssuedAt);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public String getAudienceFormToken(String token) {
        return getClaimFromToken(token, Claims::getAudience);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        try {
            String secret = "abcd";
            return Jwts.parser().setSigningKey(secret.getBytes("UTF-8")).parseClaimsJws(token).getBody();
        } catch (UnsupportedEncodingException ex) {
            log.error("Exception : " + ex.getMessage());
            return null;
        }
    }

    private Boolean isTokenExpired(String token) {
        final Date expirationDate = getExpirationDateFromToken(token);
        return expirationDate.before(new Date());
    }

    private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
        return (lastPasswordReset != null && created.before(lastPasswordReset));
    }

    private Boolean ignoreTokenExpiration(String token) {
        return false;
    }

    public String generateToken(String username, String deviceType) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, username, deviceType);
    }

    private String doGenerateToken(Map<String, Object> claims, String subject, String deviceType) {
        try {
            final Date createdDate = new Date();
            final Date expirationDate = calculateExpirationDate(createdDate);
            String secret = "abcd";
            return Jwts.builder().setClaims(claims).setSubject(subject).setAudience(deviceType).setIssuedAt(createdDate)
                    .signWith(SignatureAlgorithm.HS512, secret.getBytes("UTF-8")).compact();
        } catch (UnsupportedEncodingException ex) {
            log.error("Exception : " , ex);
            return null;
        }
    }

    public Boolean canTokenBeRefreshed(String token, Date lastPasswordReset) {
        final Date created = getIssuedAtDateFromToken(token);
        return !isCreatedBeforeLastPasswordReset(created, lastPasswordReset) && (!isTokenExpired(token) || ignoreTokenExpiration(token));
    }

    public String refreshToken(String token) {
        try {
            final Date createdDate = new Date();
            final Date expirationDate = calculateExpirationDate(createdDate);

            final Claims claims = getAllClaimsFromToken(token);
            claims.setIssuedAt(createdDate);
            claims.setExpiration(expirationDate);
            String secret = "abcd";

            return Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS512, secret.getBytes("UTF-8")).compact();
        } catch (UnsupportedEncodingException ex) {
            log.error("Exception : " + ex.getMessage());
            return null;
        }
    }

    private Date calculateExpirationDate(Date createdDate) {
        long expiration = Long.parseLong("30000");
        return new Date(createdDate.getTime() + expiration * 1000);
    }

}
