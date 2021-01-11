package com.klinickiCentar.klinika.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.models.User;

public interface PacijentRepository extends JpaRepository<Pacijent, Long> {


	//Pacijent findOneByEmail(String email);
	
	Pacijent findOneByUserId(Long id);
	
}
