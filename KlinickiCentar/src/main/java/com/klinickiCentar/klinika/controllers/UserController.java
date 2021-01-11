package com.klinickiCentar.klinika.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.klinickiCentar.klinika.models.AdministratorKlinike;
import com.klinickiCentar.klinika.models.Lekar;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.services.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;
	
	
	//@GetMapping(value = "/allUsers", produces = MediaType.APPLICATION_JSON_VALUE)
	@GetMapping("/getAllUsers")
	public ResponseEntity<List<User>> getAll(){
		List<User> users = userService.findOnlyUsers("User");
		
		return ( new ResponseEntity<>(users, HttpStatus.OK) );
	}
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers(){
		List<User> users = userService.findAll();
		
		return ( new ResponseEntity<>(users, HttpStatus.OK) );
	}
	@GetMapping(value = "/user/{id}")
	public ResponseEntity<User> getUserById(@PathVariable ("id") Long id) {
		User user = userService.findById(id);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@PutMapping("/user")
	@CrossOrigin
	public ResponseEntity<User> updateAdminKlinike(@RequestBody User user){
		userService.updateUser(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping(value = "/userLekar")
	public ResponseEntity<Lekar> addUser(@RequestBody Lekar lekar){
		System.out.print(lekar);
		userService.addUser(lekar);
		return new ResponseEntity<Lekar>(lekar,HttpStatus.OK);
	}
	
}
