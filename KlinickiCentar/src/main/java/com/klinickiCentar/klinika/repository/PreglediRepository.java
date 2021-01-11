package com.klinickiCentar.klinika.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.klinickiCentar.klinika.models.Klinika;
import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.models.Pregled;

public interface PreglediRepository extends JpaRepository<Pregled, Long>{
	@Query("SELECT p.pacijent FROM Pregled p WHERE p.id = ?1")
	Pacijent findPacijentByPregledId(Long id);
	@Query("SELECT p.klinika FROM Pregled p WHERE p.id = ?1")
	Klinika findKlinikaByPregledId(Long id);
	
	Pregled findOneById(Long id);
	List<Pregled> findByPacijentId(Long id);
	List<Pregled> findByKlinikaId(Long id);
	List<Pregled> findByLekarId(Long id);
 	//List<Pregled> findByDatum(String datum);
	
	@Query("select distinct l.id from Lekar l, Pregled p where l.id = p.lekar and p.id in  (select p.id from Pregled p, Termin t where p.termin = t.id and t.id=?1 and p.id in (select p.id from Pregled p, TipPregleda tp where p.tippregleda = tp.id and tp.naziv = ?2))")      
	List<Long> getLekariPregledZaTermin(Long id, String naziv);
	
	@Query("select p from Pacijent p, Pregled pp where pp.pacijent = p.id and pp.id = ?1")
	List<Pacijent> getPac(Long id);
}
