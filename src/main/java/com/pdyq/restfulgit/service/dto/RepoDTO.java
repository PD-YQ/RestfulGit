package com.pdyq.restfulgit.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.pdyq.restfulgit.domain.Repo} entity.
 */
public class RepoDTO implements Serializable {
    
    private Long id;

    private String url;

    private String username;

    private String password;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RepoDTO)) {
            return false;
        }

        return id != null && id.equals(((RepoDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RepoDTO{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
