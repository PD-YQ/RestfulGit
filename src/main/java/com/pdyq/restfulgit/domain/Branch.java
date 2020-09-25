package com.pdyq.restfulgit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.pdyq.restfulgit.domain.enumeration.BranchStatus;

/**
 * A Branch.
 */
@Entity
@Table(name = "branch")
public class Branch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private BranchStatus status;

    @OneToMany(mappedBy = "branch")
    private Set<Commit> commits = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "branches", allowSetters = true)
    private Repo repo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Branch name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BranchStatus getStatus() {
        return status;
    }

    public Branch status(BranchStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(BranchStatus status) {
        this.status = status;
    }

    public Set<Commit> getCommits() {
        return commits;
    }

    public Branch commits(Set<Commit> commits) {
        this.commits = commits;
        return this;
    }

    public Branch addCommit(Commit commit) {
        this.commits.add(commit);
        commit.setBranch(this);
        return this;
    }

    public Branch removeCommit(Commit commit) {
        this.commits.remove(commit);
        commit.setBranch(null);
        return this;
    }

    public void setCommits(Set<Commit> commits) {
        this.commits = commits;
    }

    public Repo getRepo() {
        return repo;
    }

    public Branch repo(Repo repo) {
        this.repo = repo;
        return this;
    }

    public void setRepo(Repo repo) {
        this.repo = repo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Branch)) {
            return false;
        }
        return id != null && id.equals(((Branch) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Branch{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
