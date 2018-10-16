package twinbet.web.rest;

import com.codahale.metrics.annotation.Timed;
import twinbet.domain.GameBetMin;
import twinbet.repository.GameBetMinRepository;
import twinbet.security.SecurityUtils;
import twinbet.web.rest.errors.BadRequestAlertException;
import twinbet.web.rest.util.HeaderUtil;
import twinbet.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing GameBetMin.
 */
@RestController
@RequestMapping("/api")
public class GameBetMinResource {

    private final Logger log = LoggerFactory.getLogger(GameBetMinResource.class);

    private static final String ENTITY_NAME = "gameBetMin";

    private final GameBetMinRepository gameBetMinRepository;

    public GameBetMinResource(GameBetMinRepository gameBetMinRepository) {
        this.gameBetMinRepository = gameBetMinRepository;
    }

    /**
     * POST  /game-bet-mins : Create a new gameBetMin.
     *
     * @param gameBetMin the gameBetMin to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gameBetMin, or with status 400 (Bad Request) if the gameBetMin has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/game-bet-mins")
    @Timed
    public ResponseEntity<GameBetMin> createGameBetMin(@RequestBody GameBetMin gameBetMin) throws URISyntaxException {
        log.debug("REST request to save GameBetMin : {}", gameBetMin);
        if (gameBetMin.getId() != null) {
            throw new BadRequestAlertException("A new gameBetMin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GameBetMin result = gameBetMinRepository.save(gameBetMin);
        return ResponseEntity.created(new URI("/api/game-bet-mins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /game-bet-mins : Updates an existing gameBetMin.
     *
     * @param gameBetMin the gameBetMin to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gameBetMin,
     * or with status 400 (Bad Request) if the gameBetMin is not valid,
     * or with status 500 (Internal Server Error) if the gameBetMin couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/game-bet-mins")
    @Timed
    public ResponseEntity<GameBetMin> updateGameBetMin(@RequestBody GameBetMin gameBetMin) throws URISyntaxException {
        log.debug("REST request to update GameBetMin : {}", gameBetMin);
        if (gameBetMin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GameBetMin result = gameBetMinRepository.save(gameBetMin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gameBetMin.getId().toString()))
            .body(result);
    }

    /**
     * GET  /game-bet-mins : get all the gameBetMins.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of gameBetMins in body
     */
    @GetMapping("/game-bet-mins")
    @Timed
    public ResponseEntity<List<GameBetMin>> getAllGameBetMins(Pageable pageable) {
        log.debug("REST request to get a page of GameBetMins");
        Page<GameBetMin> page = gameBetMinRepository.findByLeagueUserLogin(SecurityUtils.getCurrentUserLogin().orElse(null),pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/game-bet-mins");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /game-bet-mins/:id : get the "id" gameBetMin.
     *
     * @param id the id of the gameBetMin to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gameBetMin, or with status 404 (Not Found)
     */
    @GetMapping("/game-bet-mins/{id}")
    @Timed
    public ResponseEntity<GameBetMin> getGameBetMin(@PathVariable Long id) {
        log.debug("REST request to get GameBetMin : {}", id);
        Optional<GameBetMin> gameBetMin = gameBetMinRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gameBetMin);
    }

    /**
     * DELETE  /game-bet-mins/:id : delete the "id" gameBetMin.
     *
     * @param id the id of the gameBetMin to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/game-bet-mins/{id}")
    @Timed
    public ResponseEntity<Void> deleteGameBetMin(@PathVariable Long id) {
        log.debug("REST request to delete GameBetMin : {}", id);

        gameBetMinRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
