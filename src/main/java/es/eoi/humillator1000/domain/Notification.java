package es.eoi.humillator1000.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "minutes")
    private Integer minutes;

    @Column(name = "is_notified")
    private Boolean isNotified;

    @ManyToOne
    @JsonIgnoreProperties(value = { "notifications", "match" }, allowSetters = true)
    private UserHasMatch userHasMatch;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Notification id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMinutes() {
        return this.minutes;
    }

    public Notification minutes(Integer minutes) {
        this.setMinutes(minutes);
        return this;
    }

    public void setMinutes(Integer minutes) {
        this.minutes = minutes;
    }

    public Boolean getIsNotified() {
        return this.isNotified;
    }

    public Notification isNotified(Boolean isNotified) {
        this.setIsNotified(isNotified);
        return this;
    }

    public void setIsNotified(Boolean isNotified) {
        this.isNotified = isNotified;
    }

    public UserHasMatch getUserHasMatch() {
        return this.userHasMatch;
    }

    public void setUserHasMatch(UserHasMatch userHasMatch) {
        this.userHasMatch = userHasMatch;
    }

    public Notification userHasMatch(UserHasMatch userHasMatch) {
        this.setUserHasMatch(userHasMatch);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notification)) {
            return false;
        }
        return id != null && id.equals(((Notification) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            ", minutes=" + getMinutes() +
            ", isNotified='" + getIsNotified() + "'" +
            "}";
    }
}
