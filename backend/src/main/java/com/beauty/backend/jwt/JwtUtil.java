package com.beauty.backend.jwt;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component

public class JwtUtil {

    private final String SECRET_KEY =
    "mysecretkeymysecretkeymysecretkey";

    public String generateToken(String email){

        return Jwts.builder()

                .setSubject(email)

                .setIssuedAt(new Date())

                .setExpiration(

                new Date(
                System.currentTimeMillis()
                + 1000 * 60 * 60 * 24
                ))

                .signWith(

                SignatureAlgorithm.HS256,

                SECRET_KEY)

                .compact();
    }

    public String extractEmail(
    String token){

        Claims claims =

        Jwts.parser()

            .setSigningKey(SECRET_KEY)

            .parseClaimsJws(token)

            .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(
    String token){

        try{

            Jwts.parser()

                .setSigningKey(
                SECRET_KEY)

                .parseClaimsJws(token);

            return true;

        } catch(Exception e){

            return false;
        }
    }
}