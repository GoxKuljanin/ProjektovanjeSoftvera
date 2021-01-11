package com.klinickiCentar.klinika.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klinickiCentar.klinika.models.ZdravstveniKarton;

public interface ZdravstveniKartonRepository extends JpaRepository<ZdravstveniKarton, Long>{

	
	//List<ZdravstveniKarton> findByPregledId(Long id);
	ZdravstveniKarton findByPacijentId(Long id);
}
