package es.eoi.humillator1000.service;

import es.eoi.humillator1000.domain.UserHasMatch;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link UserHasMatch}.
 */
public interface UserHasMatchService {
    /**
     * Save a userHasMatch.
     *
     * @param userHasMatch the entity to save.
     * @return the persisted entity.
     */
    UserHasMatch save(UserHasMatch userHasMatch);

    /**
     * Updates a userHasMatch.
     *
     * @param userHasMatch the entity to update.
     * @return the persisted entity.
     */
    UserHasMatch update(UserHasMatch userHasMatch);

    /**
     * Partially updates a userHasMatch.
     *
     * @param userHasMatch the entity to update partially.
     * @return the persisted entity.
     */
    Optional<UserHasMatch> partialUpdate(UserHasMatch userHasMatch);

    /**
     * Get all the userHasMatches.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<UserHasMatch> findAll(Pageable pageable);

    /**
     * Get the "id" userHasMatch.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserHasMatch> findOne(Long id);

    /**
     * Delete the "id" userHasMatch.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
