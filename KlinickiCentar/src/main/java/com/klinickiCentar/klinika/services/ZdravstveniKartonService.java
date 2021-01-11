package com.klinickiCentar.klinika.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klinickiCentar.klinika.models.Izvestaj;
import com.klinickiCentar.klinika.models.ZdravstveniKarton;
import com.klinickiCentar.klinika.repository.IzvestajRepository;
import com.klinickiCentar.klinika.repository.ZdravstveniKartonRepository;

@Service
public class ZdravstveniKartonService {
	
	@Autowired
	private ZdravstveniKartonRepository zdravstveniKartonRepository;
	
	@Autowired
	private IzvestajRepository izvestajRepository;
	
	public List<ZdravstveniKarton> getAllZdravstveniKarton(){
		return zdravstveniKartonRepository.findAll();
	}
	
	public ZdravstveniKarton findZdravstveniKartonByPacijent(Long id) {
		return zdravstveniKartonRepository.findByPacijentId(id);
	}
	
	public ZdravstveniKarton save(ZdravstveniKarton s) {
		return zdravstveniKartonRepository.save(s);
	}
	
	
	
	
	
	//Proba za dobavljanje kartona po nekim referencama koje se nalaze u modelu (radi!)
//	public List<ZdravstveniKarton> getPacijentZdravstveniKarton(Long id){
//		return zdravstveniKartonRepository.findByPregledId(id);
//	}
	public Izvestaj getIzvestaj() {
		Izvestaj iz = izvestajRepository.findOneByZdravstveniKartonId(1L);
		return iz;
	}
}
