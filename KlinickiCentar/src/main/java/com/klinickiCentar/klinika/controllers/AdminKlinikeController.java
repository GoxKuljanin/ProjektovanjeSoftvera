package com.klinickiCentar.klinika.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.klinickiCentar.klinika.models.AdministratorKlinike;
import com.klinickiCentar.klinika.models.Klinika;
import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.models.Pregled;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.services.AdminKlinikeService;
import com.klinickiCentar.klinika.services.KlinikaService;
import com.klinickiCentar.klinika.services.PreglediService;
import com.klinickiCentar.klinika.services.UserService;

@RestController
@CrossOrigin(origins = "*")
public class AdminKlinikeController {
	
	@Autowired
	private AdminKlinikeService adminKlinikeService;
	
	@Autowired
	private KlinikaService klinikaService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PreglediService pregledService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	/*public ResponseEntity<?> getAdminInfo(Principal p){
		User u = userservice.getlogen(p.getName());
		Admin a = adminservic.getByUser(u.getId());
	}vracanje admina prilikom izmene sifre*/
	
	@GetMapping(value = "/getAdmineKlinike")
	public ResponseEntity<List<AdministratorKlinike>> getAdmineKlinike() {
		List<AdministratorKlinike> admini = adminKlinikeService.getAdminiKlinike();
		return new ResponseEntity<List<AdministratorKlinike>>(admini, HttpStatus.OK);
	}
	
	@GetMapping("/getAdminaKlinike")
	public AdministratorKlinike getAdminaKlinike(Principal principal) {
		System.out.println("\n\n\nUlogovan " + principal.getName() + "\n\n\n");
		List<AdministratorKlinike> admini = adminKlinikeService.getAdminiKlinike();
		User u = userService.findByUsername(principal.getName());
		
		for(AdministratorKlinike a : admini) {
			if( a.getUser().getUsername().equals(u.getUsername()) ) {
				//return new ResponseEntity<Pacijent>(p, HttpStatus.OK);
				return a;
			}
		}
		AdministratorKlinike a = null;
		//return new ResponseEntity<Pacijent>(p, HttpStatus.OK);
		return a;
	}
	
	@GetMapping(value = "/getAdminaKlinike/{id}")
	public ResponseEntity<AdministratorKlinike> getAdminaKlinikeById(@PathVariable ("id") Long id) {
		AdministratorKlinike admin = adminKlinikeService.getAdminaKlinike(id);
		return new ResponseEntity<AdministratorKlinike>(admin, HttpStatus.OK);
	}
	
	@GetMapping("/getKlinikaByAdminId/{id}")
	public ResponseEntity<Klinika> dobaviKliniku(@PathVariable ("id") Long id){
		AdministratorKlinike admin= adminKlinikeService.getAdminaKlinike(id);
		Klinika klinika=admin.getKlinika();
		return new ResponseEntity<Klinika>(klinika, HttpStatus.OK);
	}
	
	@GetMapping("/getZahteviZakazivanjaByIdKlinike/{id}")
	@CrossOrigin
	public ResponseEntity<Collection<Pregled>> getZahteviZakazivanjaByIdKlinike(@PathVariable ("id") Long id){
		Collection<Pregled> pregledi = pregledService.getAllPregledi();
		Collection<Pregled> zahteviZakazivanja = new ArrayList<Pregled>();
		for(Pregled p:pregledi) {
			if(p.getSala()==null && p.getKlinika().getId()==id)
				zahteviZakazivanja.add(p);
		}
		return new ResponseEntity<Collection<Pregled>>(zahteviZakazivanja, HttpStatus.OK);
	}
	
	@PutMapping("/adminKlinike")
	@CrossOrigin
	public ResponseEntity<AdministratorKlinike> updateAdminKlinike(@RequestBody AdministratorKlinike adminKlinike){
		adminKlinikeService.updateAdminaKlinike(adminKlinike);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping("/useraAdminaKlinike")
	@CrossOrigin
	public ResponseEntity<User> updateUseraAdminaKlinike(@RequestBody User user){
		adminKlinikeService.updateUseraAdminaKlinike(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
}
