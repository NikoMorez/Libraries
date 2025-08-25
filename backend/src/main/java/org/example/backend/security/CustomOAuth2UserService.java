package org.example.backend.security;

import lombok.RequiredArgsConstructor;
import org.example.backend.repo.AppUserRepo;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AppUserRepo appUserRepo;

    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        AppUser appUser = appUserRepo.findById(oAuth2User.getName())
                .orElseGet(() -> createAppUser(oAuth2User));

        return oAuth2User;
    }

    private AppUser createAppUser(OAuth2User oAuth2User) {
        AppUser newUser = AppUser.builder()
                .id(oAuth2User.getName()) // UserId von GitHub
                .username(oAuth2User.getAttribute("login"))
                .build();
        appUserRepo.save(newUser);
        return newUser;
    }
}
