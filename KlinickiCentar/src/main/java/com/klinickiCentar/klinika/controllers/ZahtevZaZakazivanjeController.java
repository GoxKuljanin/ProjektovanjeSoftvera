package com.klinickiCentar.klinika.controllers;

import java.security.Principal;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klinickiCentar.klinika.models.AdministratorKlinike;
import com.klinickiCentar.klinika.models.Klinika;
import com.klinickiCentar.klinika.models.Pregled;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.models.ZahtevZaZakazivanje;
import com.klinickiCentar.klinika.services.ZahtevZaZakazivanjeService;

@RestController
@CrossOrigin(origins = "*")
public class ZahtevZaZakazivanjeController {
	
	@Autowired
	private ZahtevZaZakazivanjeService service;
	
	//GetAll
	@GetMapping("/ZahteviZaZakazivanje")
	public ResponseEntity<List<ZahtevZaZakazivanje>> sviZahtevi(){
		List<ZahtevZaZakazivanje> zahtevi = service.getAll();
		return ( new ResponseEntity<>(zahtevi, HttpStatus.OK) );
	}

	@PostMapping("/ZahteviZaZakazivanje")
	@CrossOrigin
	public ResponseEntity<ZahtevZaZakazivanje> addPregled(@RequestBody ZahtevZaZakazivanje zahtev){
		System.out.print(zahtev.getDatum()+"CONTRLLER\n\n\n");
		service.create(zahtev);
		return new ResponseEntity<ZahtevZaZakazivanje>(zahtev,HttpStatus.OK);
	}
	//Remove
	@DeleteMapping("/ZahteviZaZakazivanje")
	public ResponseEntity<Void> deleteZahtev(@RequestParam ZahtevZaZakazivanje zahtev){
		service.remove(zahtev);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
