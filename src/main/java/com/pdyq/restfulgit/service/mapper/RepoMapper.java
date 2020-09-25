package com.pdyq.restfulgit.service.mapper;


import com.pdyq.restfulgit.domain.*;
import com.pdyq.restfulgit.service.dto.RepoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Repo} and its DTO {@link RepoDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RepoMapper extends EntityMapper<RepoDTO, Repo> {


    @Mapping(target = "branches", ignore = true)
    @Mapping(target = "removeBranch", ignore = true)
    Repo toEntity(RepoDTO repoDTO);

    default Repo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Repo repo = new Repo();
        repo.setId(id);
        return repo;
    }
}
