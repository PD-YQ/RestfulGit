package com.pdyq.restfulgit.service;

import com.pdyq.restfulgit.service.dto.CommitDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.pdyq.restfulgit.domain.Commit}.
 */
public interface CommitService {

    /**
     * Save a commit.
     *
     * @param commitDTO the entity to save.
     * @return the persisted entity.
     */
    CommitDTO save(CommitDTO commitDTO);

    /**
     * Get all the commits.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CommitDTO> findAll(Pageable pageable);


    /**
     * Get the "id" commit.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CommitDTO> findOne(Long id);

    /**
     * Delete the "id" commit.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
