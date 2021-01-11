package com.klinickiCentar.klinika.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klinickiCentar.klinika.models.Izvestaj;
import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.models.ZdravstveniKarton;
import com.klinickiCentar.klinika.services.PacijentService;
import com.klinickiCentar.klinika.services.UserService;
import com.klinickiCentar.klinika.services.ZdravstveniKartonService;

@RestController
@CrossOrigin(origins = "*")
public class ZdravstveniKartonController {
	
	@Autowired
	private ZdravstveniKartonService zdravstveniKartonService;
	
	@Autowired
	private PacijentService pacijentService;
	
	@Autowired
	private UserService userService;
	
//	@GetMapping("/getZdravstveniKartoni")
//	public ResponseEntity<List<ZdravstveniKarton>> getAllZdravstveniKarton(){
//		List<ZdravstveniKarton> kartoni = zdravstveniKartonService.getAllZdravstveniKarton();
//		return new ResponseEntity<List<ZdravstveniKarton>>(kartoni, HttpStatus.OK);
//	}

	@GetMapping("/getZdravstveniKarton")
	@PreAuthorize("hasRole('ROLE_PACIJENT')")					//@RequestParam String email
	public ResponseEntity<ZdravstveniKarton> getZdravstveniKarton(Principal currUser){
		User u = userService.findByUsername(currUser.getName());
		Pacijent p = pacijentService.getPacijentByUser(u.getId());
		ZdravstveniKarton karton = p.getZdravstveniKarton();
		System.out.println("Doslo je do ovde!\n\n\n");
		return new ResponseEntity<ZdravstveniKarton>(karton, HttpStatus.OK);
	}
	
	@GetMapping("/proba")
	public ResponseEntity<Izvestaj> getIzvestaj(){
		Izvestaj iz = zdravstveniKartonService.getIzvestaj();
		return new ResponseEntity<Izvestaj>(iz, HttpStatus.OK);
	}
}
