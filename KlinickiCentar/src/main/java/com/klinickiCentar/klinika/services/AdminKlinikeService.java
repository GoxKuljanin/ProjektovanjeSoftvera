package com.klinickiCentar.klinika.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.klinickiCentar.klinika.models.AdministratorKlinike;
import com.klinickiCentar.klinika.models.Authority;
import com.klinickiCentar.klinika.models.Klinika;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.repository.AdminKlinikeRepository;
import com.klinickiCentar.klinika.repository.PacijentRepository;
import com.klinickiCentar.klinika.repository.UserRepository;

@Service
public class AdminKlinikeService {
	@Autowired
	private AdminKlinikeRepository adminKlinikeRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthorityService authService;
	
	public List<AdministratorKlinike> getAdminiKlinike() {
		return adminKlinikeRepository.findAll();
	}
	
	public List<AdministratorKlinike> getAdminiKlinikeByIdKlinike(Long id) {
		List<AdministratorKlinike> adminiklinike = adminKlinikeRepository.findAll();
		List<AdministratorKlinike> adminiK = new ArrayList<AdministratorKlinike>();
		for(AdministratorKlinike a: adminiklinike) {
			if(a.getKlinika().getId()==id)
				adminiK.add(a);
		}
		return adminiK;
	}
	
	public AdministratorKlinike getAdminaKlinike(Long id) {
		return adminKlinikeRepository.getOne(id);
	}
	
	public void updateAdminaKlinike(AdministratorKlinike admin) {
		adminKlinikeRepository.save(admin);
	}
	
	public void updateUseraAdminaKlinike(User u) {
		User stari = userRepository.getOne(u.getId());
		stari.setAdress(u.getAdress());
		stari.setCity(u.getCity());
		stari.setCountry(u.getCountry());
		stari.setPhoneNumber(u.getPhoneNumber());
		stari.setFirstname(u.getFirstname());
		stari.setLastname(u.getLastname());
		if(!passwordEncoder.matches(u.getPassword(), stari.getPassword())) {
			stari.setPassword(passwordEncoder.encode(u.getPassword()));
		}
		//u.setEnabled(true);
		//List<Authority> auth = authService.findByname("ROLE_ADMIN");		//Mozda da ide u update admin 
		//u.setAuthorities(auth);											//(ako ga kojim slucajem obrise)
		userRepository.save(stari);
	}
}
