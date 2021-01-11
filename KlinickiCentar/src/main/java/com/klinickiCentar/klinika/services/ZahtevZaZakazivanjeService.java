package com.klinickiCentar.klinika.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klinickiCentar.klinika.models.Pregled;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.models.ZahtevZaZakazivanje;
import com.klinickiCentar.klinika.repository.ZahtevZaZakazivanjeRepository;

@Service
public class ZahtevZaZakazivanjeService {
	
	@Autowired
	private ZahtevZaZakazivanjeRepository repo;
	
	public List<ZahtevZaZakazivanje> getAll() {
		return repo.findAll();
	}
	
	public ZahtevZaZakazivanje create(ZahtevZaZakazivanje zahtev) {

		System.out.print(zahtev.getDatum()+"SERVICE\n\n\n");
		/*ZahtevZaZakazivanje p = new ZahtevZaZakazivanje();
		p.setKlinika(zahtev.getKlinika());
		p.setCena(zahtev.getCena());
		p.setLekar(zahtev.getLekar());
		p.setPacijent(zahtev.getPacijent());
		p.setTrajanje(zahtev.getTrajanje());
		p.setTippregleda(zahtev.getTippregleda());
		p.setDatum(zahtev.getDatum());
		p.setVreme(zahtev.getVreme());
		return repo.save(zahtev);*/
		return null;
	}
	public void remove(ZahtevZaZakazivanje zahtev) {
		repo.delete(zahtev);
	}
}
