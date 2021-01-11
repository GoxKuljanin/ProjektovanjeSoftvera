package com.klinickiCentar.klinika.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klinickiCentar.klinika.models.AdministratorKlinike;
import com.klinickiCentar.klinika.models.Cena;
import com.klinickiCentar.klinika.models.Klinika;
import com.klinickiCentar.klinika.models.Lekar;
import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.models.PacijentZahtevZaPregled;
import com.klinickiCentar.klinika.models.Pregled;
import com.klinickiCentar.klinika.models.Termin;
import com.klinickiCentar.klinika.models.TipPregleda;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.services.AdminKlinikeService;
import com.klinickiCentar.klinika.services.EmailService;
import com.klinickiCentar.klinika.repository.TerminRepository;
import com.klinickiCentar.klinika.services.LekarService;
import com.klinickiCentar.klinika.services.PacijentService;
import com.klinickiCentar.klinika.services.PacijentZahtevZaPregledService;
import com.klinickiCentar.klinika.services.PreglediService;
import com.klinickiCentar.klinika.services.TipPregledaService;
import com.klinickiCentar.klinika.services.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/pregledi")
public class PreglediController {

	@Autowired
	private PreglediService preglediService;
	
	@Autowired
	private PacijentService pacijentService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AdminKlinikeService adminKlinikeService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private TipPregledaService tipPregledaService;
	
	@Autowired
	private LekarService lekariService;
	
	@Autowired
	private PacijentZahtevZaPregledService pzs;
	
	@Autowired
	private TerminRepository tr;

	
	@GetMapping("/getAllPregledi")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Pregled>> getAllPregledi(){
		List<Pregled> pregledi = preglediService.getAllPregledi();
		
		List<Pregled> slobodniPregledni = new ArrayList<>();
		for(Pregled p : pregledi) {
			if(p.getPacijent() == null) {
				slobodniPregledni.add(p);
			}
		}
		
		return new ResponseEntity<List<Pregled>>(slobodniPregledni, HttpStatus.OK);

	}
	
	@GetMapping("/getAllPreglediKlinike/{id}")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN, ROLE_PACIJENT')")
	public ResponseEntity<List<Pregled>> getAllPreglediKlinike(@PathVariable ("id") Long id){
		List<Pregled> pregledi = preglediService.findByKlinikaId(id);
		
		List<Pregled> slobodniPregledni = new ArrayList<>();
		for(Pregled p : pregledi) {
			if(p.getPacijent() == null) {
				slobodniPregledni.add(p);
			}
		}
		
		return new ResponseEntity<List<Pregled>>(slobodniPregledni, HttpStatus.OK);

	}
	
	@GetMapping("/getPreglediByDatum/{id}")	
	@PreAuthorize("hasRole('ROLE_PACIJENT')")	
	public ResponseEntity<List<Pregled>> getAllPreglediByDatum(@RequestParam String datum, @PathVariable ("id") Long id){
		Termin termin = preglediService.findTerminByDatum(datum);
		
		if( termin == null ) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		//List<Pregled> pregledi = preglediService.getAllPregledi();

		List<Pregled> pregledi = (List<Pregled>) termin.getPregledi();
		
		List<Pregled> slobodniPregledni = new ArrayList<>();
		for(Pregled p : pregledi) {
			if(p.getKlinika().getId().equals(id)) {
				if(p.getPacijent() == null) {
					//if(p.getTermin().getId().equals(termin.getId())) {
						slobodniPregledni.add(p);
					//}	
				}
			}
		}
		
		return new ResponseEntity<List<Pregled>>(slobodniPregledni, HttpStatus.OK);
    
	}
	
