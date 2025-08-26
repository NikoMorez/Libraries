package org.example.backend.security;

import org.example.backend.repo.AppUserRepo;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class CustomOAuth2UserServiceTest {

    private static OAuth2User fakeUser(String id, String login) {
        return new DefaultOAuth2User(
                List.of(new SimpleGrantedAuthority("ROLE_USER")),
                Map.of("id", id, "login", login),
                "id"
        );
    }

    @Test
    void loadUser_existingUser_doesNotSave() {
        AppUserRepo repo = mock(AppUserRepo.class);
        CustomOAuth2UserService service = spy(new CustomOAuth2UserService(repo));

        OAuth2User oAuth2User = fakeUser("456", "maxmustermann");

        doReturn(oAuth2User).when(service).fetchOAuth2User(any(OAuth2UserRequest.class));

        when(repo.findById("456"))
                .thenReturn(Optional.of(AppUser.builder().id("456").username("maxmustermann").build()));

        OAuth2User result = service.loadUser(mock(OAuth2UserRequest.class));

        assertThat(result).isSameAs(oAuth2User);
        verify(repo).findById("456");
        verify(repo, never()).save(any());
    }

    @Test
    void loadUser_newUser_createsAndSaves() {
        AppUserRepo repo = mock(AppUserRepo.class);
        CustomOAuth2UserService service = spy(new CustomOAuth2UserService(repo));

        OAuth2User oAuth2User = fakeUser("789", "test123");
        doReturn(oAuth2User).when(service).fetchOAuth2User(any(OAuth2UserRequest.class));

        when(repo.findById("789")).thenReturn(Optional.empty());

        OAuth2User result = service.loadUser(mock(OAuth2UserRequest.class));

        assertThat(result).isSameAs(oAuth2User);

        ArgumentCaptor<AppUser> cap = ArgumentCaptor.forClass(AppUser.class);
        verify(repo).save(cap.capture());
        assertThat(cap.getValue().id()).isEqualTo("789");
        assertThat(cap.getValue().username()).isEqualTo("test123");
    }
}
