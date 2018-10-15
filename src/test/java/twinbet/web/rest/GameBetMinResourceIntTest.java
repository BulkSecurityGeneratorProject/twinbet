package twinbet.web.rest;

import twinbet.TwinbetApp;

import twinbet.domain.GameBetMin;
import twinbet.repository.GameBetMinRepository;
import twinbet.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static twinbet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GameBetMinResource REST controller.
 *
 * @see GameBetMinResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TwinbetApp.class)
public class GameBetMinResourceIntTest {

    private static final String DEFAULT_NAME_HOME = "AAAAAAAAAA";
    private static final String UPDATED_NAME_HOME = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_AWAY = "AAAAAAAAAA";
    private static final String UPDATED_NAME_AWAY = "BBBBBBBBBB";

    private static final String DEFAULT_HOME_LINE_HOME = "AAAAAAAAAA";
    private static final String UPDATED_HOME_LINE_HOME = "BBBBBBBBBB";

    private static final String DEFAULT_HOME_ODDS_HOME = "AAAAAAAAAA";
    private static final String UPDATED_HOME_ODDS_HOME = "BBBBBBBBBB";

    private static final String DEFAULT_HOME_LINE_AWAY = "AAAAAAAAAA";
    private static final String UPDATED_HOME_LINE_AWAY = "BBBBBBBBBB";

    private static final String DEFAULT_HOME_ODDS_AWAY = "AAAAAAAAAA";
    private static final String UPDATED_HOME_ODDS_AWAY = "BBBBBBBBBB";

    @Autowired
    private GameBetMinRepository gameBetMinRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGameBetMinMockMvc;

