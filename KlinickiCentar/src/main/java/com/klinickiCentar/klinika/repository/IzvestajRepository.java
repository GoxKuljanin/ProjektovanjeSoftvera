package com.klinickiCentar.klinika.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klinickiCentar.klinika.models.Izvestaj;

public interface IzvestajRepository extends JpaRepository<Izvestaj, Long>{

	public Izvestaj findOneByZdravstveniKartonId(Long id);
}
