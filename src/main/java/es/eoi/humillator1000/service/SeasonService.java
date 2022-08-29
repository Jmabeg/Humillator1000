package es.eoi.humillator1000.service;

import es.eoi.humillator1000.domain.Season;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Season}.
 */
public interface SeasonService {
    /**
     * Save a season.
     *
     * @param season the entity to save.
     * @return the persisted entity.
     */
    Season save(Season season);

    /**
     * Updates a season.
     *
     * @param season the entity to update.
     * @return the persisted entity.
     */
    Season update(Season season);

    /**
     * Partially updates a season.
     *
     * @param season the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Season> partialUpdate(Season season);

    /**
     * Get all the seasons.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Season> findAll(Pageable pageable);

    /**
     * Get the "id" season.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Season> findOne(Long id);

    /**
     * Delete the "id" season.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
