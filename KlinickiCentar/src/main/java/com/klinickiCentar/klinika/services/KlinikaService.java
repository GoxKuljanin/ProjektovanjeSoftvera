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
public class KlinikaService {

	@Autowired
	private KlinikaRepository klinikaRepository;
	
	public List<Klinika> getKlinike() {
		return klinikaRepository.findAll();
	}
	
	public Klinika updateKlinika(Klinika klinika) {
		klinikaRepository.save(klinika);
		return null;
	}
	
	public Klinika getKlinika(Long id) {
		return klinikaRepository.getOne(id);
	}
}
