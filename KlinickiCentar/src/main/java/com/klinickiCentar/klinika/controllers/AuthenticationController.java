package com.klinickiCentar.klinika.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klinickiCentar.klinika.auth.JwtAuthenticationRequest;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.models.UserTokenState;
import com.klinickiCentar.klinika.services.UserService;
import com.klinickiCentar.klinika.tokenUtils.TokenUtils;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {
	
	protected final Log LOGGER = LogFactory.getLog(getClass());

	@Autowired
	TokenUtils tokenUtils;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
			HttpServletResponse response) throws AuthenticationException, IOException {
		
		final Authentication authentication;
		try {
			authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			// TODO: handle exception
			return new ResponseEntity<>("Nalog ne postoji", HttpStatus.BAD_REQUEST);
		}
		
		if( !((User)authentication.getPrincipal()).isNalogAktiviran() ) {
			return new ResponseEntity<>("Nalog nije aktiviran", HttpStatus.LOCKED);
		}
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		
		User user = (User) authentication.getPrincipal();
		String jwt = tokenUtils.generateToken(user.getUsername());
		int expiresIn = tokenUtils.getExpiredIn();
		
		return ResponseEntity.ok(new UserTokenState(jwt, expiresIn));
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> doRegister(@RequestBody User user){
		User u = userService.saveUser(user);
		
		if( u == null ) {
			System.out.println(u);
			return new ResponseEntity<>(u, HttpStatus.OK);
		}
				
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/aktivirajNalog", method = RequestMethod.POST)
	public ResponseEntity<?> aktivirajNalog(@RequestBody Long id){
		
		
		User u = userService.findById(id);
		
		u.setNalogAktiviran(true);
		
		User updated = userService.updateUser(u);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
