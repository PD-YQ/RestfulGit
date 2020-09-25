package com.pdyq.restfulgit.service.impl;

import com.pdyq.restfulgit.domain.Tag;
import com.pdyq.restfulgit.repository.TagRepository;
import com.pdyq.restfulgit.service.TagService;
import com.pdyq.restfulgit.service.dto.TagDTO;
import com.pdyq.restfulgit.service.mapper.TagMapper;
import java.io.File;
import java.util.Optional;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.TagCommand;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Tag}.
 */
@Service
@Transactional
public class TagServiceImpl implements TagService {
    private final Logger log = LoggerFactory.getLogger(TagServiceImpl.class);

    private final TagRepository tagRepository;

    private final TagMapper tagMapper;

    private Git git;

    public TagServiceImpl(TagRepository tagRepository, TagMapper tagMapper) throws GitAPIException {
        this.tagRepository = tagRepository;
        this.tagMapper = tagMapper;
        if (null == git) {
            git =
                Git
                    .cloneRepository()
                    .setURI("https://github.com/zhangyuanqiao/test.git")
                    .setCredentialsProvider(new UsernamePasswordCredentialsProvider("zhangyuanqiao", "Yourbaba2020"))
                    .setDirectory(new File("./localRepo"))
                    .call();
        }
    }

    @Override
    public void addTag(String tagName) throws GitAPIException {
        TagDTO dto = new TagDTO();
        git.tag().setName(tagName).call();
    }

    @Override
    public TagDTO save(TagDTO tagDTO) {
        log.debug("Request to save Tag : {}", tagDTO);
        Tag tag = tagMapper.toEntity(tagDTO);
        tag = tagRepository.save(tag);
        return tagMapper.toDto(tag);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TagDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Tags");
        return tagRepository.findAll(pageable).map(tagMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TagDTO> findOne(Long id) {
        log.debug("Request to get Tag : {}", id);
        return tagRepository.findById(id).map(tagMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tag : {}", id);
        tagRepository.deleteById(id);
    }
}
