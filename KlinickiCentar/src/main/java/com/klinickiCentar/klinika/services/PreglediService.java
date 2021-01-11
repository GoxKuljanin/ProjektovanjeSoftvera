package com.klinickiCentar.klinika.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klinickiCentar.klinika.models.Klinika;
import com.klinickiCentar.klinika.models.Lekar;
import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.models.Pregled;
import com.klinickiCentar.klinika.models.Termin;
import com.klinickiCentar.klinika.repository.PreglediRepository;
import com.klinickiCentar.klinika.repository.TerminRepository;

@Service
public class PreglediService {

	@Autowired
	private PreglediRepository preglediRepository;
	
	@Autowired
	private TerminRepository terminRepository;
	
	public Pregled save(Pregled p) {
		return preglediRepository.save(p);
	}
	public Pregled saveZahtevZakazivanja(Pregled p) {
		return preglediRepository.save(p);
	}
	
	public List<Pregled> getAllPregledi(){
		return preglediRepository.findAll();
	}
	
//	public List<Pregled> getPreglediByDatum(String datum){
//		return preglediRepository.findByDatum(datum);
//	}
	
	public Pregled getById(Long id) {
		return preglediRepository.findOneById(id);
	}
	
	public List<Pregled> getByPacijentId(Long id){
		return preglediRepository.findByPacijentId(id);
	}
	
	public Termin findTerminByDatum(String date) {
		Termin t = terminRepository.findByDatum(date);
		if( t == null ) {
			return null;
		}else {
			return t;
		}
	}
	public List<Termin> findAllTermin(String date){
		return terminRepository.findAll();
	}
	
	public List<Pregled> findByKlinikaId(Long id){
		return preglediRepository.findByKlinikaId(id);
	}
	public List<Pregled> findByLekadId(Long id){
		return preglediRepository.findByLekarId(id);
	}
	
	public List<Long> findLekarPregledZaDatum(Long id, String naziv){
		return preglediRepository.getLekariPregledZaTermin(id, naziv);
	}
	
	public Pregled zakazi(Pacijent p, Long id) {
		Pregled preg = preglediRepository.findOneById(id);
		preg.setPacijent(p);
		return preglediRepository.save(preg);
	}
	public List<Pacijent> getPac(){
		return preglediRepository.getPac(1L);
	}
	
	public Termin saveTermin(Termin termin) {
		Termin ter = new Termin();
		ter.setDatum(termin.getDatum());
		ter.setVreme(termin.getVreme());
		
		Termin t = terminRepository.saveAndFlush(ter);
		return t;
	}
	
	public void savePregled(Pregled pregled) {
		Pregled p = new Pregled();
		p.setKlinika(pregled.getKlinika());    //gelekar>getklinika?
		p.setCena(pregled.getCena());
		p.setSala(pregled.getSala());
		p.setLekar(pregled.getLekar());
		p.setTermin(pregled.getTermin());
		p.setTrajanje(pregled.getTrajanje());
		p.setTippregleda(pregled.getTippregleda());
		preglediRepository.save(p);
	}
	
	public void savePregledLekar(Pregled pregled) {
		Pregled p = new Pregled();
		p.setCena(pregled.getCena());
		p.setKlinika(pregled.getLekar().getKlinika());
		p.setLekar(pregled.getLekar());
		p.setTermin(pregled.getTermin());
		p.setTrajanje(pregled.getTrajanje());
		p.setPacijent(pregled.getPacijent());
		p.setTippregleda(pregled.getTippregleda());
		preglediRepository.save(p);
	}
	public Pacijent findPacijentByPregledId(Long id) {
		return preglediRepository.findPacijentByPregledId(id);
	}
	
	public Klinika findKlinikaByPregledId(Long id) {
		return preglediRepository.findKlinikaByPregledId(id);
	}
}
