package com.klinickiCentar.klinika.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klinickiCentar.klinika.models.TipPregleda;

public interface TipPregledaRepository extends JpaRepository<TipPregleda, Long> {

	TipPregleda findByNaziv(String naziv);
}