	@PostMapping("/zakaziPregled")
	@PreAuthorize("hasRole('ROLE_PACIJENT')")	
	public ResponseEntity<?> zakaziPregled(@RequestBody Long id, Principal pp){
		
		User u = userService.findByUsername(pp.getName());
		Pacijent p = pacijentService.getPacijentByUser(u.getId());
		Pregled preg = preglediService.zakazi(p, id);
		
		if(preg == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(preg, HttpStatus.OK);
		
	}
	
	@GetMapping("/istorijaPregleda")
	@PreAuthorize("hasRole('ROLE_PACIJENT')")		
	public ResponseEntity<List<Pregled>> istorijaPregleda(Principal currUser){		
		User u = userService.findByUsername(currUser.getName());
		Pacijent p = pacijentService.getPacijentByUser(u.getId());
		List<Pregled> pregledi = preglediService.getByPacijentId(p.getId());
		List<Pregled> newPregledi = new ArrayList<>();
		for(Pregled preg : pregledi) {
			if(preg.getIzvestaj() != null) {
				newPregledi.add(preg);
			}
		}
		return new ResponseEntity<List<Pregled>>(newPregledi, HttpStatus.OK);
	}
	
	@GetMapping("/zakazaniPregledi")
	@PreAuthorize("hasRole('ROLE_PACIJENT')")			
	public ResponseEntity<List<Pregled>> zakazaniPregledi(Principal currUser){		//@RequestParam Long id
		System.out.println("Za preglede: " + currUser.getName());
		User u = userService.findByUsername(currUser.getName());
		Pacijent p = pacijentService.getPacijentByUser(u.getId());
		List<Pregled> set = preglediService.getByPacijentId(p.getId());
		return new ResponseEntity<List<Pregled>>(set, HttpStatus.OK);
	}
	
	@PostMapping("/odjaviPregled")
	@PreAuthorize("hasRole('ROLE_PACIJENT')")	
	public ResponseEntity<Pregled> odjaviPregled(@RequestBody Long id){
		Pregled zakazani = preglediService.getById(id);
		zakazani.setPacijent(null);
		zakazani = preglediService.save(zakazani);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/addTermin")
	public ResponseEntity<Termin> addTermin(@RequestBody Termin termin){
		Termin t = preglediService.saveTermin(termin);
		
		return new ResponseEntity<Termin>(t,HttpStatus.OK);
	}
	
	@GetMapping("/lekarPregledi")	
	@PreAuthorize("hasRole('ROLE_PACIJENT')")
	public ResponseEntity<?> lekarPregledi(@RequestParam String datum, @RequestParam String naziv){
		TipPregleda tip = tipPregledaService.findByNaziv(naziv);
		List<Long> lekariId = preglediService.findLekarPregledZaDatum(1L, naziv);
		List<Lekar> slobodni = new ArrayList<>();
		List<Lekar> lekari = new ArrayList<>();
		
		for(Long i : lekariId) {
			lekari.add(lekariService.getLekar(i));
		}
		
		for(Lekar l : lekari) {
			List<Pregled> preg = preglediService.findByLekadId(l.getId());
			int satnica = 0;
			if(preg != null) {
				for(Pregled p : preg) {
					satnica += Double.parseDouble(p.getTrajanje().split("h")[0]);
				}
			}
			if(satnica <= 7) {
				slobodni.add(l);
			}
		}
		
		return new ResponseEntity<List<Lekar>>(slobodni, HttpStatus.OK);
	}
	
	@PostMapping("/zakaziProizvoljanPregled")
	@PreAuthorize("hasRole('ROLE_PACIJENT')")
	public ResponseEntity<?> zakaziProizvoljanPregled(@RequestBody Long id, @RequestParam String datum, Principal p){
		User u = userService.findByUsername(p.getName());
		Pacijent pa = pacijentService.getPacijentByUser(u.getId());
		Lekar le = lekariService.getLekar(id);
	
		PacijentZahtevZaPregled pz = pzs.zakaziPregled(datum, pa, le);
		if(pz == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/addPregled")
	public ResponseEntity<Pregled> addPregled(@RequestBody Pregled pregled, Principal user){
		User u = userService.findByUsername(user.getName());
		Collection<AdministratorKlinike> adminikllinike = adminKlinikeService.getAdminiKlinike();
		Klinika klinika = new Klinika();
		for(AdministratorKlinike a : adminikllinike) {
			if(a.getUser().getId() == u.getId()) {
				klinika = a.getKlinika();
			}
		}
		pregled.setKlinika(klinika);
		preglediService.savePregled(pregled);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	

	@PostMapping("/addPregledLekar/{id}")
	public ResponseEntity<Pregled> addPregledLekar(@RequestBody Pregled pregled,@PathVariable ("id") Long id){
		User u = userService.findById(id);
		Pacijent p = pacijentService.getPacijentByUser(u.getId());
		pregled.setPacijent(p);
		preglediService.savePregledLekar(pregled);
		List<AdministratorKlinike> adminiklinike = adminKlinikeService.getAdminiKlinikeByIdKlinike((preglediService.findKlinikaByPregledId(pregled.getId())).getId()) ;
		
		try {
			emailService.obavestiAdmine(adminiklinike);
		} catch (Exception e) {
			System.out.println("Greska prilikom slanja maila!\n" + e.getMessage());
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	

	@GetMapping("/getAllSlobodniTerminiPregleda")
	@CrossOrigin
	public ResponseEntity<Collection<Pregled>> getAllSlobodniTerminiPregleda(Principal currUser){
		User u = userService.findByUsername(currUser.getName());
		Collection<AdministratorKlinike> adminikllinike = adminKlinikeService.getAdminiKlinike();
		Klinika klinika = new Klinika();
		for(AdministratorKlinike a : adminikllinike) {
			if(a.getUser().getId() == u.getId()) {
				klinika = a.getKlinika();
			}
		}
		Collection<Pregled> pregledi = preglediService.getAllPregledi();
		Collection<Pregled> slobodniTermini = new ArrayList<Pregled>();
		for(Pregled p : pregledi) {
			if (p.getPacijent()==null) {
				slobodniTermini.add(p);
			}
		}
		
		return new ResponseEntity<Collection<Pregled>>(slobodniTermini, HttpStatus.OK);
	}
	

	@PutMapping("/updatePregled")
	@CrossOrigin
	public ResponseEntity<Pregled> updatePregled(@RequestBody Pregled pregled){
		preglediService.save(pregled);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@PutMapping("/updateZahtevZakazivanja")
	@CrossOrigin
	public ResponseEntity<Pregled> updateZahtevZakazivanja(@RequestBody Pregled pregled){
		Pregled p = pregled;
		Klinika kl = preglediService.findKlinikaByPregledId(pregled.getId());
		Pacijent pac = preglediService.findPacijentByPregledId(pregled.getId());
		p.setKlinika(kl);
		p.setPacijent(pac);
		preglediService.save(p);
		
		try {
			emailService.pregledNotificationLekarPacijent(p,p.getLekar().getUser().getUsername(),pac.getUser().getUsername());
		} catch (Exception e) {
			System.out.println("Greska prilikom slanja maila!\n" + e.getMessage());
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/findPacijentByPregledId/{id}")
	@CrossOrigin
	public Pacijent findPacijentByPregledId(@PathVariable ("id") Long id) {
		return preglediService.findPacijentByPregledId(id);
	}
	
}
