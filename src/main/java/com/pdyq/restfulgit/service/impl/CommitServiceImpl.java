package com.pdyq.restfulgit.service.impl;

import com.pdyq.restfulgit.service.CommitService;
import com.pdyq.restfulgit.domain.Commit;
import com.pdyq.restfulgit.repository.CommitRepository;
import com.pdyq.restfulgit.service.dto.CommitDTO;
import com.pdyq.restfulgit.service.mapper.CommitMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Commit}.
 */
@Service
@Transactional
public class CommitServiceImpl implements CommitService {

    private final Logger log = LoggerFactory.getLogger(CommitServiceImpl.class);

    private final CommitRepository commitRepository;

    private final CommitMapper commitMapper;

    public CommitServiceImpl(CommitRepository commitRepository, CommitMapper commitMapper) {
        this.commitRepository = commitRepository;
        this.commitMapper = commitMapper;
    }

    @Override
    public CommitDTO save(CommitDTO commitDTO) {
        log.debug("Request to save Commit : {}", commitDTO);
        Commit commit = commitMapper.toEntity(commitDTO);
        commit = commitRepository.save(commit);
        return commitMapper.toDto(commit);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CommitDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Commits");
        return commitRepository.findAll(pageable)
            .map(commitMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<CommitDTO> findOne(Long id) {
        log.debug("Request to get Commit : {}", id);
        return commitRepository.findById(id)
            .map(commitMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Commit : {}", id);
        commitRepository.deleteById(id);
    }
}
