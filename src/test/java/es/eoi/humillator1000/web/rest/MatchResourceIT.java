package es.eoi.humillator1000.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.eoi.humillator1000.IntegrationTest;
import es.eoi.humillator1000.domain.Match;
import es.eoi.humillator1000.repository.MatchRepository;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link MatchResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MatchResourceIT {

    private static final LocalDate DEFAULT_STARTING_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_STARTING_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_ENDING_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ENDING_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DELETE = false;
    private static final Boolean UPDATED_DELETE = true;

    private static final String ENTITY_API_URL = "/api/matches";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMatchMockMvc;

    private Match match;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Match createEntity(EntityManager em) {
        Match match = new Match()
            .startingDate(DEFAULT_STARTING_DATE)
            .endingDate(DEFAULT_ENDING_DATE)
            .description(DEFAULT_DESCRIPTION)
            .title(DEFAULT_TITLE)
            .delete(DEFAULT_DELETE);
        return match;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Match createUpdatedEntity(EntityManager em) {
        Match match = new Match()
            .startingDate(UPDATED_STARTING_DATE)
            .endingDate(UPDATED_ENDING_DATE)
            .description(UPDATED_DESCRIPTION)
            .title(UPDATED_TITLE)
            .delete(UPDATED_DELETE);
        return match;
    }

    @BeforeEach
    public void initTest() {
        match = createEntity(em);
    }

    @Test
    @Transactional
    void createMatch() throws Exception {
        int databaseSizeBeforeCreate = matchRepository.findAll().size();
        // Create the Match
        restMatchMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(match)))
            .andExpect(status().isCreated());

        // Validate the Match in the database
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeCreate + 1);
        Match testMatch = matchList.get(matchList.size() - 1);
        assertThat(testMatch.getStartingDate()).isEqualTo(DEFAULT_STARTING_DATE);
        assertThat(testMatch.getEndingDate()).isEqualTo(DEFAULT_ENDING_DATE);
        assertThat(testMatch.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMatch.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testMatch.getDelete()).isEqualTo(DEFAULT_DELETE);
    }

    @Test
    @Transactional
    void createMatchWithExistingId() throws Exception {
        // Create the Match with an existing ID
        match.setId(1L);

        int databaseSizeBeforeCreate = matchRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMatchMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(match)))
            .andExpect(status().isBadRequest());

        // Validate the Match in the database
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMatches() throws Exception {
        // Initialize the database
        matchRepository.saveAndFlush(match);

        // Get all the matchList
        restMatchMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(match.getId().intValue())))
            .andExpect(jsonPath("$.[*].startingDate").value(hasItem(DEFAULT_STARTING_DATE.toString())))
            .andExpect(jsonPath("$.[*].endingDate").value(hasItem(DEFAULT_ENDING_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].delete").value(hasItem(DEFAULT_DELETE.booleanValue())));
    }

    @Test
    @Transactional
    void getMatch() throws Exception {
        // Initialize the database
        matchRepository.saveAndFlush(match);

        // Get the match
        restMatchMockMvc
            .perform(get(ENTITY_API_URL_ID, match.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(match.getId().intValue()))
            .andExpect(jsonPath("$.startingDate").value(DEFAULT_STARTING_DATE.toString()))
            .andExpect(jsonPath("$.endingDate").value(DEFAULT_ENDING_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.delete").value(DEFAULT_DELETE.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingMatch() throws Exception {
        // Get the match
        restMatchMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMatch() throws Exception {
        // Initialize the database
        matchRepository.saveAndFlush(match);

        int databaseSizeBeforeUpdate = matchRepository.findAll().size();

        // Update the match
        Match updatedMatch = matchRepository.findById(match.getId()).get();
        // Disconnect from session so that the updates on updatedMatch are not directly saved in db
        em.detach(updatedMatch);
        updatedMatch
            .startingDate(UPDATED_STARTING_DATE)
            .endingDate(UPDATED_ENDING_DATE)
            .description(UPDATED_DESCRIPTION)
            .title(UPDATED_TITLE)
            .delete(UPDATED_DELETE);

        restMatchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMatch.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMatch))
            )
            .andExpect(status().isOk());

        // Validate the Match in the database
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeUpdate);
        Match testMatch = matchList.get(matchList.size() - 1);
        assertThat(testMatch.getStartingDate()).isEqualTo(UPDATED_STARTING_DATE);
        assertThat(testMatch.getEndingDate()).isEqualTo(UPDATED_ENDING_DATE);
        assertThat(testMatch.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMatch.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testMatch.getDelete()).isEqualTo(UPDATED_DELETE);
    }

    @Test
    @Transactional
    void putNonExistingMatch() throws Exception {
        int databaseSizeBeforeUpdate = matchRepository.findAll().size();
        match.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMatchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, match.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(match))
            )
            .andExpect(status().isBadRequest());

        // Validate the Match in the database
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMatch() throws Exception {
        int databaseSizeBeforeUpdate = matchRepository.findAll().size();
        match.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMatchMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(match))
            )
            .andExpect(status().isBadRequest());

        // Validate the Match in the database
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMatch() throws Exception {
        int databaseSizeBeforeUpdate = matchRepository.findAll().size();
        match.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMatchMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(match)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Match in the database
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMatchWithPatch() throws Exception {
        // Initialize the database
        matchRepository.saveAndFlush(match);

        int databaseSizeBeforeUpdate = matchRepository.findAll().size();

        // Update the match using partial update
        Match partialUpdatedMatch = new Match();
        partialUpdatedMatch.setId(match.getId());

        partialUpdatedMatch.endingDate(UPDATED_ENDING_DATE).description(UPDATED_DESCRIPTION).title(UPDATED_TITLE).delete(UPDATED_DELETE);

        restMatchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMatch.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMatch))
            )
            .andExpect(status().isOk());

        // Validate the Match in the database
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeUpdate);
        Match testMatch = matchList.get(matchList.size() - 1);
        assertThat(testMatch.getStartingDate()).isEqualTo(DEFAULT_STARTING_DATE);
        assertThat(testMatch.getEndingDate()).isEqualTo(UPDATED_ENDING_DATE);
        assertThat(testMatch.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMatch.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testMatch.getDelete()).isEqualTo(UPDATED_DELETE);
    }

    @Test
    @Transactional
    void fullUpdateMatchWithPatch() throws Exception {
        // Initialize the database
        matchRepository.saveAndFlush(match);

        int databaseSizeBeforeUpdate = matchRepository.findAll().size();

        // Update the match using partial update
        Match partialUpdatedMatch = new Match();
        partialUpdatedMatch.setId(match.getId());

        partialUpdatedMatch
            .startingDate(UPDATED_STARTING_DATE)
            .endingDate(UPDATED_ENDING_DATE)
            .description(UPDATED_DESCRIPTION)
            .title(UPDATED_TITLE)
            .delete(UPDATED_DELETE);

        restMatchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMatch.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMatch))
            )
            .andExpect(status().isOk());

        // Validate the Match in the database
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeUpdate);
        Match testMatch = matchList.get(matchList.size() - 1);
        assertThat(testMatch.getStartingDate()).isEqualTo(UPDATED_STARTING_DATE);
        assertThat(testMatch.getEndingDate()).isEqualTo(UPDATED_ENDING_DATE);
        assertThat(testMatch.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMatch.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testMatch.getDelete()).isEqualTo(UPDATED_DELETE);
    }

    @Test
    @Transactional
    void patchNonExistingMatch() throws Exception {
        int databaseSizeBeforeUpdate = matchRepository.findAll().size();
        match.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMatchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, match.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(match))
            )
            .andExpect(status().isBadRequest());

        // Validate the Match in the database
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMatch() throws Exception {
        int databaseSizeBeforeUpdate = matchRepository.findAll().size();
        match.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMatchMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(match))
            )
            .andExpect(status().isBadRequest());

        // Validate the Match in the database
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMatch() throws Exception {
        int databaseSizeBeforeUpdate = matchRepository.findAll().size();
        match.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMatchMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(match)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Match in the database
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMatch() throws Exception {
        // Initialize the database
        matchRepository.saveAndFlush(match);

        int databaseSizeBeforeDelete = matchRepository.findAll().size();

        // Delete the match
        restMatchMockMvc
            .perform(delete(ENTITY_API_URL_ID, match.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Match> matchList = matchRepository.findAll();
        assertThat(matchList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
