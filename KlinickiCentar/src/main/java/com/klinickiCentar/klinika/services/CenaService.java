package com.klinickiCentar.klinika.services;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klinickiCentar.klinika.models.Cena;
import com.klinickiCentar.klinika.models.Klinika;
import com.klinickiCentar.klinika.models.Lekar;
import com.klinickiCentar.klinika.models.Sala;
import com.klinickiCentar.klinika.models.Termin;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.repository.CenaRepository;
import com.klinickiCentar.klinika.repository.LekarRepository;
import com.klinickiCentar.klinika.repository.SalaRepository;
import com.klinickiCentar.klinika.repository.TerminRepository;
import com.klinickiCentar.klinika.repository.KlinikaRepository;

@Service
public class CenaService {

	@Autowired
	private KlinikaRepository klinikaRepository;
	
	@Autowired
	private CenaRepository cenaRepository;
	@Autowired
	private LekarRepository lekarRepository;
	@Autowired
	private SalaRepository salaRepository;
	
	public Cena saveCena(Cena cena) {
		cenaRepository.save(cena);
		return null;
	}
	
	public Cena getCenaById(Long id) {
		return cenaRepository.getOne(id);
	}
	
	public Collection<Cena> getCene() {
		Collection<Cena> cene= cenaRepository.findAll();
		return cene;
	}
	
	public Collection<Lekar> getLekari(Long id) {
		
		Collection<Lekar> lekari= lekarRepository.findAll();
		lekari.removeIf((Lekar c) -> c.getKlinika().getId()!=id);
		return lekari;
	}
}
