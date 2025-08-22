package org.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@SuppressWarnings("java:S4502") // CSRF absichtlich deaktiviert
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // NOSONAR java:S4502 - bewusst deaktiviert
                .authorizeHttpRequests(a -> a
                        .requestMatchers( HttpMethod.GET,"/api/example").authenticated()
                        .anyRequest().permitAll())
                .logout(l -> l.logoutSuccessUrl("http://localhost:5173"))
                .oauth2Login(o -> o
                        .defaultSuccessUrl("http://localhost:5173"));
        return http.build();
    }
}
