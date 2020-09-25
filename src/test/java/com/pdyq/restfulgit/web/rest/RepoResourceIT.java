package com.pdyq.restfulgit.web.rest;

import com.pdyq.restfulgit.RestfulGitApp;
import com.pdyq.restfulgit.domain.Repo;
import com.pdyq.restfulgit.repository.RepoRepository;
import com.pdyq.restfulgit.service.RepoService;
import com.pdyq.restfulgit.service.dto.RepoDTO;
import com.pdyq.restfulgit.service.mapper.RepoMapper;

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
 * Integration tests for the {@link RepoResource} REST controller.
 */
@SpringBootTest(classes = RestfulGitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RepoResourceIT {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private RepoRepository repoRepository;

    @Autowired
    private RepoMapper repoMapper;

    @Autowired
    private RepoService repoService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRepoMockMvc;

    private Repo repo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Repo createEntity(EntityManager em) {
        Repo repo = new Repo()
            .url(DEFAULT_URL)
            .username(DEFAULT_USERNAME)
            .password(DEFAULT_PASSWORD);
        return repo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Repo createUpdatedEntity(EntityManager em) {
        Repo repo = new Repo()
            .url(UPDATED_URL)
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD);
        return repo;
    }

    @BeforeEach
    public void initTest() {
        repo = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepo() throws Exception {
        int databaseSizeBeforeCreate = repoRepository.findAll().size();
        // Create the Repo
        RepoDTO repoDTO = repoMapper.toDto(repo);
        restRepoMockMvc.perform(post("/api/repos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repoDTO)))
            .andExpect(status().isCreated());

        // Validate the Repo in the database
        List<Repo> repoList = repoRepository.findAll();
        assertThat(repoList).hasSize(databaseSizeBeforeCreate + 1);
        Repo testRepo = repoList.get(repoList.size() - 1);
        assertThat(testRepo.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testRepo.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testRepo.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    }

    @Test
    @Transactional
    public void createRepoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repoRepository.findAll().size();

        // Create the Repo with an existing ID
        repo.setId(1L);
        RepoDTO repoDTO = repoMapper.toDto(repo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepoMockMvc.perform(post("/api/repos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Repo in the database
        List<Repo> repoList = repoRepository.findAll();
        assertThat(repoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRepos() throws Exception {
        // Initialize the database
        repoRepository.saveAndFlush(repo);

        // Get all the repoList
        restRepoMockMvc.perform(get("/api/repos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repo.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)));
    }
    
    @Test
    @Transactional
    public void getRepo() throws Exception {
        // Initialize the database
        repoRepository.saveAndFlush(repo);

        // Get the repo
        restRepoMockMvc.perform(get("/api/repos/{id}", repo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(repo.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD));
    }
    @Test
    @Transactional
    public void getNonExistingRepo() throws Exception {
        // Get the repo
        restRepoMockMvc.perform(get("/api/repos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepo() throws Exception {
        // Initialize the database
        repoRepository.saveAndFlush(repo);

        int databaseSizeBeforeUpdate = repoRepository.findAll().size();

        // Update the repo
        Repo updatedRepo = repoRepository.findById(repo.getId()).get();
        // Disconnect from session so that the updates on updatedRepo are not directly saved in db
        em.detach(updatedRepo);
        updatedRepo
            .url(UPDATED_URL)
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD);
        RepoDTO repoDTO = repoMapper.toDto(updatedRepo);

        restRepoMockMvc.perform(put("/api/repos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repoDTO)))
            .andExpect(status().isOk());

        // Validate the Repo in the database
        List<Repo> repoList = repoRepository.findAll();
        assertThat(repoList).hasSize(databaseSizeBeforeUpdate);
        Repo testRepo = repoList.get(repoList.size() - 1);
        assertThat(testRepo.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testRepo.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testRepo.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingRepo() throws Exception {
        int databaseSizeBeforeUpdate = repoRepository.findAll().size();

        // Create the Repo
        RepoDTO repoDTO = repoMapper.toDto(repo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepoMockMvc.perform(put("/api/repos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Repo in the database
        List<Repo> repoList = repoRepository.findAll();
        assertThat(repoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepo() throws Exception {
        // Initialize the database
        repoRepository.saveAndFlush(repo);

        int databaseSizeBeforeDelete = repoRepository.findAll().size();

        // Delete the repo
        restRepoMockMvc.perform(delete("/api/repos/{id}", repo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Repo> repoList = repoRepository.findAll();
        assertThat(repoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
