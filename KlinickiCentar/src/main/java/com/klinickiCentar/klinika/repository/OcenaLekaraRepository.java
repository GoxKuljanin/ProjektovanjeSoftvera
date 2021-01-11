package com.klinickiCentar.klinika.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.klinickiCentar.klinika.models.OcenaLekar;

public interface OcenaLekaraRepository extends JpaRepository<OcenaLekar, Long>{

	@Query("select ol from OcenaLekar ol where ol.lekar in (select l.id from Lekar l, Pregled p where p.lekar = l.id and p.id in (select p.id from Izvestaj i, Pregled p where i.pregled = p.id and i.zdravstveniKarton = (select z.id from Pacijent p, ZdravstveniKarton z where p.zdravstveniKarton = z.id and p.id = ?1)))")
	List<OcenaLekar> findAllOcenaLekarForPacijent(Long id);

	List<OcenaLekar> findByLekarId(Long id);
}
