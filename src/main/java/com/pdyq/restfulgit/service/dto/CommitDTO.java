package com.pdyq.restfulgit.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.pdyq.restfulgit.domain.Commit} entity.
 */
public class CommitDTO implements Serializable {
    
    private Long id;


    private Long tagId;

    private Long branchId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }

    public Long getBranchId() {
        return branchId;
    }

    public void setBranchId(Long branchId) {
        this.branchId = branchId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CommitDTO)) {
            return false;
        }

        return id != null && id.equals(((CommitDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommitDTO{" +
            "id=" + getId() +
            ", tagId=" + getTagId() +
            ", branchId=" + getBranchId() +
            "}";
    }
}
