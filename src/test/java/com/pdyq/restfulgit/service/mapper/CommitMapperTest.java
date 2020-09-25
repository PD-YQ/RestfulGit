package com.pdyq.restfulgit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class CommitMapperTest {

    private CommitMapper commitMapper;

    @BeforeEach
    public void setUp() {
        commitMapper = new CommitMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(commitMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(commitMapper.fromId(null)).isNull();
    }
}
