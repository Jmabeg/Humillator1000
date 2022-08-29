package es.eoi.humillator1000.web.rest;

import es.eoi.humillator1000.domain.UserHasClub;
import es.eoi.humillator1000.repository.UserHasClubRepository;
import es.eoi.humillator1000.service.UserHasClubService;
import es.eoi.humillator1000.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link es.eoi.humillator1000.domain.UserHasClub}.
 */
@RestController
@RequestMapping("/api")
public class UserHasClubResource {

    private final Logger log = LoggerFactory.getLogger(UserHasClubResource.class);

    private static final String ENTITY_NAME = "userHasClub";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserHasClubService userHasClubService;

    private final UserHasClubRepository userHasClubRepository;

    public UserHasClubResource(UserHasClubService userHasClubService, UserHasClubRepository userHasClubRepository) {
        this.userHasClubService = userHasClubService;
        this.userHasClubRepository = userHasClubRepository;
    }

    /**
     * {@code POST  /user-has-clubs} : Create a new userHasClub.
     *
     * @param userHasClub the userHasClub to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userHasClub, or with status {@code 400 (Bad Request)} if the userHasClub has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-has-clubs")
    public ResponseEntity<UserHasClub> createUserHasClub(@RequestBody UserHasClub userHasClub) throws URISyntaxException {
        log.debug("REST request to save UserHasClub : {}", userHasClub);
        if (userHasClub.getId() != null) {
            throw new BadRequestAlertException("A new userHasClub cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserHasClub result = userHasClubService.save(userHasClub);
        return ResponseEntity
            .created(new URI("/api/user-has-clubs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-has-clubs/:id} : Updates an existing userHasClub.
     *
     * @param id the id of the userHasClub to save.
     * @param userHasClub the userHasClub to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userHasClub,
     * or with status {@code 400 (Bad Request)} if the userHasClub is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userHasClub couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-has-clubs/{id}")
    public ResponseEntity<UserHasClub> updateUserHasClub(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserHasClub userHasClub
    ) throws URISyntaxException {
        log.debug("REST request to update UserHasClub : {}, {}", id, userHasClub);
        if (userHasClub.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userHasClub.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userHasClubRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UserHasClub result = userHasClubService.update(userHasClub);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userHasClub.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /user-has-clubs/:id} : Partial updates given fields of an existing userHasClub, field will ignore if it is null
     *
     * @param id the id of the userHasClub to save.
     * @param userHasClub the userHasClub to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userHasClub,
     * or with status {@code 400 (Bad Request)} if the userHasClub is not valid,
     * or with status {@code 404 (Not Found)} if the userHasClub is not found,
     * or with status {@code 500 (Internal Server Error)} if the userHasClub couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/user-has-clubs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UserHasClub> partialUpdateUserHasClub(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserHasClub userHasClub
    ) throws URISyntaxException {
        log.debug("REST request to partial update UserHasClub partially : {}, {}", id, userHasClub);
        if (userHasClub.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userHasClub.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userHasClubRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UserHasClub> result = userHasClubService.partialUpdate(userHasClub);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userHasClub.getId().toString())
        );
    }

    /**
     * {@code GET  /user-has-clubs} : get all the userHasClubs.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userHasClubs in body.
     */
    @GetMapping("/user-has-clubs")
    public ResponseEntity<List<UserHasClub>> getAllUserHasClubs(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of UserHasClubs");
        Page<UserHasClub> page = userHasClubService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /user-has-clubs/:id} : get the "id" userHasClub.
     *
     * @param id the id of the userHasClub to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userHasClub, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-has-clubs/{id}")
    public ResponseEntity<UserHasClub> getUserHasClub(@PathVariable Long id) {
        log.debug("REST request to get UserHasClub : {}", id);
        Optional<UserHasClub> userHasClub = userHasClubService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userHasClub);
    }

    /**
     * {@code DELETE  /user-has-clubs/:id} : delete the "id" userHasClub.
     *
     * @param id the id of the userHasClub to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-has-clubs/{id}")
    public ResponseEntity<Void> deleteUserHasClub(@PathVariable Long id) {
        log.debug("REST request to delete UserHasClub : {}", id);
        userHasClubService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
