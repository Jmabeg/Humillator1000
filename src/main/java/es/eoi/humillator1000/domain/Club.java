package es.eoi.humillator1000.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Club.
 */
@Entity
@Table(name = "club")
public class Club implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "club")
    @JsonIgnoreProperties(value = { "club", "season", "userHasMatches" }, allowSetters = true)
    private Set<Match> matches = new HashSet<>();

    @OneToMany(mappedBy = "club")
    @JsonIgnoreProperties(value = { "club", "role" }, allowSetters = true)
    private Set<UserHasClub> userHasClubs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Club id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Club name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Match> getMatches() {
        return this.matches;
    }

    public void setMatches(Set<Match> matches) {
        if (this.matches != null) {
            this.matches.forEach(i -> i.setClub(null));
        }
        if (matches != null) {
            matches.forEach(i -> i.setClub(this));
        }
        this.matches = matches;
    }

    public Club matches(Set<Match> matches) {
        this.setMatches(matches);
        return this;
    }

    public Club addMatch(Match match) {
        this.matches.add(match);
        match.setClub(this);
        return this;
    }

    public Club removeMatch(Match match) {
        this.matches.remove(match);
        match.setClub(null);
        return this;
    }

    public Set<UserHasClub> getUserHasClubs() {
        return this.userHasClubs;
    }

    public void setUserHasClubs(Set<UserHasClub> userHasClubs) {
        if (this.userHasClubs != null) {
            this.userHasClubs.forEach(i -> i.setClub(null));
        }
        if (userHasClubs != null) {
            userHasClubs.forEach(i -> i.setClub(this));
        }
        this.userHasClubs = userHasClubs;
    }

    public Club userHasClubs(Set<UserHasClub> userHasClubs) {
        this.setUserHasClubs(userHasClubs);
        return this;
    }

    public Club addUserHasClub(UserHasClub userHasClub) {
        this.userHasClubs.add(userHasClub);
        userHasClub.setClub(this);
        return this;
    }

    public Club removeUserHasClub(UserHasClub userHasClub) {
        this.userHasClubs.remove(userHasClub);
        userHasClub.setClub(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Club)) {
            return false;
        }
        return id != null && id.equals(((Club) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Club{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
