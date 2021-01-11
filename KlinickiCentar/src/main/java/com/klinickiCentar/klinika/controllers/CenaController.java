package com.klinickiCentar.klinika.controllers;

import java.util.ArrayList;
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
import com.klinickiCentar.klinika.services.CenaService;

@RestController
@CrossOrigin(origins = "*")
public class CenaController {
	
	@Autowired
	private CenaService cenaService;
	
	@GetMapping("/getCeneByIdKlinike/{id}")
	@CrossOrigin
	public ResponseEntity<Collection<Cena>> getCeneByIdKlinike(@PathVariable ("id") Long id){
		Collection<Cena> cene = cenaService.getCene();
		Collection<Cena> ceneKlinike= new ArrayList<>();
		for(Cena c : cene) {
			if(c.getKlinika().getId() == id) {
				ceneKlinike.add(c);
			}
		}
		return new ResponseEntity<Collection<Cena>>(ceneKlinike,HttpStatus.OK);
	}
}
