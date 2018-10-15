package twinbet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GameBetMin.
 */
@Entity
@Table(name = "game_bet_min")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GameBetMin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_home")
    private String nameHome;

    @Column(name = "name_away")
    private String nameAway;

    @Column(name = "home_line_home")
    private String homeLineHome;

    @Column(name = "home_odds_home")
    private String homeOddsHome;

    @Column(name = "home_line_away")
    private String homeLineAway;

    @Column(name = "home_odds_away")
    private String homeOddsAway;

    @ManyToOne
    @JsonIgnoreProperties("")
    private League league;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameHome() {
        return nameHome;
    }

    public GameBetMin nameHome(String nameHome) {
        this.nameHome = nameHome;
        return this;
    }

    public void setNameHome(String nameHome) {
        this.nameHome = nameHome;
    }

    public String getNameAway() {
        return nameAway;
    }

    public GameBetMin nameAway(String nameAway) {
        this.nameAway = nameAway;
        return this;
    }

    public void setNameAway(String nameAway) {
        this.nameAway = nameAway;
    }

    public String getHomeLineHome() {
        return homeLineHome;
    }

    public GameBetMin homeLineHome(String homeLineHome) {
        this.homeLineHome = homeLineHome;
        return this;
    }

    public void setHomeLineHome(String homeLineHome) {
        this.homeLineHome = homeLineHome;
    }

    public String getHomeOddsHome() {
        return homeOddsHome;
    }

    public GameBetMin homeOddsHome(String homeOddsHome) {
        this.homeOddsHome = homeOddsHome;
        return this;
    }

    public void setHomeOddsHome(String homeOddsHome) {
        this.homeOddsHome = homeOddsHome;
    }

    public String getHomeLineAway() {
        return homeLineAway;
    }

    public GameBetMin homeLineAway(String homeLineAway) {
        this.homeLineAway = homeLineAway;
        return this;
    }

    public void setHomeLineAway(String homeLineAway) {
        this.homeLineAway = homeLineAway;
    }

    public String getHomeOddsAway() {
        return homeOddsAway;
    }

    public GameBetMin homeOddsAway(String homeOddsAway) {
        this.homeOddsAway = homeOddsAway;
        return this;
    }

    public void setHomeOddsAway(String homeOddsAway) {
        this.homeOddsAway = homeOddsAway;
    }

    public League getLeague() {
        return league;
    }

    public GameBetMin league(League league) {
        this.league = league;
        return this;
    }

    public void setLeague(League league) {
        this.league = league;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GameBetMin gameBetMin = (GameBetMin) o;
        if (gameBetMin.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gameBetMin.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GameBetMin{" +
            "id=" + getId() +
            ", nameHome='" + getNameHome() + "'" +
            ", nameAway='" + getNameAway() + "'" +
            ", homeLineHome='" + getHomeLineHome() + "'" +
            ", homeOddsHome='" + getHomeOddsHome() + "'" +
            ", homeLineAway='" + getHomeLineAway() + "'" +
            ", homeOddsAway='" + getHomeOddsAway() + "'" +
            "}";
    }
}
