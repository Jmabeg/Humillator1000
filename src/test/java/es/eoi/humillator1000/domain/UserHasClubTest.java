package es.eoi.humillator1000.domain;

import static org.assertj.core.api.Assertions.assertThat;

import es.eoi.humillator1000.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UserHasClubTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserHasClub.class);
        UserHasClub userHasClub1 = new UserHasClub();
        userHasClub1.setId(1L);
        UserHasClub userHasClub2 = new UserHasClub();
        userHasClub2.setId(userHasClub1.getId());
        assertThat(userHasClub1).isEqualTo(userHasClub2);
        userHasClub2.setId(2L);
        assertThat(userHasClub1).isNotEqualTo(userHasClub2);
        userHasClub1.setId(null);
        assertThat(userHasClub1).isNotEqualTo(userHasClub2);
    }
}
