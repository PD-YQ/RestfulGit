package com.pdyq.restfulgit.service;

import com.pdyq.restfulgit.domain.Repo;
import com.pdyq.restfulgit.repository.RepoRepository;
import com.pdyq.restfulgit.service.dto.RepoDTO;
import com.pdyq.restfulgit.service.mapper.RepoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Repo}.
 */
@Service
@Transactional
public class RepoService {

    private final Logger log = LoggerFactory.getLogger(RepoService.class);

    private final RepoRepository repoRepository;

    private final RepoMapper repoMapper;

    public RepoService(RepoRepository repoRepository, RepoMapper repoMapper) {
        this.repoRepository = repoRepository;
        this.repoMapper = repoMapper;
    }

    /**
     * Save a repo.
     *
     * @param repoDTO the entity to save.
     * @return the persisted entity.
     */
    public RepoDTO save(RepoDTO repoDTO) {
        log.debug("Request to save Repo : {}", repoDTO);
        Repo repo = repoMapper.toEntity(repoDTO);
        repo = repoRepository.save(repo);
        return repoMapper.toDto(repo);
    }

    /**
     * Get all the repos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<RepoDTO> findAll() {
        log.debug("Request to get all Repos");
        return repoRepository.findAll().stream()
            .map(repoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one repo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<RepoDTO> findOne(Long id) {
        log.debug("Request to get Repo : {}", id);
        return repoRepository.findById(id)
            .map(repoMapper::toDto);
    }

    /**
     * Delete the repo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Repo : {}", id);
        repoRepository.deleteById(id);
    }
}
