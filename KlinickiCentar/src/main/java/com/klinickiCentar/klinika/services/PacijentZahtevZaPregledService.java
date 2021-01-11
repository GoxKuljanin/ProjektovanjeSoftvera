package com.klinickiCentar.klinika.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klinickiCentar.klinika.models.Lekar;
import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.models.PacijentZahtevZaPregled;
import com.klinickiCentar.klinika.models.Termin;
import com.klinickiCentar.klinika.repository.PacijentZahtevZaPregledRepository;
import com.klinickiCentar.klinika.repository.TerminRepository;

@Service
public class PacijentZahtevZaPregledService {

	@Autowired
	private PacijentZahtevZaPregledRepository prz;
	
	@Autowired
	private TerminRepository terminRepo;
	public PacijentZahtevZaPregled zakaziPregled(String datum, Pacijent p, Lekar l) {
		Termin t = terminRepo.findByDatum(datum);
		PacijentZahtevZaPregled pzp = new PacijentZahtevZaPregled(p, l, t);
		
		return prz.save(pzp);
	}
}
