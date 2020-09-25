package com.pdyq.restfulgit.repository;

import com.pdyq.restfulgit.domain.Repo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Repo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepoRepository extends JpaRepository<Repo, Long> {
}
