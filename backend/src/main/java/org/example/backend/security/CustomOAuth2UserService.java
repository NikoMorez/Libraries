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

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = fetchOAuth2User(userRequest);

        String id = oAuth2User.getName();
        if (appUserRepo.findById(id).isEmpty()) {
            createAppUser(oAuth2User);
        }

        return oAuth2User;
    }

    protected OAuth2User fetchOAuth2User(OAuth2UserRequest req) {
        return super.loadUser(req);
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
