package es.eoi.humillator1000.service;

import es.eoi.humillator1000.domain.ClubRole;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link ClubRole}.
 */
public interface ClubRoleService {
    /**
     * Save a clubRole.
     *
     * @param clubRole the entity to save.
     * @return the persisted entity.
     */
    ClubRole save(ClubRole clubRole);

    /**
     * Updates a clubRole.
     *
     * @param clubRole the entity to update.
     * @return the persisted entity.
     */
    ClubRole update(ClubRole clubRole);

    /**
     * Partially updates a clubRole.
     *
     * @param clubRole the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ClubRole> partialUpdate(ClubRole clubRole);

    /**
     * Get all the clubRoles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ClubRole> findAll(Pageable pageable);

    /**
     * Get the "id" clubRole.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ClubRole> findOne(Long id);

    /**
     * Delete the "id" clubRole.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
