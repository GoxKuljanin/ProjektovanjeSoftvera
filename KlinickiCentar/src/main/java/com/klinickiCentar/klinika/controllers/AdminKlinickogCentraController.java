package com.klinickiCentar.klinika.controllers;

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

import com.klinickiCentar.klinika.models.Authority;
import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.models.ZdravstveniKarton;
import com.klinickiCentar.klinika.services.AuthorityService;
import com.klinickiCentar.klinika.services.EmailService;
import com.klinickiCentar.klinika.services.PacijentService;
import com.klinickiCentar.klinika.services.UserService;
import com.klinickiCentar.klinika.services.ZdravstveniKartonService;

@RestController
@CrossOrigin(origins = "*")
public class AdminKlinickogCentraController {
	
	@Autowired
	private PacijentService pacijentService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthorityService authService;

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private ZdravstveniKartonService zdrService;
	
	@PostMapping("/dodajPacijentaUBazuPacijenata")
	public ResponseEntity<Pacijent> dodajPacijentaUBazu(@RequestBody User u){
		
		User user = userService.findByUsername(u.getUsername());
		Pacijent p = new Pacijent();
		//user.setNalogAktiviran(true);			//onda kada aktivira preko linka
		user.setUloga("PACIJENT");
		p.setUser(user);
		
		List<Authority> auth = authService.findByname("ROLE_PACIJENT");
		user.setAuthorities(auth);
		
		ZdravstveniKarton karton = new ZdravstveniKarton();
		karton.setAlergija("");
		karton.setDioptrija("");
		karton.setIzvestaj(null);
		karton.setKrvnaGrupa("");
		karton.setTezina("");
		karton.setVisina("");
		//karton.setPacijent(succ);
		zdrService.save(karton);
		
		p.setZdravstveniKarton(karton);
		Pacijent succ = pacijentService.dodajPacijentaUBazu(p);
		
		
		try {
			emailService.sendNotification(u);
		} catch (Exception e) {
			System.out.println("Greska prilikom slanja maila!" + e.getMessage());
		}
		
		return new ResponseEntity<Pacijent>(succ, HttpStatus.OK);
//		User user = userService.findUserByEmail(u.getEmail());
//		Pacijent p = new Pacijent();
//		p.setZdravstveniKarton("zd1");
//		
//		user.setPacijent(p);
//		p.setUser(user);
//		
//		//if( user != null ) {
//			pacijentService.dodajPacijentaUBazu(p);
			//return new ResponseEntity<User>(u, HttpStatus.OK);
		//}else {
		//	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		//}
	}
	@GetMapping("/dobaviSvePacijenteIzBaze")
	public ResponseEntity<List<Pacijent>> dobaviSvePacijenteIzBaze(){
		List<Pacijent> pacijenti = pacijentService.dobaviSvePacijente();
		return new ResponseEntity<List<Pacijent>>(pacijenti, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/odbijZahtev")
	public ResponseEntity<Void> deleteZahtev(@RequestParam String username, @RequestParam String poruka){
		User u = userService.findByUsername(username);
		userService.remove(u);
		try {
			emailService.odbijZahtev(poruka, u.getUsername());
		}catch (Exception e) {
			System.out.println("Mail servis ne radi");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
