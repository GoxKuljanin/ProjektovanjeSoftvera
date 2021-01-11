package com.klinickiCentar.klinika.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.repository.PacijentRepository;

@Service
public class PacijentService {

	@Autowired
	private PacijentRepository pacijentRepository;
	
	public Pacijent dodajPacijentaUBazu(Pacijent pa) {
		//Pacijent pa = pacijentRepository.findOneByEmail(email);
		//if( pa == null ) {
			pa = pacijentRepository.save(pa);
			return pa;
		//}
		//return null;
	}
	
	public List<Pacijent> dobaviSvePacijente(){
		return pacijentRepository.findAll();
	}
	public void deletePacijent(Pacijent p) {
		pacijentRepository.delete(p);
	}
	
	public Pacijent getPacijent(Long id) {
		return pacijentRepository.getOne(id);
	}
	
	public Pacijent getPacijentByUser(Long id) {
		return pacijentRepository.findOneByUserId(id);
	}
}
