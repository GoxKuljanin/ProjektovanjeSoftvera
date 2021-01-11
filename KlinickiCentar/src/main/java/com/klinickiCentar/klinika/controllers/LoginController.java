package com.klinickiCentar.klinika.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.services.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/user")
public class LoginController {

	@Autowired
	private UserService userService;
	
	@GetMapping(value = "/getUserInfo")
	//@PreAuthorize("hasRole('ROLE_USER')")
	public User loggenInUser(Principal principal) {
		User u = userService.findByUsername(principal.getName());
		return u;
	}
	
	//Ne koristi ne nigdje
	@PostMapping(value = "/register")
	public ResponseEntity<User> register(@RequestBody User user){
		User u = userService.saveUser(user);
		
		if( u == null ) {
			System.out.println(u);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}
		
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
}
