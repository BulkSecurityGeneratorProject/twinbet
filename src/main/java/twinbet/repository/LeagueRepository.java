package twinbet.repository;

import twinbet.domain.League;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the League entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LeagueRepository extends JpaRepository<League, Long> {

    @Query("select league from League league where league.user.login = ?#{principal.username}")
    List<League> findByUserIsCurrentUser();

}
