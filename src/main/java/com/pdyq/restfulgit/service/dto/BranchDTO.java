package com.pdyq.restfulgit.service.dto;

import java.io.Serializable;
import com.pdyq.restfulgit.domain.enumeration.BranchStatus;

/**
 * A DTO for the {@link com.pdyq.restfulgit.domain.Branch} entity.
 */
public class BranchDTO implements Serializable {
    
    private Long id;

    private String name;

    private BranchStatus status;


    private Long repoId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BranchStatus getStatus() {
        return status;
    }

    public void setStatus(BranchStatus status) {
        this.status = status;
    }

    public Long getRepoId() {
        return repoId;
    }

    public void setRepoId(Long repoId) {
        this.repoId = repoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BranchDTO)) {
            return false;
        }

        return id != null && id.equals(((BranchDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BranchDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", repoId=" + getRepoId() +
            "}";
    }
}
