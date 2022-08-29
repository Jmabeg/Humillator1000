package es.eoi.humillator1000.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * A UserHasMatchId.
 */
@Entity
@Table(name = "user_has_match_id")
public class UserHasMatchId implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "match_id")
    private Integer matchId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Integer getUserId() {
        return this.userId;
    }

    public UserHasMatchId userId(Integer userId) {
        this.setUserId(userId);
        return this;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getMatchId() {
        return this.matchId;
    }

    public UserHasMatchId matchId(Integer matchId) {
        this.setMatchId(matchId);
        return this;
    }

    public void setMatchId(Integer matchId) {
        this.matchId = matchId;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserHasMatchId)) {
            return false;
        }
        return false;
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserHasMatchId{" +
            ", userId=" + getUserId() +
            ", matchId=" + getMatchId() +
            "}";
    }
}
