package com.pdyq.restfulgit.web.rest;

import com.pdyq.restfulgit.RestfulGitApp;
import com.pdyq.restfulgit.domain.Commit;
import com.pdyq.restfulgit.repository.CommitRepository;
import com.pdyq.restfulgit.service.CommitService;
import com.pdyq.restfulgit.service.dto.CommitDTO;
import com.pdyq.restfulgit.service.mapper.CommitMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CommitResource} REST controller.
 */
@SpringBootTest(classes = RestfulGitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CommitResourceIT {

    @Autowired
    private CommitRepository commitRepository;

    @Autowired
    private CommitMapper commitMapper;

    @Autowired
    private CommitService commitService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommitMockMvc;

    private Commit commit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commit createEntity(EntityManager em) {
        Commit commit = new Commit();
        return commit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commit createUpdatedEntity(EntityManager em) {
        Commit commit = new Commit();
        return commit;
    }

    @BeforeEach
    public void initTest() {
        commit = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommit() throws Exception {
        int databaseSizeBeforeCreate = commitRepository.findAll().size();
        // Create the Commit
        CommitDTO commitDTO = commitMapper.toDto(commit);
        restCommitMockMvc.perform(post("/api/commits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commitDTO)))
            .andExpect(status().isCreated());

        // Validate the Commit in the database
        List<Commit> commitList = commitRepository.findAll();
        assertThat(commitList).hasSize(databaseSizeBeforeCreate + 1);
        Commit testCommit = commitList.get(commitList.size() - 1);
    }

    @Test
    @Transactional
    public void createCommitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commitRepository.findAll().size();

        // Create the Commit with an existing ID
        commit.setId(1L);
        CommitDTO commitDTO = commitMapper.toDto(commit);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommitMockMvc.perform(post("/api/commits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commitDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Commit in the database
        List<Commit> commitList = commitRepository.findAll();
        assertThat(commitList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCommits() throws Exception {
        // Initialize the database
        commitRepository.saveAndFlush(commit);

        // Get all the commitList
        restCommitMockMvc.perform(get("/api/commits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commit.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getCommit() throws Exception {
        // Initialize the database
        commitRepository.saveAndFlush(commit);

        // Get the commit
        restCommitMockMvc.perform(get("/api/commits/{id}", commit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commit.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCommit() throws Exception {
        // Get the commit
        restCommitMockMvc.perform(get("/api/commits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommit() throws Exception {
        // Initialize the database
        commitRepository.saveAndFlush(commit);

        int databaseSizeBeforeUpdate = commitRepository.findAll().size();

        // Update the commit
        Commit updatedCommit = commitRepository.findById(commit.getId()).get();
        // Disconnect from session so that the updates on updatedCommit are not directly saved in db
        em.detach(updatedCommit);
        CommitDTO commitDTO = commitMapper.toDto(updatedCommit);

        restCommitMockMvc.perform(put("/api/commits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commitDTO)))
            .andExpect(status().isOk());

        // Validate the Commit in the database
        List<Commit> commitList = commitRepository.findAll();
        assertThat(commitList).hasSize(databaseSizeBeforeUpdate);
        Commit testCommit = commitList.get(commitList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCommit() throws Exception {
        int databaseSizeBeforeUpdate = commitRepository.findAll().size();

        // Create the Commit
        CommitDTO commitDTO = commitMapper.toDto(commit);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommitMockMvc.perform(put("/api/commits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commitDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Commit in the database
        List<Commit> commitList = commitRepository.findAll();
        assertThat(commitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommit() throws Exception {
        // Initialize the database
        commitRepository.saveAndFlush(commit);

        int databaseSizeBeforeDelete = commitRepository.findAll().size();

        // Delete the commit
        restCommitMockMvc.perform(delete("/api/commits/{id}", commit.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commit> commitList = commitRepository.findAll();
        assertThat(commitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
