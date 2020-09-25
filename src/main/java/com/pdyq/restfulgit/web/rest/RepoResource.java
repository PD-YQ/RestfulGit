package com.pdyq.restfulgit.web.rest;

import com.pdyq.restfulgit.service.RepoService;
import com.pdyq.restfulgit.web.rest.errors.BadRequestAlertException;
import com.pdyq.restfulgit.service.dto.RepoDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pdyq.restfulgit.domain.Repo}.
 */
@RestController
@RequestMapping("/api")
public class RepoResource {

    private final Logger log = LoggerFactory.getLogger(RepoResource.class);

    private static final String ENTITY_NAME = "repo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RepoService repoService;

    public RepoResource(RepoService repoService) {
        this.repoService = repoService;
    }

    /**
     * {@code POST  /repos} : Create a new repo.
     *
     * @param repoDTO the repoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new repoDTO, or with status {@code 400 (Bad Request)} if the repo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/repos")
    public ResponseEntity<RepoDTO> createRepo(@RequestBody RepoDTO repoDTO) throws URISyntaxException {
        log.debug("REST request to save Repo : {}", repoDTO);
        if (repoDTO.getId() != null) {
            throw new BadRequestAlertException("A new repo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RepoDTO result = repoService.save(repoDTO);
        return ResponseEntity.created(new URI("/api/repos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /repos} : Updates an existing repo.
     *
     * @param repoDTO the repoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated repoDTO,
     * or with status {@code 400 (Bad Request)} if the repoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the repoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/repos")
    public ResponseEntity<RepoDTO> updateRepo(@RequestBody RepoDTO repoDTO) throws URISyntaxException {
        log.debug("REST request to update Repo : {}", repoDTO);
        if (repoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RepoDTO result = repoService.save(repoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, repoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /repos} : get all the repos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of repos in body.
     */
    @GetMapping("/repos")
    public List<RepoDTO> getAllRepos() {
        log.debug("REST request to get all Repos");
        return repoService.findAll();
    }

    /**
     * {@code GET  /repos/:id} : get the "id" repo.
     *
     * @param id the id of the repoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the repoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/repos/{id}")
    public ResponseEntity<RepoDTO> getRepo(@PathVariable Long id) {
        log.debug("REST request to get Repo : {}", id);
        Optional<RepoDTO> repoDTO = repoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(repoDTO);
    }

    /**
     * {@code DELETE  /repos/:id} : delete the "id" repo.
     *
     * @param id the id of the repoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/repos/{id}")
    public ResponseEntity<Void> deleteRepo(@PathVariable Long id) {
        log.debug("REST request to delete Repo : {}", id);
        repoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
