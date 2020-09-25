package com.pdyq.restfulgit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pdyq.restfulgit.web.rest.TestUtil;

public class CommitDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommitDTO.class);
        CommitDTO commitDTO1 = new CommitDTO();
        commitDTO1.setId(1L);
        CommitDTO commitDTO2 = new CommitDTO();
        assertThat(commitDTO1).isNotEqualTo(commitDTO2);
        commitDTO2.setId(commitDTO1.getId());
        assertThat(commitDTO1).isEqualTo(commitDTO2);
        commitDTO2.setId(2L);
        assertThat(commitDTO1).isNotEqualTo(commitDTO2);
        commitDTO1.setId(null);
        assertThat(commitDTO1).isNotEqualTo(commitDTO2);
    }
}
