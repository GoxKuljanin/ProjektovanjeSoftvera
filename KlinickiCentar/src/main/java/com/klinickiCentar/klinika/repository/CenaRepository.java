package com.klinickiCentar.klinika.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klinickiCentar.klinika.models.Cena;
import com.klinickiCentar.klinika.models.Klinika;

public interface CenaRepository extends JpaRepository<Cena, Long> {
	Collection <Cena> findByKlinika(Klinika klinika);
}
