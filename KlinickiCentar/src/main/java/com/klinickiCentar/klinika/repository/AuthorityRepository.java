package com.klinickiCentar.klinika.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klinickiCentar.klinika.models.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Long>{
	
	Authority findByName(String name);

}
