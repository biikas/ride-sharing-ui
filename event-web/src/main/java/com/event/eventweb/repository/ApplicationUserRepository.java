package com.event.eventweb.repository;

import com.event.eventweb.entity.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

/**
 * @author Anusha Shresthah
 */
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser,Long> {

    @Query("select t from ApplicationUser t where t.username =:userName and t.active='Y'")
    Optional<ApplicationUser> findByUserName(String userName);

}
