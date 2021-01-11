package com.klinickiCentar.klinika.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klinickiCentar.klinika.models.OcenaKlinika;

public interface OcenaKlinikaRepository extends JpaRepository<OcenaKlinika, Long>{

	List<OcenaKlinika> findByKlinikaId(Long id);
}
