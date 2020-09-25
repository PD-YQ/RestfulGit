package com.pdyq.restfulgit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pdyq.restfulgit.web.rest.TestUtil;

public class RepoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Repo.class);
        Repo repo1 = new Repo();
        repo1.setId(1L);
        Repo repo2 = new Repo();
        repo2.setId(repo1.getId());
        assertThat(repo1).isEqualTo(repo2);
        repo2.setId(2L);
        assertThat(repo1).isNotEqualTo(repo2);
        repo1.setId(null);
        assertThat(repo1).isNotEqualTo(repo2);
    }
}
