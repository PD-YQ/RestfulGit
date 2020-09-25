package com.pdyq.restfulgit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pdyq.restfulgit.web.rest.TestUtil;

public class RepoDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepoDTO.class);
        RepoDTO repoDTO1 = new RepoDTO();
        repoDTO1.setId(1L);
        RepoDTO repoDTO2 = new RepoDTO();
        assertThat(repoDTO1).isNotEqualTo(repoDTO2);
        repoDTO2.setId(repoDTO1.getId());
        assertThat(repoDTO1).isEqualTo(repoDTO2);
        repoDTO2.setId(2L);
        assertThat(repoDTO1).isNotEqualTo(repoDTO2);
        repoDTO1.setId(null);
        assertThat(repoDTO1).isNotEqualTo(repoDTO2);
    }
}
