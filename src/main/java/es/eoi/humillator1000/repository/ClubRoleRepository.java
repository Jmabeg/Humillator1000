package es.eoi.humillator1000.repository;

import es.eoi.humillator1000.domain.ClubRole;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ClubRole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClubRoleRepository extends JpaRepository<ClubRole, Long> {}
