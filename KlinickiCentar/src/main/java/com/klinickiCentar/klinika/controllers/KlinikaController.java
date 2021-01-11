package com.klinickiCentar.klinika.controllers;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.klinickiCentar.klinika.models.Cena;
import com.klinickiCentar.klinika.models.Klinika;
import com.klinickiCentar.klinika.models.Lekar;
import com.klinickiCentar.klinika.models.Sala;
import com.klinickiCentar.klinika.models.Termin;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.services.KlinikaService;

@RestController
@CrossOrigin(origins = "*")
public class KlinikaController {
	
	@Autowired
	private KlinikaService klinikaService;
	
	@GetMapping(value = "klinike")
	public ResponseEntity<List<Klinika>> getKlinike() {
		List<Klinika> listaKlinika = klinikaService.getKlinike();
		return new ResponseEntity<List<Klinika>>(listaKlinika, HttpStatus.OK);
	}
	
	@PutMapping("/klinika")
	@CrossOrigin
	public ResponseEntity<Klinika> updateKlinika(@RequestBody Klinika klinika){
		klinikaService.updateKlinika(klinika);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
