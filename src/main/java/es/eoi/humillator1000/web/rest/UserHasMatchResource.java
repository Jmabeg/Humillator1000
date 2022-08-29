package es.eoi.humillator1000.web.rest;

import es.eoi.humillator1000.domain.UserHasMatch;
import es.eoi.humillator1000.repository.UserHasMatchRepository;
import es.eoi.humillator1000.service.UserHasMatchService;
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
 * REST controller for managing {@link es.eoi.humillator1000.domain.UserHasMatch}.
 */
@RestController
@RequestMapping("/api")
public class UserHasMatchResource {

    private final Logger log = LoggerFactory.getLogger(UserHasMatchResource.class);

    private static final String ENTITY_NAME = "userHasMatch";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserHasMatchService userHasMatchService;

    private final UserHasMatchRepository userHasMatchRepository;

    public UserHasMatchResource(UserHasMatchService userHasMatchService, UserHasMatchRepository userHasMatchRepository) {
        this.userHasMatchService = userHasMatchService;
        this.userHasMatchRepository = userHasMatchRepository;
    }

    /**
     * {@code POST  /user-has-matches} : Create a new userHasMatch.
     *
     * @param userHasMatch the userHasMatch to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userHasMatch, or with status {@code 400 (Bad Request)} if the userHasMatch has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-has-matches")
    public ResponseEntity<UserHasMatch> createUserHasMatch(@RequestBody UserHasMatch userHasMatch) throws URISyntaxException {
        log.debug("REST request to save UserHasMatch : {}", userHasMatch);
        if (userHasMatch.getId() != null) {
            throw new BadRequestAlertException("A new userHasMatch cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserHasMatch result = userHasMatchService.save(userHasMatch);
        return ResponseEntity
            .created(new URI("/api/user-has-matches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-has-matches/:id} : Updates an existing userHasMatch.
     *
     * @param id the id of the userHasMatch to save.
     * @param userHasMatch the userHasMatch to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userHasMatch,
     * or with status {@code 400 (Bad Request)} if the userHasMatch is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userHasMatch couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-has-matches/{id}")
    public ResponseEntity<UserHasMatch> updateUserHasMatch(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserHasMatch userHasMatch
    ) throws URISyntaxException {
        log.debug("REST request to update UserHasMatch : {}, {}", id, userHasMatch);
        if (userHasMatch.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userHasMatch.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userHasMatchRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UserHasMatch result = userHasMatchService.update(userHasMatch);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userHasMatch.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /user-has-matches/:id} : Partial updates given fields of an existing userHasMatch, field will ignore if it is null
     *
     * @param id the id of the userHasMatch to save.
     * @param userHasMatch the userHasMatch to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userHasMatch,
     * or with status {@code 400 (Bad Request)} if the userHasMatch is not valid,
     * or with status {@code 404 (Not Found)} if the userHasMatch is not found,
     * or with status {@code 500 (Internal Server Error)} if the userHasMatch couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/user-has-matches/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UserHasMatch> partialUpdateUserHasMatch(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserHasMatch userHasMatch
    ) throws URISyntaxException {
        log.debug("REST request to partial update UserHasMatch partially : {}, {}", id, userHasMatch);
        if (userHasMatch.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userHasMatch.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userHasMatchRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UserHasMatch> result = userHasMatchService.partialUpdate(userHasMatch);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userHasMatch.getId().toString())
        );
    }

    /**
     * {@code GET  /user-has-matches} : get all the userHasMatches.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userHasMatches in body.
     */
    @GetMapping("/user-has-matches")
    public ResponseEntity<List<UserHasMatch>> getAllUserHasMatches(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of UserHasMatches");
        Page<UserHasMatch> page = userHasMatchService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /user-has-matches/:id} : get the "id" userHasMatch.
     *
     * @param id the id of the userHasMatch to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userHasMatch, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-has-matches/{id}")
    public ResponseEntity<UserHasMatch> getUserHasMatch(@PathVariable Long id) {
        log.debug("REST request to get UserHasMatch : {}", id);
        Optional<UserHasMatch> userHasMatch = userHasMatchService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userHasMatch);
    }

    /**
     * {@code DELETE  /user-has-matches/:id} : delete the "id" userHasMatch.
     *
     * @param id the id of the userHasMatch to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-has-matches/{id}")
    public ResponseEntity<Void> deleteUserHasMatch(@PathVariable Long id) {
        log.debug("REST request to delete UserHasMatch : {}", id);
        userHasMatchService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
