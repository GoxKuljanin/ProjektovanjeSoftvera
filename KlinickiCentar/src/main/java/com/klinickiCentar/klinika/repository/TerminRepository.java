package com.klinickiCentar.klinika.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klinickiCentar.klinika.models.Termin;

public interface TerminRepository extends JpaRepository<Termin, Long> {
	
	Termin findByDatum(String date);
}
