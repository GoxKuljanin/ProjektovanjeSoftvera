package com.klinickiCentar.klinika.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klinickiCentar.klinika.models.Sala;
import com.klinickiCentar.klinika.repository.SalaRepository;

@Service
public class SalaService {
	@Autowired
	private SalaRepository salaRepository;
	
	public List<Sala> getSale() {
		return salaRepository.findAll();
	}
	
	public void updateSala(Sala sala) {
		salaRepository.save(sala);
	}
	
	public void deleteSala(Long id) {
		salaRepository.deleteById(id);
	}
}
