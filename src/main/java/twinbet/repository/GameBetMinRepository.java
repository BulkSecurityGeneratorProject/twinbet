package twinbet.repository;

import twinbet.domain.GameBetMin;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GameBetMin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GameBetMinRepository extends JpaRepository<GameBetMin, Long> {

}
