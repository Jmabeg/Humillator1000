package es.eoi.humillator1000.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A UserHasMatch.
 */
@Entity
@Table(name = "user_has_match")
public class UserHasMatch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "is_owner")
    private Boolean isOwner;

    @Column(name = "mark")
    private Integer mark;

    @OneToMany(mappedBy = "userHasMatch")
    @JsonIgnoreProperties(value = { "userHasMatch" }, allowSetters = true)
    private Set<Notification> notifications = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "club", "season", "userHasMatches" }, allowSetters = true)
    private Match match;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserHasMatch id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsOwner() {
        return this.isOwner;
    }

    public UserHasMatch isOwner(Boolean isOwner) {
        this.setIsOwner(isOwner);
        return this;
    }

    public void setIsOwner(Boolean isOwner) {
        this.isOwner = isOwner;
    }

    public Integer getMark() {
        return this.mark;
    }

    public UserHasMatch mark(Integer mark) {
        this.setMark(mark);
        return this;
    }

    public void setMark(Integer mark) {
        this.mark = mark;
    }

    public Set<Notification> getNotifications() {
        return this.notifications;
    }

    public void setNotifications(Set<Notification> notifications) {
        if (this.notifications != null) {
            this.notifications.forEach(i -> i.setUserHasMatch(null));
        }
        if (notifications != null) {
            notifications.forEach(i -> i.setUserHasMatch(this));
        }
        this.notifications = notifications;
    }

    public UserHasMatch notifications(Set<Notification> notifications) {
        this.setNotifications(notifications);
        return this;
    }

    public UserHasMatch addNotification(Notification notification) {
        this.notifications.add(notification);
        notification.setUserHasMatch(this);
        return this;
    }

    public UserHasMatch removeNotification(Notification notification) {
        this.notifications.remove(notification);
        notification.setUserHasMatch(null);
        return this;
    }

    public Match getMatch() {
        return this.match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public UserHasMatch match(Match match) {
        this.setMatch(match);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserHasMatch)) {
            return false;
        }
        return id != null && id.equals(((UserHasMatch) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserHasMatch{" +
            "id=" + getId() +
            ", isOwner='" + getIsOwner() + "'" +
            ", mark=" + getMark() +
            "}";
    }
}
