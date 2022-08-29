package es.eoi.humillator1000.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * A UserHasClubId.
 */
@Entity
@Table(name = "user_has_club_id")
public class UserHasClubId implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "club_id")
    private Integer clubId;

    @Column(name = "role_id")
    private Integer roleId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Integer getUserId() {
        return this.userId;
    }

    public UserHasClubId userId(Integer userId) {
        this.setUserId(userId);
        return this;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getClubId() {
        return this.clubId;
    }

    public UserHasClubId clubId(Integer clubId) {
        this.setClubId(clubId);
        return this;
    }

    public void setClubId(Integer clubId) {
        this.clubId = clubId;
    }

    public Integer getRoleId() {
        return this.roleId;
    }

    public UserHasClubId roleId(Integer roleId) {
        this.setRoleId(roleId);
        return this;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserHasClubId)) {
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
        return "UserHasClubId{" +
            ", userId=" + getUserId() +
            ", clubId=" + getClubId() +
            ", roleId=" + getRoleId() +
            "}";
    }
}
