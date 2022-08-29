package es.eoi.humillator1000.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.eoi.humillator1000.IntegrationTest;
import es.eoi.humillator1000.domain.UserHasMatch;
import es.eoi.humillator1000.repository.UserHasMatchRepository;
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
 * Integration tests for the {@link UserHasMatchResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UserHasMatchResourceIT {

    private static final Boolean DEFAULT_IS_OWNER = false;
    private static final Boolean UPDATED_IS_OWNER = true;

    private static final Integer DEFAULT_MARK = 1;
    private static final Integer UPDATED_MARK = 2;

    private static final String ENTITY_API_URL = "/api/user-has-matches";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UserHasMatchRepository userHasMatchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserHasMatchMockMvc;

    private UserHasMatch userHasMatch;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserHasMatch createEntity(EntityManager em) {
        UserHasMatch userHasMatch = new UserHasMatch().isOwner(DEFAULT_IS_OWNER).mark(DEFAULT_MARK);
        return userHasMatch;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserHasMatch createUpdatedEntity(EntityManager em) {
        UserHasMatch userHasMatch = new UserHasMatch().isOwner(UPDATED_IS_OWNER).mark(UPDATED_MARK);
        return userHasMatch;
    }

    @BeforeEach
    public void initTest() {
        userHasMatch = createEntity(em);
    }

    @Test
    @Transactional
    void createUserHasMatch() throws Exception {
        int databaseSizeBeforeCreate = userHasMatchRepository.findAll().size();
        // Create the UserHasMatch
        restUserHasMatchMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userHasMatch)))
            .andExpect(status().isCreated());

        // Validate the UserHasMatch in the database
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeCreate + 1);
        UserHasMatch testUserHasMatch = userHasMatchList.get(userHasMatchList.size() - 1);
        assertThat(testUserHasMatch.getIsOwner()).isEqualTo(DEFAULT_IS_OWNER);
        assertThat(testUserHasMatch.getMark()).isEqualTo(DEFAULT_MARK);
    }

    @Test
    @Transactional
    void createUserHasMatchWithExistingId() throws Exception {
        // Create the UserHasMatch with an existing ID
        userHasMatch.setId(1L);

        int databaseSizeBeforeCreate = userHasMatchRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserHasMatchMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userHasMatch)))
            .andExpect(status().isBadRequest());

        // Validate the UserHasMatch in the database
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUserHasMatches() throws Exception {
        // Initialize the database
        userHasMatchRepository.saveAndFlush(userHasMatch);

        // Get all the userHasMatchList
        restUserHasMatchMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userHasMatch.getId().intValue())))
            .andExpect(jsonPath("$.[*].isOwner").value(hasItem(DEFAULT_IS_OWNER.booleanValue())))
            .andExpect(jsonPath("$.[*].mark").value(hasItem(DEFAULT_MARK)));
    }

    @Test
    @Transactional
    void getUserHasMatch() throws Exception {
        // Initialize the database
        userHasMatchRepository.saveAndFlush(userHasMatch);

        // Get the userHasMatch
        restUserHasMatchMockMvc
            .perform(get(ENTITY_API_URL_ID, userHasMatch.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userHasMatch.getId().intValue()))
            .andExpect(jsonPath("$.isOwner").value(DEFAULT_IS_OWNER.booleanValue()))
            .andExpect(jsonPath("$.mark").value(DEFAULT_MARK));
    }

    @Test
    @Transactional
    void getNonExistingUserHasMatch() throws Exception {
        // Get the userHasMatch
        restUserHasMatchMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewUserHasMatch() throws Exception {
        // Initialize the database
        userHasMatchRepository.saveAndFlush(userHasMatch);

        int databaseSizeBeforeUpdate = userHasMatchRepository.findAll().size();

        // Update the userHasMatch
        UserHasMatch updatedUserHasMatch = userHasMatchRepository.findById(userHasMatch.getId()).get();
        // Disconnect from session so that the updates on updatedUserHasMatch are not directly saved in db
        em.detach(updatedUserHasMatch);
        updatedUserHasMatch.isOwner(UPDATED_IS_OWNER).mark(UPDATED_MARK);

        restUserHasMatchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUserHasMatch.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUserHasMatch))
            )
            .andExpect(status().isOk());

        // Validate the UserHasMatch in the database
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeUpdate);
        UserHasMatch testUserHasMatch = userHasMatchList.get(userHasMatchList.size() - 1);
        assertThat(testUserHasMatch.getIsOwner()).isEqualTo(UPDATED_IS_OWNER);
        assertThat(testUserHasMatch.getMark()).isEqualTo(UPDATED_MARK);
    }

    @Test
    @Transactional
    void putNonExistingUserHasMatch() throws Exception {
        int databaseSizeBeforeUpdate = userHasMatchRepository.findAll().size();
        userHasMatch.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserHasMatchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, userHasMatch.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userHasMatch))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserHasMatch in the database
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUserHasMatch() throws Exception {
        int databaseSizeBeforeUpdate = userHasMatchRepository.findAll().size();
        userHasMatch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserHasMatchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userHasMatch))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserHasMatch in the database
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUserHasMatch() throws Exception {
        int databaseSizeBeforeUpdate = userHasMatchRepository.findAll().size();
        userHasMatch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserHasMatchMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userHasMatch)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserHasMatch in the database
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUserHasMatchWithPatch() throws Exception {
        // Initialize the database
        userHasMatchRepository.saveAndFlush(userHasMatch);

        int databaseSizeBeforeUpdate = userHasMatchRepository.findAll().size();

        // Update the userHasMatch using partial update
        UserHasMatch partialUpdatedUserHasMatch = new UserHasMatch();
        partialUpdatedUserHasMatch.setId(userHasMatch.getId());

        partialUpdatedUserHasMatch.isOwner(UPDATED_IS_OWNER).mark(UPDATED_MARK);

        restUserHasMatchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserHasMatch.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserHasMatch))
            )
            .andExpect(status().isOk());

        // Validate the UserHasMatch in the database
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeUpdate);
        UserHasMatch testUserHasMatch = userHasMatchList.get(userHasMatchList.size() - 1);
        assertThat(testUserHasMatch.getIsOwner()).isEqualTo(UPDATED_IS_OWNER);
        assertThat(testUserHasMatch.getMark()).isEqualTo(UPDATED_MARK);
    }

    @Test
    @Transactional
    void fullUpdateUserHasMatchWithPatch() throws Exception {
        // Initialize the database
        userHasMatchRepository.saveAndFlush(userHasMatch);

        int databaseSizeBeforeUpdate = userHasMatchRepository.findAll().size();

        // Update the userHasMatch using partial update
        UserHasMatch partialUpdatedUserHasMatch = new UserHasMatch();
        partialUpdatedUserHasMatch.setId(userHasMatch.getId());

        partialUpdatedUserHasMatch.isOwner(UPDATED_IS_OWNER).mark(UPDATED_MARK);

        restUserHasMatchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserHasMatch.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserHasMatch))
            )
            .andExpect(status().isOk());

        // Validate the UserHasMatch in the database
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeUpdate);
        UserHasMatch testUserHasMatch = userHasMatchList.get(userHasMatchList.size() - 1);
        assertThat(testUserHasMatch.getIsOwner()).isEqualTo(UPDATED_IS_OWNER);
        assertThat(testUserHasMatch.getMark()).isEqualTo(UPDATED_MARK);
    }

    @Test
    @Transactional
    void patchNonExistingUserHasMatch() throws Exception {
        int databaseSizeBeforeUpdate = userHasMatchRepository.findAll().size();
        userHasMatch.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserHasMatchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, userHasMatch.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userHasMatch))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserHasMatch in the database
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUserHasMatch() throws Exception {
        int databaseSizeBeforeUpdate = userHasMatchRepository.findAll().size();
        userHasMatch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserHasMatchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userHasMatch))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserHasMatch in the database
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUserHasMatch() throws Exception {
        int databaseSizeBeforeUpdate = userHasMatchRepository.findAll().size();
        userHasMatch.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserHasMatchMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(userHasMatch))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserHasMatch in the database
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUserHasMatch() throws Exception {
        // Initialize the database
        userHasMatchRepository.saveAndFlush(userHasMatch);

        int databaseSizeBeforeDelete = userHasMatchRepository.findAll().size();

        // Delete the userHasMatch
        restUserHasMatchMockMvc
            .perform(delete(ENTITY_API_URL_ID, userHasMatch.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserHasMatch> userHasMatchList = userHasMatchRepository.findAll();
        assertThat(userHasMatchList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
