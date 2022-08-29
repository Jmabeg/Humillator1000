package es.eoi.humillator1000.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Match.
 */
@Entity
@Table(name = "jhi_match")
public class Match implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "starting_date")
    private LocalDate startingDate;

    @Column(name = "ending_date")
    private LocalDate endingDate;

    @Column(name = "description")
    private String description;

    @Column(name = "title")
    private String title;

    @Column(name = "jhi_delete")
    private Boolean delete;

    @ManyToOne
    @JsonIgnoreProperties(value = { "matches", "userHasClubs" }, allowSetters = true)
    private Club club;

    @ManyToOne
    @JsonIgnoreProperties(value = { "matches" }, allowSetters = true)
    private Season season;

    @OneToMany(mappedBy = "match")
    @JsonIgnoreProperties(value = { "notifications", "match" }, allowSetters = true)
    private Set<UserHasMatch> userHasMatches = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Match id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartingDate() {
        return this.startingDate;
    }

    public Match startingDate(LocalDate startingDate) {
        this.setStartingDate(startingDate);
        return this;
    }

    public void setStartingDate(LocalDate startingDate) {
        this.startingDate = startingDate;
    }

    public LocalDate getEndingDate() {
        return this.endingDate;
    }

    public Match endingDate(LocalDate endingDate) {
        this.setEndingDate(endingDate);
        return this;
    }

    public void setEndingDate(LocalDate endingDate) {
        this.endingDate = endingDate;
    }

    public String getDescription() {
        return this.description;
    }

    public Match description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return this.title;
    }

    public Match title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getDelete() {
        return this.delete;
    }

    public Match delete(Boolean delete) {
        this.setDelete(delete);
        return this;
    }

    public void setDelete(Boolean delete) {
        this.delete = delete;
    }

    public Club getClub() {
        return this.club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public Match club(Club club) {
        this.setClub(club);
        return this;
    }

    public Season getSeason() {
        return this.season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public Match season(Season season) {
        this.setSeason(season);
        return this;
    }

    public Set<UserHasMatch> getUserHasMatches() {
        return this.userHasMatches;
    }

    public void setUserHasMatches(Set<UserHasMatch> userHasMatches) {
        if (this.userHasMatches != null) {
            this.userHasMatches.forEach(i -> i.setMatch(null));
        }
        if (userHasMatches != null) {
            userHasMatches.forEach(i -> i.setMatch(this));
        }
        this.userHasMatches = userHasMatches;
    }

    public Match userHasMatches(Set<UserHasMatch> userHasMatches) {
        this.setUserHasMatches(userHasMatches);
        return this;
    }

    public Match addUserHasMatch(UserHasMatch userHasMatch) {
        this.userHasMatches.add(userHasMatch);
        userHasMatch.setMatch(this);
        return this;
    }

    public Match removeUserHasMatch(UserHasMatch userHasMatch) {
        this.userHasMatches.remove(userHasMatch);
        userHasMatch.setMatch(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Match)) {
            return false;
        }
        return id != null && id.equals(((Match) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Match{" +
            "id=" + getId() +
            ", startingDate='" + getStartingDate() + "'" +
            ", endingDate='" + getEndingDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", title='" + getTitle() + "'" +
            ", delete='" + getDelete() + "'" +
            "}";
    }
}
