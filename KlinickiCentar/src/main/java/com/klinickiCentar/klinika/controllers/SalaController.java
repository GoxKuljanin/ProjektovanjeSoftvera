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
import com.klinickiCentar.klinika.models.Sala;
import com.klinickiCentar.klinika.models.Termin;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.services.SalaService;

@RestController
@CrossOrigin(origins = "*")
public class SalaController {
	
	@Autowired
	private SalaService salaService;
	
	@GetMapping(value = "sale")
	public ResponseEntity<List<Sala>> getSale() {
		List<Sala> listaSala = salaService.getSale();
		return new ResponseEntity<List<Sala>>(listaSala, HttpStatus.OK);
	}
	
	@PutMapping("/sala")
	@CrossOrigin
	public ResponseEntity<Sala> updateSala(@RequestBody Sala sala){
		salaService.updateSala(sala);
		return new ResponseEntity<Sala>(sala,HttpStatus.OK);
	}
	
	@PostMapping(value = "/sala")
	public ResponseEntity<Sala> addSala(@RequestBody Sala sala) {
		salaService.updateSala(sala);
		return new ResponseEntity<Sala>(sala,HttpStatus.OK);
	}
	
	@DeleteMapping(value = "sala/{id}")
	public ResponseEntity<Sala> getLekari(@PathVariable ("id") Long id) {
		salaService.deleteSala(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/getSaleByIdKlinike/{id}")
	@CrossOrigin
	public ResponseEntity<List<Sala>> getLekariByIdKlinike(@PathVariable ("id") Long id){
		List<Sala> sale = salaService.getSale();
		List<Sala> saleKlinike= new ArrayList<>();
		for(Sala s : sale) {
			if(s.getKlinika().getId() == id) {
				saleKlinike.add(s);
			}
		}
		return new ResponseEntity<List<Sala>>(saleKlinike,HttpStatus.OK);
	}
}
