package com.event.eventweb.repository;

import com.event.eventweb.entity.Requests;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Bikash Shah
 */
public interface RequestRepository extends JpaRepository<Requests,Long> {
}
