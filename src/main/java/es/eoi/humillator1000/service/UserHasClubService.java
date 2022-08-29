package es.eoi.humillator1000.service;

import es.eoi.humillator1000.domain.UserHasClub;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link UserHasClub}.
 */
public interface UserHasClubService {
    /**
     * Save a userHasClub.
     *
     * @param userHasClub the entity to save.
     * @return the persisted entity.
     */
    UserHasClub save(UserHasClub userHasClub);

    /**
     * Updates a userHasClub.
     *
     * @param userHasClub the entity to update.
     * @return the persisted entity.
     */
    UserHasClub update(UserHasClub userHasClub);

    /**
     * Partially updates a userHasClub.
     *
     * @param userHasClub the entity to update partially.
     * @return the persisted entity.
     */
    Optional<UserHasClub> partialUpdate(UserHasClub userHasClub);

    /**
     * Get all the userHasClubs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<UserHasClub> findAll(Pageable pageable);

    /**
     * Get the "id" userHasClub.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserHasClub> findOne(Long id);

    /**
     * Delete the "id" userHasClub.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
