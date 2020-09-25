package com.pdyq.restfulgit.service.mapper;


import com.pdyq.restfulgit.domain.*;
import com.pdyq.restfulgit.service.dto.CommitDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Commit} and its DTO {@link CommitDTO}.
 */
@Mapper(componentModel = "spring", uses = {TagMapper.class, BranchMapper.class})
public interface CommitMapper extends EntityMapper<CommitDTO, Commit> {

    @Mapping(source = "tag.id", target = "tagId")
    @Mapping(source = "branch.id", target = "branchId")
    CommitDTO toDto(Commit commit);

    @Mapping(source = "tagId", target = "tag")
    @Mapping(source = "branchId", target = "branch")
    Commit toEntity(CommitDTO commitDTO);

    default Commit fromId(Long id) {
        if (id == null) {
            return null;
        }
        Commit commit = new Commit();
        commit.setId(id);
        return commit;
    }
}
