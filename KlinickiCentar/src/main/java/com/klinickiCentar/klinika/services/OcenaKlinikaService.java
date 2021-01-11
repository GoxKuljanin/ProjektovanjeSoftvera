package com.klinickiCentar.klinika.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klinickiCentar.klinika.models.OcenaKlinika;
import com.klinickiCentar.klinika.repository.OcenaKlinikaRepository;

@Service
public class OcenaKlinikaService {

	@Autowired
	private OcenaKlinikaRepository ocenaKlinikaRepo;
	
	public List<OcenaKlinika> getAllOceneKlinika(){
		return ocenaKlinikaRepo.findAll();
	}
	
	public List<OcenaKlinika> findOceneKlinikaByKlinika(Long id){
		return ocenaKlinikaRepo.findByKlinikaId(id);
	}
	
	public OcenaKlinika saveOcenaKlinika(OcenaKlinika oc) {
		return ocenaKlinikaRepo.save(oc);
	}
}
