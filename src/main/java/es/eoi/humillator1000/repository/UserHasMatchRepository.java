package es.eoi.humillator1000.repository;

import es.eoi.humillator1000.domain.UserHasMatch;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UserHasMatch entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserHasMatchRepository extends JpaRepository<UserHasMatch, Long> {}
