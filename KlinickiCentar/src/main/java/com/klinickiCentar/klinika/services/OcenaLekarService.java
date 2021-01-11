package com.klinickiCentar.klinika.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klinickiCentar.klinika.models.OcenaLekar;
import com.klinickiCentar.klinika.repository.OcenaLekaraRepository;

@Service
public class OcenaLekarService{

	@Autowired
	private OcenaLekaraRepository ocenaLekaraRepository;
	
	public List<OcenaLekar> getAllOcenaLekarForPacijent(Long id){
		return ocenaLekaraRepository.findAllOcenaLekarForPacijent(id);
	}
	
	public List<OcenaLekar> getAllOcene(){
		return ocenaLekaraRepository.findAll();
	}
	
	public List<OcenaLekar> findOceneByLekar(Long id){
		return ocenaLekaraRepository.findByLekarId(id);
	}
	
	public OcenaLekar saveOcenaLekar(OcenaLekar ol) {
		return ocenaLekaraRepository.save(ol);
	}
}
