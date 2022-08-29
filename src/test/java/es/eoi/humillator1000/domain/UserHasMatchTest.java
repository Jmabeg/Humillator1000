package es.eoi.humillator1000.domain;

import static org.assertj.core.api.Assertions.assertThat;

import es.eoi.humillator1000.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UserHasMatchTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserHasMatch.class);
        UserHasMatch userHasMatch1 = new UserHasMatch();
        userHasMatch1.setId(1L);
        UserHasMatch userHasMatch2 = new UserHasMatch();
        userHasMatch2.setId(userHasMatch1.getId());
        assertThat(userHasMatch1).isEqualTo(userHasMatch2);
        userHasMatch2.setId(2L);
        assertThat(userHasMatch1).isNotEqualTo(userHasMatch2);
        userHasMatch1.setId(null);
        assertThat(userHasMatch1).isNotEqualTo(userHasMatch2);
    }
}
