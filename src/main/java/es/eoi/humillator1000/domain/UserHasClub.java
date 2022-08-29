package es.eoi.humillator1000.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A UserHasClub.
 */
@Entity
@Table(name = "user_has_club")
public class UserHasClub implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "rating")
    private Float rating;

    @ManyToOne
    @JsonIgnoreProperties(value = { "matches", "userHasClubs" }, allowSetters = true)
    private Club club;

    @ManyToOne
    @JsonIgnoreProperties(value = { "userHasClubs" }, allowSetters = true)
    private ClubRole role;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserHasClub id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getRating() {
        return this.rating;
    }

    public UserHasClub rating(Float rating) {
        this.setRating(rating);
        return this;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public Club getClub() {
        return this.club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public UserHasClub club(Club club) {
        this.setClub(club);
        return this;
    }

    public ClubRole getRole() {
        return this.role;
    }

    public void setRole(ClubRole clubRole) {
        this.role = clubRole;
    }

    public UserHasClub role(ClubRole clubRole) {
        this.setRole(clubRole);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserHasClub)) {
            return false;
        }
        return id != null && id.equals(((UserHasClub) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserHasClub{" +
            "id=" + getId() +
            ", rating=" + getRating() +
            "}";
    }
}
