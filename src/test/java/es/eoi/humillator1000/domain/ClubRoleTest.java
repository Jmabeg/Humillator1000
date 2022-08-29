package es.eoi.humillator1000.domain;

import static org.assertj.core.api.Assertions.assertThat;

import es.eoi.humillator1000.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ClubRoleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClubRole.class);
        ClubRole clubRole1 = new ClubRole();
        clubRole1.setId(1L);
        ClubRole clubRole2 = new ClubRole();
        clubRole2.setId(clubRole1.getId());
        assertThat(clubRole1).isEqualTo(clubRole2);
        clubRole2.setId(2L);
        assertThat(clubRole1).isNotEqualTo(clubRole2);
        clubRole1.setId(null);
        assertThat(clubRole1).isNotEqualTo(clubRole2);
    }
}
