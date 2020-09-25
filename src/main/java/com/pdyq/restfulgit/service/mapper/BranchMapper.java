package com.pdyq.restfulgit.service.mapper;


import com.pdyq.restfulgit.domain.*;
import com.pdyq.restfulgit.service.dto.BranchDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Branch} and its DTO {@link BranchDTO}.
 */
@Mapper(componentModel = "spring", uses = {RepoMapper.class})
public interface BranchMapper extends EntityMapper<BranchDTO, Branch> {

    @Mapping(source = "repo.id", target = "repoId")
    BranchDTO toDto(Branch branch);

    @Mapping(target = "commits", ignore = true)
    @Mapping(target = "removeCommit", ignore = true)
    @Mapping(source = "repoId", target = "repo")
    Branch toEntity(BranchDTO branchDTO);

    default Branch fromId(Long id) {
        if (id == null) {
            return null;
        }
        Branch branch = new Branch();
        branch.setId(id);
        return branch;
    }
}
