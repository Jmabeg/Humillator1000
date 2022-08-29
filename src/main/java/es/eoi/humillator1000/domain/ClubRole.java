package es.eoi.humillator1000.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A ClubRole.
 */
@Entity
@Table(name = "club_role")
public class ClubRole implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "role")
    @JsonIgnoreProperties(value = { "club", "role" }, allowSetters = true)
    private Set<UserHasClub> userHasClubs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ClubRole id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public ClubRole name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<UserHasClub> getUserHasClubs() {
        return this.userHasClubs;
    }

    public void setUserHasClubs(Set<UserHasClub> userHasClubs) {
        if (this.userHasClubs != null) {
            this.userHasClubs.forEach(i -> i.setRole(null));
        }
        if (userHasClubs != null) {
            userHasClubs.forEach(i -> i.setRole(this));
        }
        this.userHasClubs = userHasClubs;
    }

    public ClubRole userHasClubs(Set<UserHasClub> userHasClubs) {
        this.setUserHasClubs(userHasClubs);
        return this;
    }

    public ClubRole addUserHasClub(UserHasClub userHasClub) {
        this.userHasClubs.add(userHasClub);
        userHasClub.setRole(this);
        return this;
    }

    public ClubRole removeUserHasClub(UserHasClub userHasClub) {
        this.userHasClubs.remove(userHasClub);
        userHasClub.setRole(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClubRole)) {
            return false;
        }
        return id != null && id.equals(((ClubRole) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClubRole{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
