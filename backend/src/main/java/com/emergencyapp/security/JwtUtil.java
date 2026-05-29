package com.emergencyapp.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration:86400000}")
    private long expirationTime;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String generateToken(
            String userId,
            String email,
            String role
    ) {
        return Jwts.builder()
                .subject(email)
                .claim("userId", userId)
                .claim("email", email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + expirationTime
                        )
                )
                .signWith(getSigningKey())
                .compact();
    }

    public Claims extractClaims(
            String token
    ) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractEmail(
            String token
    ) {
        return extractClaims(token)
                .getSubject();
    }

    public String extractUserId(
            String token
    ) {
        return extractClaims(token)
                .get(
                        "userId",
                        String.class
                );
    }

    public String extractRole(
            String token
    ) {
        return extractClaims(token)
                .get(
                        "role",
                        String.class
                );
    }

    public boolean isTokenExpired(
            String token
    ) {
        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }

    public boolean isTokenValid(
            String token
    ) {
        try {
            return !isTokenExpired(token);
        } catch (Exception error) {
            return false;
        }
    }
}