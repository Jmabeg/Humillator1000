package es.eoi.humillator1000.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.eoi.humillator1000.IntegrationTest;
import es.eoi.humillator1000.domain.ClubRole;
import es.eoi.humillator1000.repository.ClubRoleRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ClubRoleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ClubRoleResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/club-roles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ClubRoleRepository clubRoleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restClubRoleMockMvc;

    private ClubRole clubRole;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClubRole createEntity(EntityManager em) {
        ClubRole clubRole = new ClubRole().name(DEFAULT_NAME);
        return clubRole;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClubRole createUpdatedEntity(EntityManager em) {
        ClubRole clubRole = new ClubRole().name(UPDATED_NAME);
        return clubRole;
    }

    @BeforeEach
    public void initTest() {
        clubRole = createEntity(em);
    }

    @Test
    @Transactional
    void createClubRole() throws Exception {
        int databaseSizeBeforeCreate = clubRoleRepository.findAll().size();
        // Create the ClubRole
        restClubRoleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(clubRole)))
            .andExpect(status().isCreated());

        // Validate the ClubRole in the database
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeCreate + 1);
        ClubRole testClubRole = clubRoleList.get(clubRoleList.size() - 1);
        assertThat(testClubRole.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createClubRoleWithExistingId() throws Exception {
        // Create the ClubRole with an existing ID
        clubRole.setId(1L);

        int databaseSizeBeforeCreate = clubRoleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restClubRoleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(clubRole)))
            .andExpect(status().isBadRequest());

        // Validate the ClubRole in the database
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllClubRoles() throws Exception {
        // Initialize the database
        clubRoleRepository.saveAndFlush(clubRole);

        // Get all the clubRoleList
        restClubRoleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clubRole.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getClubRole() throws Exception {
        // Initialize the database
        clubRoleRepository.saveAndFlush(clubRole);

        // Get the clubRole
        restClubRoleMockMvc
            .perform(get(ENTITY_API_URL_ID, clubRole.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(clubRole.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingClubRole() throws Exception {
        // Get the clubRole
        restClubRoleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewClubRole() throws Exception {
        // Initialize the database
        clubRoleRepository.saveAndFlush(clubRole);

        int databaseSizeBeforeUpdate = clubRoleRepository.findAll().size();

        // Update the clubRole
        ClubRole updatedClubRole = clubRoleRepository.findById(clubRole.getId()).get();
        // Disconnect from session so that the updates on updatedClubRole are not directly saved in db
        em.detach(updatedClubRole);
        updatedClubRole.name(UPDATED_NAME);

        restClubRoleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedClubRole.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedClubRole))
            )
            .andExpect(status().isOk());

        // Validate the ClubRole in the database
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeUpdate);
        ClubRole testClubRole = clubRoleList.get(clubRoleList.size() - 1);
        assertThat(testClubRole.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingClubRole() throws Exception {
        int databaseSizeBeforeUpdate = clubRoleRepository.findAll().size();
        clubRole.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClubRoleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, clubRole.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(clubRole))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClubRole in the database
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchClubRole() throws Exception {
        int databaseSizeBeforeUpdate = clubRoleRepository.findAll().size();
        clubRole.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClubRoleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(clubRole))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClubRole in the database
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamClubRole() throws Exception {
        int databaseSizeBeforeUpdate = clubRoleRepository.findAll().size();
        clubRole.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClubRoleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(clubRole)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ClubRole in the database
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateClubRoleWithPatch() throws Exception {
        // Initialize the database
        clubRoleRepository.saveAndFlush(clubRole);

        int databaseSizeBeforeUpdate = clubRoleRepository.findAll().size();

        // Update the clubRole using partial update
        ClubRole partialUpdatedClubRole = new ClubRole();
        partialUpdatedClubRole.setId(clubRole.getId());

        restClubRoleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClubRole.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedClubRole))
            )
            .andExpect(status().isOk());

        // Validate the ClubRole in the database
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeUpdate);
        ClubRole testClubRole = clubRoleList.get(clubRoleList.size() - 1);
        assertThat(testClubRole.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void fullUpdateClubRoleWithPatch() throws Exception {
        // Initialize the database
        clubRoleRepository.saveAndFlush(clubRole);

        int databaseSizeBeforeUpdate = clubRoleRepository.findAll().size();

        // Update the clubRole using partial update
        ClubRole partialUpdatedClubRole = new ClubRole();
        partialUpdatedClubRole.setId(clubRole.getId());

        partialUpdatedClubRole.name(UPDATED_NAME);

        restClubRoleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClubRole.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedClubRole))
            )
            .andExpect(status().isOk());

        // Validate the ClubRole in the database
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeUpdate);
        ClubRole testClubRole = clubRoleList.get(clubRoleList.size() - 1);
        assertThat(testClubRole.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingClubRole() throws Exception {
        int databaseSizeBeforeUpdate = clubRoleRepository.findAll().size();
        clubRole.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClubRoleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, clubRole.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(clubRole))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClubRole in the database
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchClubRole() throws Exception {
        int databaseSizeBeforeUpdate = clubRoleRepository.findAll().size();
        clubRole.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClubRoleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(clubRole))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClubRole in the database
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamClubRole() throws Exception {
        int databaseSizeBeforeUpdate = clubRoleRepository.findAll().size();
        clubRole.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClubRoleMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(clubRole)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ClubRole in the database
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteClubRole() throws Exception {
        // Initialize the database
        clubRoleRepository.saveAndFlush(clubRole);

        int databaseSizeBeforeDelete = clubRoleRepository.findAll().size();

        // Delete the clubRole
        restClubRoleMockMvc
            .perform(delete(ENTITY_API_URL_ID, clubRole.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ClubRole> clubRoleList = clubRoleRepository.findAll();
        assertThat(clubRoleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
