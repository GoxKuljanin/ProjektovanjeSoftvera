package com.klinickiCentar.klinika.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klinickiCentar.klinika.models.TipPregleda;
import com.klinickiCentar.klinika.repository.TipPregledaRepository;

@Service
public class TipPregledaService {
	@Autowired
	private TipPregledaRepository tipPregledaRepository;
	
	public List<TipPregleda> getTipoviPregleda() {
		return tipPregledaRepository.findAll();
	}
	
	public void updateTipPregleda(TipPregleda tipPregleda) {
		tipPregledaRepository.save(tipPregleda);
	}
	
	public void deleteTipPregleda(Long id) {
		tipPregledaRepository.deleteById(id);
	}
	
	public TipPregleda findByNaziv(String naziv){
		return tipPregledaRepository.findByNaziv(naziv);
	}
}