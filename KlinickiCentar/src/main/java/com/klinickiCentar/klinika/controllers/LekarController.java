package com.klinickiCentar.klinika.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klinickiCentar.klinika.models.AdministratorKlinike;
import com.klinickiCentar.klinika.models.Klinika;
import com.klinickiCentar.klinika.models.Lekar;
import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.models.Pregled;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.services.LekarService;
import com.klinickiCentar.klinika.services.PacijentService;
import com.klinickiCentar.klinika.services.PreglediService;
import com.klinickiCentar.klinika.services.UserService;

@RestController
@CrossOrigin(origins = "*")
public class LekarController {
	
	@Autowired
	private LekarService lekarService;
	
	@Autowired
	private PreglediService pregledService;

	@Autowired
	private UserService userService;
	
	@Autowired
	private PacijentService pacijentService;
	
	@GetMapping(value = "lekari")
	public ResponseEntity<List<Lekar>> getLekari() {
		List<Lekar> listaLekara = lekarService.getLekari();
		return new ResponseEntity<List<Lekar>>(listaLekara, HttpStatus.OK);
	}
	
	@GetMapping(value = "/lekar/{id}/pregledaniPacijenti")
	@CrossOrigin
	public ResponseEntity<List<Pacijent>> getPregledaniPacijentiByLekarId(@PathVariable ("id") Long id) {
		List<Pregled> sviPregledi = pregledService.getAllPregledi();
		List<Pacijent> pregledaniPacijenti = new ArrayList<Pacijent>();
//		System.out.print(sviPregledi.size()+"\n\n\n");
//		for(Pregled p : sviPregledi) {
//			if(p.getPacijent()!=null && p.getSala()!=null && p.getLekar().getId()==id)
//				pregledaniPacijenti.add(p.getPacijent());
//		}
		for(int i = 0 ; i<sviPregledi.size();i++){
			if(sviPregledi.get(i).getLekar().getId() == id) {
				if(!pregledaniPacijenti.contains(sviPregledi.get(i).getPacijent()) && sviPregledi.get(i).getPacijent()!=null)
					pregledaniPacijenti.add(sviPregledi.get(i).getPacijent());
			}
		};
		return new ResponseEntity<List<Pacijent>>(pregledaniPacijenti, HttpStatus.OK);
	}
	
	@GetMapping("/getLekarData")
	@CrossOrigin
	public Lekar getLekara(Principal principal) {
		
		List<Lekar> lekari = lekarService.getLekari();
		User u = userService.findByUsername(principal.getName());
		
		for(Lekar l : lekari) {
			if( l.getUser().getUsername().equals(u.getUsername()) ) {
				return l;
			}
		}
		Lekar l = null;
		return l;
	}
	
	@GetMapping("/lekar/{id}")
	@CrossOrigin
	public ResponseEntity<Lekar> getLekar(@PathVariable ("id") Long id) {
		Lekar lekar = lekarService.getLekar(id);
		return new ResponseEntity<Lekar>(lekar, HttpStatus.OK);
	}
	
	@PostMapping(value = "/lekar")
	@CrossOrigin
	public ResponseEntity<Lekar> addLekar(@RequestBody Lekar lekar){
		lekarService.addLekar(lekar);
		return new ResponseEntity<>(lekar, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/lekar/{id}")
	@CrossOrigin
	public ResponseEntity<Lekar> deleteLekar(@PathVariable ("id") Long id){
		Lekar res=lekarService.deleteLekar(id);
		if(res!=null)
			return new ResponseEntity<Lekar>(res, HttpStatus.OK);
		else
			return null;
	}
	
	@PutMapping("/lekar")
	@CrossOrigin
	public ResponseEntity<Lekar> updateLekar(@RequestBody Lekar lekar){
		lekarService.updateLekar(lekar);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping("/updateUseraLekara")
	@CrossOrigin
	public ResponseEntity<User> updateuseraLekara(@RequestBody User user){
		lekarService.updateUseraAdminaKlinike(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/getPacijentiLekara")
	@CrossOrigin
	public ResponseEntity<List<Pacijent>> getPacijente() {
		List<Pacijent> pacijenti = pacijentService.dobaviSvePacijente();
		
		return new ResponseEntity<List<Pacijent>>(pacijenti, HttpStatus.OK);
	}
	
	@GetMapping("/getLekariByIdKlinike/{id}")
	@CrossOrigin
	public ResponseEntity<List<Lekar>> getLekariByIdKlinike(@PathVariable ("id") Long id){
		List<Lekar> lekari = lekarService.getLekari();
		List<Lekar> lekariKlinike= new ArrayList<>();
		for(Lekar l : lekari) {
			if(l.getKlinika().getId() == id) {
				lekariKlinike.add(l);
			}
		}
		return new ResponseEntity<List<Lekar>>(lekariKlinike,HttpStatus.OK);
	}
}
