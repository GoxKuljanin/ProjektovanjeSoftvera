package com.klinickiCentar.klinika.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klinickiCentar.klinika.models.User;

public interface UserRepository extends JpaRepository<User, Long>{

	//User findByEmailAndPasswordAllIgnoringCase(String email, String password);
	//User findOneByEmail(String email);
	List<User> findAllByUloga(String uloga);
	
	User findByUsername(String username);	
}
