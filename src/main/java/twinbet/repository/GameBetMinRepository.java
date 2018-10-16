package twinbet.repository;

import twinbet.domain.GameBetMin;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GameBetMin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GameBetMinRepository extends JpaRepository<GameBetMin, Long> {

	Page<GameBetMin> findByLeagueUserLogin(String orElse, Pageable pageable);
}
