package com.event.eventweb.config.user;

import com.event.eventweb.config.AuthApplicationUser;
import com.event.eventweb.config.token.AdminTokenUtil;
import com.event.eventweb.entity.ApplicationUser;
import com.event.eventweb.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Anusha Shresthah
 */
@Service
public class UserAuthenticationServiceImpl implements UserAuthenticationService {

    @Autowired
    private AdminTokenUtil tokenUtil;

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Override
    public Optional<UserDetails> findByToken(String token) {
        try {
            String username = tokenUtil.getUsernameFromToken(token);
            System.out.println("Username from token : " + username);

            Optional<ApplicationUser> applicationUser = applicationUserRepository.findByUserName(username);
            if (!applicationUser.isPresent()) {
                return Optional.empty();
            }

            List<String> users = new ArrayList<>();
            users.add("bikas");
            users.add("bikash");

            //Optional<String> user = users.;
//            if (!applicationUser.isPresent()) {
//                return Optional.empty();
//            }

//            boolean isValidAdminType = applicationUserLoginValidator.isValidAdminType(
//                    Arrays.asList(ApplicationUserConstant.type.DEFAULT_ADMIN), applicationUser.get());
//
//            if (!isValidAdminType) {
//                return Optional.empty();
//            }

//            List<AdminMenu> assignedRoles = applicationUserManager.getRoles(applicationUser.get());

            List<SimpleGrantedAuthority> grantedAuthorityList = users.stream().map(roles -> new SimpleGrantedAuthority(roles.toUpperCase(Locale.ROOT))).collect(Collectors.toList());

            return Optional.ofNullable(new AuthApplicationUser(applicationUser.get(), grantedAuthorityList, ""));
        } catch (Exception e) {
            System.out.println("Invalid login token");
            return null;
//            throw new UnauthorizedException(AdminMsgConstant.Admin.INVALID_LOGIN_TOKEN);
        }
    }
}