    private GameBetMin gameBetMin;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GameBetMinResource gameBetMinResource = new GameBetMinResource(gameBetMinRepository);
        this.restGameBetMinMockMvc = MockMvcBuilders.standaloneSetup(gameBetMinResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GameBetMin createEntity(EntityManager em) {
        GameBetMin gameBetMin = new GameBetMin()
            .nameHome(DEFAULT_NAME_HOME)
            .nameAway(DEFAULT_NAME_AWAY)
            .homeLineHome(DEFAULT_HOME_LINE_HOME)
            .homeOddsHome(DEFAULT_HOME_ODDS_HOME)
            .homeLineAway(DEFAULT_HOME_LINE_AWAY)
            .homeOddsAway(DEFAULT_HOME_ODDS_AWAY);
        return gameBetMin;
    }

    @Before
    public void initTest() {
        gameBetMin = createEntity(em);
    }

    @Test
    @Transactional
    public void createGameBetMin() throws Exception {
        int databaseSizeBeforeCreate = gameBetMinRepository.findAll().size();

        // Create the GameBetMin
        restGameBetMinMockMvc.perform(post("/api/game-bet-mins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameBetMin)))
            .andExpect(status().isCreated());

        // Validate the GameBetMin in the database
        List<GameBetMin> gameBetMinList = gameBetMinRepository.findAll();
        assertThat(gameBetMinList).hasSize(databaseSizeBeforeCreate + 1);
        GameBetMin testGameBetMin = gameBetMinList.get(gameBetMinList.size() - 1);
        assertThat(testGameBetMin.getNameHome()).isEqualTo(DEFAULT_NAME_HOME);
        assertThat(testGameBetMin.getNameAway()).isEqualTo(DEFAULT_NAME_AWAY);
        assertThat(testGameBetMin.getHomeLineHome()).isEqualTo(DEFAULT_HOME_LINE_HOME);
        assertThat(testGameBetMin.getHomeOddsHome()).isEqualTo(DEFAULT_HOME_ODDS_HOME);
        assertThat(testGameBetMin.getHomeLineAway()).isEqualTo(DEFAULT_HOME_LINE_AWAY);
        assertThat(testGameBetMin.getHomeOddsAway()).isEqualTo(DEFAULT_HOME_ODDS_AWAY);
    }

    @Test
    @Transactional
    public void createGameBetMinWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gameBetMinRepository.findAll().size();

        // Create the GameBetMin with an existing ID
        gameBetMin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGameBetMinMockMvc.perform(post("/api/game-bet-mins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameBetMin)))
            .andExpect(status().isBadRequest());

        // Validate the GameBetMin in the database
        List<GameBetMin> gameBetMinList = gameBetMinRepository.findAll();
        assertThat(gameBetMinList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGameBetMins() throws Exception {
        // Initialize the database
        gameBetMinRepository.saveAndFlush(gameBetMin);

        // Get all the gameBetMinList
        restGameBetMinMockMvc.perform(get("/api/game-bet-mins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gameBetMin.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameHome").value(hasItem(DEFAULT_NAME_HOME.toString())))
            .andExpect(jsonPath("$.[*].nameAway").value(hasItem(DEFAULT_NAME_AWAY.toString())))
            .andExpect(jsonPath("$.[*].homeLineHome").value(hasItem(DEFAULT_HOME_LINE_HOME.toString())))
            .andExpect(jsonPath("$.[*].homeOddsHome").value(hasItem(DEFAULT_HOME_ODDS_HOME.toString())))
            .andExpect(jsonPath("$.[*].homeLineAway").value(hasItem(DEFAULT_HOME_LINE_AWAY.toString())))
            .andExpect(jsonPath("$.[*].homeOddsAway").value(hasItem(DEFAULT_HOME_ODDS_AWAY.toString())));
    }
    
    @Test
    @Transactional
    public void getGameBetMin() throws Exception {
        // Initialize the database
        gameBetMinRepository.saveAndFlush(gameBetMin);

        // Get the gameBetMin
        restGameBetMinMockMvc.perform(get("/api/game-bet-mins/{id}", gameBetMin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gameBetMin.getId().intValue()))
            .andExpect(jsonPath("$.nameHome").value(DEFAULT_NAME_HOME.toString()))
            .andExpect(jsonPath("$.nameAway").value(DEFAULT_NAME_AWAY.toString()))
            .andExpect(jsonPath("$.homeLineHome").value(DEFAULT_HOME_LINE_HOME.toString()))
            .andExpect(jsonPath("$.homeOddsHome").value(DEFAULT_HOME_ODDS_HOME.toString()))
            .andExpect(jsonPath("$.homeLineAway").value(DEFAULT_HOME_LINE_AWAY.toString()))
            .andExpect(jsonPath("$.homeOddsAway").value(DEFAULT_HOME_ODDS_AWAY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGameBetMin() throws Exception {
        // Get the gameBetMin
        restGameBetMinMockMvc.perform(get("/api/game-bet-mins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGameBetMin() throws Exception {
        // Initialize the database
        gameBetMinRepository.saveAndFlush(gameBetMin);

        int databaseSizeBeforeUpdate = gameBetMinRepository.findAll().size();

        // Update the gameBetMin
        GameBetMin updatedGameBetMin = gameBetMinRepository.findById(gameBetMin.getId()).get();
        // Disconnect from session so that the updates on updatedGameBetMin are not directly saved in db
        em.detach(updatedGameBetMin);
        updatedGameBetMin
            .nameHome(UPDATED_NAME_HOME)
            .nameAway(UPDATED_NAME_AWAY)
            .homeLineHome(UPDATED_HOME_LINE_HOME)
            .homeOddsHome(UPDATED_HOME_ODDS_HOME)
            .homeLineAway(UPDATED_HOME_LINE_AWAY)
            .homeOddsAway(UPDATED_HOME_ODDS_AWAY);

        restGameBetMinMockMvc.perform(put("/api/game-bet-mins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGameBetMin)))
            .andExpect(status().isOk());

        // Validate the GameBetMin in the database
        List<GameBetMin> gameBetMinList = gameBetMinRepository.findAll();
        assertThat(gameBetMinList).hasSize(databaseSizeBeforeUpdate);
        GameBetMin testGameBetMin = gameBetMinList.get(gameBetMinList.size() - 1);
        assertThat(testGameBetMin.getNameHome()).isEqualTo(UPDATED_NAME_HOME);
        assertThat(testGameBetMin.getNameAway()).isEqualTo(UPDATED_NAME_AWAY);
        assertThat(testGameBetMin.getHomeLineHome()).isEqualTo(UPDATED_HOME_LINE_HOME);
        assertThat(testGameBetMin.getHomeOddsHome()).isEqualTo(UPDATED_HOME_ODDS_HOME);
        assertThat(testGameBetMin.getHomeLineAway()).isEqualTo(UPDATED_HOME_LINE_AWAY);
        assertThat(testGameBetMin.getHomeOddsAway()).isEqualTo(UPDATED_HOME_ODDS_AWAY);
    }

    @Test
    @Transactional
    public void updateNonExistingGameBetMin() throws Exception {
        int databaseSizeBeforeUpdate = gameBetMinRepository.findAll().size();

        // Create the GameBetMin

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGameBetMinMockMvc.perform(put("/api/game-bet-mins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameBetMin)))
            .andExpect(status().isBadRequest());

        // Validate the GameBetMin in the database
        List<GameBetMin> gameBetMinList = gameBetMinRepository.findAll();
        assertThat(gameBetMinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGameBetMin() throws Exception {
        // Initialize the database
        gameBetMinRepository.saveAndFlush(gameBetMin);

        int databaseSizeBeforeDelete = gameBetMinRepository.findAll().size();

        // Get the gameBetMin
        restGameBetMinMockMvc.perform(delete("/api/game-bet-mins/{id}", gameBetMin.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GameBetMin> gameBetMinList = gameBetMinRepository.findAll();
        assertThat(gameBetMinList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GameBetMin.class);
        GameBetMin gameBetMin1 = new GameBetMin();
        gameBetMin1.setId(1L);
        GameBetMin gameBetMin2 = new GameBetMin();
        gameBetMin2.setId(gameBetMin1.getId());
        assertThat(gameBetMin1).isEqualTo(gameBetMin2);
        gameBetMin2.setId(2L);
        assertThat(gameBetMin1).isNotEqualTo(gameBetMin2);
        gameBetMin1.setId(null);
        assertThat(gameBetMin1).isNotEqualTo(gameBetMin2);
    }
}
