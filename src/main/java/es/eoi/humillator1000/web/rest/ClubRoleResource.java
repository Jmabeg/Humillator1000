package es.eoi.humillator1000.web.rest;

import es.eoi.humillator1000.domain.ClubRole;
import es.eoi.humillator1000.repository.ClubRoleRepository;
import es.eoi.humillator1000.service.ClubRoleService;
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
 * REST controller for managing {@link es.eoi.humillator1000.domain.ClubRole}.
 */
@RestController
@RequestMapping("/api")
public class ClubRoleResource {

    private final Logger log = LoggerFactory.getLogger(ClubRoleResource.class);

    private static final String ENTITY_NAME = "clubRole";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClubRoleService clubRoleService;

    private final ClubRoleRepository clubRoleRepository;

    public ClubRoleResource(ClubRoleService clubRoleService, ClubRoleRepository clubRoleRepository) {
        this.clubRoleService = clubRoleService;
        this.clubRoleRepository = clubRoleRepository;
    }

    /**
     * {@code POST  /club-roles} : Create a new clubRole.
     *
     * @param clubRole the clubRole to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clubRole, or with status {@code 400 (Bad Request)} if the clubRole has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/club-roles")
    public ResponseEntity<ClubRole> createClubRole(@RequestBody ClubRole clubRole) throws URISyntaxException {
        log.debug("REST request to save ClubRole : {}", clubRole);
        if (clubRole.getId() != null) {
            throw new BadRequestAlertException("A new clubRole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClubRole result = clubRoleService.save(clubRole);
        return ResponseEntity
            .created(new URI("/api/club-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /club-roles/:id} : Updates an existing clubRole.
     *
     * @param id the id of the clubRole to save.
     * @param clubRole the clubRole to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clubRole,
     * or with status {@code 400 (Bad Request)} if the clubRole is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clubRole couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/club-roles/{id}")
    public ResponseEntity<ClubRole> updateClubRole(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ClubRole clubRole
    ) throws URISyntaxException {
        log.debug("REST request to update ClubRole : {}, {}", id, clubRole);
        if (clubRole.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clubRole.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clubRoleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ClubRole result = clubRoleService.update(clubRole);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, clubRole.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /club-roles/:id} : Partial updates given fields of an existing clubRole, field will ignore if it is null
     *
     * @param id the id of the clubRole to save.
     * @param clubRole the clubRole to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clubRole,
     * or with status {@code 400 (Bad Request)} if the clubRole is not valid,
     * or with status {@code 404 (Not Found)} if the clubRole is not found,
     * or with status {@code 500 (Internal Server Error)} if the clubRole couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/club-roles/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ClubRole> partialUpdateClubRole(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ClubRole clubRole
    ) throws URISyntaxException {
        log.debug("REST request to partial update ClubRole partially : {}, {}", id, clubRole);
        if (clubRole.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clubRole.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clubRoleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ClubRole> result = clubRoleService.partialUpdate(clubRole);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, clubRole.getId().toString())
        );
    }

    /**
     * {@code GET  /club-roles} : get all the clubRoles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clubRoles in body.
     */
    @GetMapping("/club-roles")
    public ResponseEntity<List<ClubRole>> getAllClubRoles(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ClubRoles");
        Page<ClubRole> page = clubRoleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /club-roles/:id} : get the "id" clubRole.
     *
     * @param id the id of the clubRole to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clubRole, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/club-roles/{id}")
    public ResponseEntity<ClubRole> getClubRole(@PathVariable Long id) {
        log.debug("REST request to get ClubRole : {}", id);
        Optional<ClubRole> clubRole = clubRoleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(clubRole);
    }

    /**
     * {@code DELETE  /club-roles/:id} : delete the "id" clubRole.
     *
     * @param id the id of the clubRole to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/club-roles/{id}")
    public ResponseEntity<Void> deleteClubRole(@PathVariable Long id) {
        log.debug("REST request to delete ClubRole : {}", id);
        clubRoleService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
