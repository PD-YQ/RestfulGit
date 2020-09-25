package com.pdyq.restfulgit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class RepoMapperTest {

    private RepoMapper repoMapper;

    @BeforeEach
    public void setUp() {
        repoMapper = new RepoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(repoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(repoMapper.fromId(null)).isNull();
    }
}
