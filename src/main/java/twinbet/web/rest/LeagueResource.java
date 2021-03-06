package twinbet.web.rest;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import io.github.jhipster.web.util.ResponseUtil;
import twinbet.domain.League;
import twinbet.repository.LeagueRepository;
import twinbet.repository.UserRepository;
import twinbet.security.SecurityUtils;
import twinbet.web.rest.errors.BadRequestAlertException;
import twinbet.web.rest.util.HeaderUtil;

/**
 * REST controller for managing League.
 */
@RestController
@RequestMapping("/api")
public class LeagueResource {

    private final Logger log = LoggerFactory.getLogger(LeagueResource.class);

    private static final String ENTITY_NAME = "league";
    public final List<League> myListofLeagues = new ArrayList<League>();

    private final LeagueRepository leagueRepository;
    private final UserRepository userRepository;
    
    public LeagueResource(LeagueRepository leagueRepository, UserRepository userRepository) throws IOException {
        this.leagueRepository = leagueRepository;
        this.userRepository = userRepository;
        getListAllLeague();
    }
    
    public void getListAllLeague() throws IOException
    {
    	System.out.println(System.getProperty("user.dir"));
    	BufferedReader br = new BufferedReader(new FileReader("conffile/leagues.txt"));
    	String line;
    	while ((line = br.readLine()) != null) {
    		League l = new League();
    		l.setNameLeague(line);
    		myListofLeagues.add(l);
    	}
    	br.close();
    }

    /**
     * POST  /leagues : Create a new league.
     *
     * @param league the league to create
     * @return the ResponseEntity with status 201 (Created) and with body the new league, or with status 400 (Bad Request) if the league has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/leagues")
    @Timed
    public ResponseEntity<League> createLeague(@RequestBody League league) throws URISyntaxException {
    	league.setUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get());
        log.debug("REST request to save League : {}", league);
        if (league.getId() != null) {
            throw new BadRequestAlertException("A new league cannot already have an ID", ENTITY_NAME, "idexists");
        }
        League result = leagueRepository.save(league);
        return ResponseEntity.created(new URI("/api/leagues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /leagues : Updates an existing league.
     *
     * @param league the league to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated league,
     * or with status 400 (Bad Request) if the league is not valid,
     * or with status 500 (Internal Server Error) if the league couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/leagues")
    @Timed
    public ResponseEntity<League> updateLeague(@RequestBody League league) throws URISyntaxException {
        log.debug("REST request to update League : {}", league);
        if (league.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        League result = leagueRepository.save(league);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, league.getId().toString()))
            .body(result);
    }

    /**
     * GET  /leagues : get all the leagues by User.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of leagues in body
     */
    @GetMapping("/leagues")
    @Timed
    public List<League> getAllLeagues() {
        log.debug("REST request to get all Leagues");
        
        return leagueRepository.findByUserIsCurrentUser();
    }
    
    /**
     * GET  /leaguesAll : get all the leagues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of leagues in body
     */
    @GetMapping("/leagueAll")
    @Timed
    public List<League> getAllLeaguesAll() {
    
        log.debug("REST request to get all Leagues AL");
        return this.myListofLeagues;
    }

    /**
     * GET  /leagues/:id : get the "id" league.
     *
     * @param id the id of the league to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the league, or with status 404 (Not Found)
     */
    @GetMapping("/leagues/{id}")
    @Timed
    public ResponseEntity<League> getLeague(@PathVariable Long id) {
        log.debug("REST request to get League : {}", id);
        Optional<League> league = leagueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(league);
    }

    /**
     * DELETE  /leagues/:id : delete the "id" league.
     *
     * @param id the id of the league to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/leagues/{id}")
    @Timed
    public ResponseEntity<Void> deleteLeague(@PathVariable Long id) {
        log.debug("REST request to delete League : {}", id);

        leagueRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
