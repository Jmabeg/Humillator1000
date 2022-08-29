package es.eoi.humillator1000.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.eoi.humillator1000.IntegrationTest;
import es.eoi.humillator1000.domain.UserHasClub;
import es.eoi.humillator1000.repository.UserHasClubRepository;
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
 * Integration tests for the {@link UserHasClubResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UserHasClubResourceIT {

    private static final Float DEFAULT_RATING = 1F;
    private static final Float UPDATED_RATING = 2F;

    private static final String ENTITY_API_URL = "/api/user-has-clubs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UserHasClubRepository userHasClubRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserHasClubMockMvc;

    private UserHasClub userHasClub;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserHasClub createEntity(EntityManager em) {
        UserHasClub userHasClub = new UserHasClub().rating(DEFAULT_RATING);
        return userHasClub;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserHasClub createUpdatedEntity(EntityManager em) {
        UserHasClub userHasClub = new UserHasClub().rating(UPDATED_RATING);
        return userHasClub;
    }

    @BeforeEach
    public void initTest() {
        userHasClub = createEntity(em);
    }

    @Test
    @Transactional
    void createUserHasClub() throws Exception {
        int databaseSizeBeforeCreate = userHasClubRepository.findAll().size();
        // Create the UserHasClub
        restUserHasClubMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userHasClub)))
            .andExpect(status().isCreated());

        // Validate the UserHasClub in the database
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeCreate + 1);
        UserHasClub testUserHasClub = userHasClubList.get(userHasClubList.size() - 1);
        assertThat(testUserHasClub.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    void createUserHasClubWithExistingId() throws Exception {
        // Create the UserHasClub with an existing ID
        userHasClub.setId(1L);

        int databaseSizeBeforeCreate = userHasClubRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserHasClubMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userHasClub)))
            .andExpect(status().isBadRequest());

        // Validate the UserHasClub in the database
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUserHasClubs() throws Exception {
        // Initialize the database
        userHasClubRepository.saveAndFlush(userHasClub);

        // Get all the userHasClubList
        restUserHasClubMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userHasClub.getId().intValue())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.doubleValue())));
    }

    @Test
    @Transactional
    void getUserHasClub() throws Exception {
        // Initialize the database
        userHasClubRepository.saveAndFlush(userHasClub);

        // Get the userHasClub
        restUserHasClubMockMvc
            .perform(get(ENTITY_API_URL_ID, userHasClub.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userHasClub.getId().intValue()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingUserHasClub() throws Exception {
        // Get the userHasClub
        restUserHasClubMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewUserHasClub() throws Exception {
        // Initialize the database
        userHasClubRepository.saveAndFlush(userHasClub);

        int databaseSizeBeforeUpdate = userHasClubRepository.findAll().size();

        // Update the userHasClub
        UserHasClub updatedUserHasClub = userHasClubRepository.findById(userHasClub.getId()).get();
        // Disconnect from session so that the updates on updatedUserHasClub are not directly saved in db
        em.detach(updatedUserHasClub);
        updatedUserHasClub.rating(UPDATED_RATING);

        restUserHasClubMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUserHasClub.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUserHasClub))
            )
            .andExpect(status().isOk());

        // Validate the UserHasClub in the database
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeUpdate);
        UserHasClub testUserHasClub = userHasClubList.get(userHasClubList.size() - 1);
        assertThat(testUserHasClub.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    void putNonExistingUserHasClub() throws Exception {
        int databaseSizeBeforeUpdate = userHasClubRepository.findAll().size();
        userHasClub.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserHasClubMockMvc
            .perform(
                put(ENTITY_API_URL_ID, userHasClub.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userHasClub))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserHasClub in the database
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUserHasClub() throws Exception {
        int databaseSizeBeforeUpdate = userHasClubRepository.findAll().size();
        userHasClub.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserHasClubMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userHasClub))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserHasClub in the database
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUserHasClub() throws Exception {
        int databaseSizeBeforeUpdate = userHasClubRepository.findAll().size();
        userHasClub.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserHasClubMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userHasClub)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserHasClub in the database
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUserHasClubWithPatch() throws Exception {
        // Initialize the database
        userHasClubRepository.saveAndFlush(userHasClub);

        int databaseSizeBeforeUpdate = userHasClubRepository.findAll().size();

        // Update the userHasClub using partial update
        UserHasClub partialUpdatedUserHasClub = new UserHasClub();
        partialUpdatedUserHasClub.setId(userHasClub.getId());

        restUserHasClubMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserHasClub.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserHasClub))
            )
            .andExpect(status().isOk());

        // Validate the UserHasClub in the database
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeUpdate);
        UserHasClub testUserHasClub = userHasClubList.get(userHasClubList.size() - 1);
        assertThat(testUserHasClub.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    void fullUpdateUserHasClubWithPatch() throws Exception {
        // Initialize the database
        userHasClubRepository.saveAndFlush(userHasClub);

        int databaseSizeBeforeUpdate = userHasClubRepository.findAll().size();

        // Update the userHasClub using partial update
        UserHasClub partialUpdatedUserHasClub = new UserHasClub();
        partialUpdatedUserHasClub.setId(userHasClub.getId());

        partialUpdatedUserHasClub.rating(UPDATED_RATING);

        restUserHasClubMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserHasClub.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserHasClub))
            )
            .andExpect(status().isOk());

        // Validate the UserHasClub in the database
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeUpdate);
        UserHasClub testUserHasClub = userHasClubList.get(userHasClubList.size() - 1);
        assertThat(testUserHasClub.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    void patchNonExistingUserHasClub() throws Exception {
        int databaseSizeBeforeUpdate = userHasClubRepository.findAll().size();
        userHasClub.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserHasClubMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, userHasClub.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userHasClub))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserHasClub in the database
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUserHasClub() throws Exception {
        int databaseSizeBeforeUpdate = userHasClubRepository.findAll().size();
        userHasClub.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserHasClubMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userHasClub))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserHasClub in the database
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUserHasClub() throws Exception {
        int databaseSizeBeforeUpdate = userHasClubRepository.findAll().size();
        userHasClub.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserHasClubMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(userHasClub))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserHasClub in the database
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUserHasClub() throws Exception {
        // Initialize the database
        userHasClubRepository.saveAndFlush(userHasClub);

        int databaseSizeBeforeDelete = userHasClubRepository.findAll().size();

        // Delete the userHasClub
        restUserHasClubMockMvc
            .perform(delete(ENTITY_API_URL_ID, userHasClub.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserHasClub> userHasClubList = userHasClubRepository.findAll();
        assertThat(userHasClubList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
