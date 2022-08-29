package es.eoi.humillator1000.domain;

import static org.assertj.core.api.Assertions.assertThat;

import es.eoi.humillator1000.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UserHasMatchIdTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserHasMatchId.class);
    }
}
