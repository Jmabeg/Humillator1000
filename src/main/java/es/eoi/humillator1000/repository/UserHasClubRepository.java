package es.eoi.humillator1000.repository;

import es.eoi.humillator1000.domain.UserHasClub;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UserHasClub entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserHasClubRepository extends JpaRepository<UserHasClub, Long> {}
