package com.pdyq.restfulgit.web.rest;

import com.pdyq.restfulgit.service.CommitService;
import com.pdyq.restfulgit.web.rest.errors.BadRequestAlertException;
import com.pdyq.restfulgit.service.dto.CommitDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pdyq.restfulgit.domain.Commit}.
 */
@RestController
@RequestMapping("/api")
public class CommitResource {

    private final Logger log = LoggerFactory.getLogger(CommitResource.class);

    private static final String ENTITY_NAME = "commit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommitService commitService;

    public CommitResource(CommitService commitService) {
        this.commitService = commitService;
    }

    /**
     * {@code POST  /commits} : Create a new commit.
     *
     * @param commitDTO the commitDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commitDTO, or with status {@code 400 (Bad Request)} if the commit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commits")
    public ResponseEntity<CommitDTO> createCommit(@RequestBody CommitDTO commitDTO) throws URISyntaxException {
        log.debug("REST request to save Commit : {}", commitDTO);
        if (commitDTO.getId() != null) {
            throw new BadRequestAlertException("A new commit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CommitDTO result = commitService.save(commitDTO);
        return ResponseEntity.created(new URI("/api/commits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commits} : Updates an existing commit.
     *
     * @param commitDTO the commitDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commitDTO,
     * or with status {@code 400 (Bad Request)} if the commitDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commitDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commits")
    public ResponseEntity<CommitDTO> updateCommit(@RequestBody CommitDTO commitDTO) throws URISyntaxException {
        log.debug("REST request to update Commit : {}", commitDTO);
        if (commitDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CommitDTO result = commitService.save(commitDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, commitDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /commits} : get all the commits.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commits in body.
     */
    @GetMapping("/commits")
    public ResponseEntity<List<CommitDTO>> getAllCommits(Pageable pageable) {
        log.debug("REST request to get a page of Commits");
        Page<CommitDTO> page = commitService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /commits/:id} : get the "id" commit.
     *
     * @param id the id of the commitDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commitDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commits/{id}")
    public ResponseEntity<CommitDTO> getCommit(@PathVariable Long id) {
        log.debug("REST request to get Commit : {}", id);
        Optional<CommitDTO> commitDTO = commitService.findOne(id);
        return ResponseUtil.wrapOrNotFound(commitDTO);
    }

    /**
     * {@code DELETE  /commits/:id} : delete the "id" commit.
     *
     * @param id the id of the commitDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commits/{id}")
    public ResponseEntity<Void> deleteCommit(@PathVariable Long id) {
        log.debug("REST request to delete Commit : {}", id);
        commitService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
