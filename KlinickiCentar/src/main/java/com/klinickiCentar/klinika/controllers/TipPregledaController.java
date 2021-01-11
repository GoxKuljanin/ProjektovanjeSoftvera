package com.klinickiCentar.klinika.controllers;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.klinickiCentar.klinika.models.Cena;
import com.klinickiCentar.klinika.models.Klinika;
import com.klinickiCentar.klinika.models.Lekar;
import com.klinickiCentar.klinika.models.TipPregleda;
import com.klinickiCentar.klinika.models.Termin;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.services.TipPregledaService;

@RestController
@CrossOrigin(origins = "*")
public class TipPregledaController {
	
	@Autowired
	private TipPregledaService tipPregledaService;
	
	@GetMapping(value = "tipoviPregleda")
	public ResponseEntity<List<TipPregleda>> getTipoviPregleda() {
		List<TipPregleda> tipoviPregleda = tipPregledaService.getTipoviPregleda();
		return new ResponseEntity<List<TipPregleda>>(tipoviPregleda, HttpStatus.OK);
	}
	
	@PutMapping("/tipPregleda")
	@CrossOrigin
	public ResponseEntity<TipPregleda> updateTipPregleda(@RequestBody TipPregleda tipPregleda){
		tipPregledaService.updateTipPregleda(tipPregleda);
		return new ResponseEntity<TipPregleda>(tipPregleda,HttpStatus.OK);
	}
	
	@PostMapping(value = "/tipPregleda")
	public ResponseEntity<TipPregleda> addTipPregleda(@RequestBody TipPregleda tipPregleda) {
		tipPregledaService.updateTipPregleda(tipPregleda);
		return new ResponseEntity<TipPregleda>(tipPregleda,HttpStatus.OK);
	}
	
	@DeleteMapping(value = "tipPregleda/{id}")
	public ResponseEntity<TipPregleda> deleteTipPregleda(@PathVariable ("id") Long id) {
		tipPregledaService.deleteTipPregleda(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/getTipoviPregledaByIdKlinike/{id}")
	@CrossOrigin
	public ResponseEntity<Collection<TipPregleda>> getTipoviPregledaByIdKlinike(@PathVariable ("id") Long id){
		Collection<TipPregleda> tipoviPregleda = tipPregledaService.getTipoviPregleda();
		Collection<TipPregleda> tipoviPregledaKlinike= new ArrayList<>();
		for(TipPregleda t : tipoviPregleda) {
			if(t.getKlinika().getId() == id) {
				tipoviPregledaKlinike.add(t);
			}
		}
		return new ResponseEntity<Collection<TipPregleda>>(tipoviPregledaKlinike,HttpStatus.OK);
	}
}
