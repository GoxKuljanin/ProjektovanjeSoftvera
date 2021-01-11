package com.klinickiCentar.klinika;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import java.nio.charset.Charset;

import javax.annotation.PostConstruct;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
//import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.klinickiCentar.klinika.auth.JwtAuthenticationRequest;
import com.klinickiCentar.klinika.models.Klinika;
import com.klinickiCentar.klinika.models.Lekar;
import com.klinickiCentar.klinika.models.Pacijent;
import com.klinickiCentar.klinika.models.Pregled;
import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.models.UserTokenState;
import com.klinickiCentar.klinika.repository.KlinikaRepository;
import com.klinickiCentar.klinika.repository.PacijentRepository;
import com.klinickiCentar.klinika.services.LekarService;
import com.klinickiCentar.klinika.services.PreglediService;
import com.klinickiCentar.klinika.services.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class KlinickiCentarApplicationTests {

	private static final String URL_SAVE = "/auth/login";
			
	@Autowired
	private TestRestTemplate test;
	
	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	@Autowired
	MockMvc mock;
	
	@MockBean
	private UserService userService;
	
	@MockBean
	private PacijentRepository pacijentRepo;
	@MockBean
	private KlinikaRepository klinikaRepo;
	@MockBean
	private LekarService lekarService;
	@MockBean
	private PreglediService preglediService;
	
	@Autowired
	private WebApplicationContext web;
	
	private String token;
	
	@PostConstruct
	public void setup() {
		this.mock = MockMvcBuilders.webAppContextSetup(web).apply(springSecurity()).build();
	}
//	@Before
//	public void login() {
//		ResponseEntity<UserTokenState> res =
//				test.postForEntity(this.URL_SAVE, new JwtAuthenticationRequest("ana@gmail.com", "123"), UserTokenState.class);
//		token = res.getBody().getAccessToken();
//	}
	
	@Test
	public void sacuvaj() throws Exception{
		User u = new User();
		u.setFirstname("Goran");
		u.setPassword("123");
		u.setLastname("Kuljanin");
		u.setUsername("goku@gmail.com");;
		u.setAdress("DJ");
		u.setCity("Novi Sad");
		u.setCity("RS");
		u.setPhoneNumber("064");
		u.setUloga("ADMIN_K_C");
		
		userService.saveUser(u);

	}
	@Test
	public void upisi() {
		User u = new User();
		u.setFirstname("Goran");;
		u.setPassword("123");
		u.setLastname("Kuljanin");
		u.setUsername("goku@gmail.com");;
		u.setAdress("DJ");
		u.setCity("Novi Sad");
		u.setCity("RS");
		u.setPhoneNumber("064");
		u.setUloga("ADMIN_K_C");
		userService.saveUser(u);
		
		Pacijent p = new Pacijent();
		p.setUser(u);
		p.setId(1L);
		pacijentRepo.save(p);
		
		Klinika k = new Klinika();
		k.setNaziv("Naziv1");
		k.setId(1L);
		k.setAdresa("Adresa1");
		klinikaRepo.save(k);
		
		User u1 = new User();
		u1.setFirstname("Goran");;
		u1.setPassword("123");
		u1.setLastname("Kuljanin");
		u1.setUsername("goku@gmail.com");;
		u1.setAdress("DJ");
		u1.setCity("Novi Sad");
		u1.setCity("RS");
		u1.setPhoneNumber("064");
		u1.setUloga("ADMIN_K_C");
		userService.saveUser(u1);
		
		Lekar l = new Lekar();
		l.setUser(u1);
		l.setKlinika(k);
		l.setId(1L);
		lekarService.addLekar(l);
		
		Pregled preg = new Pregled();
		preg.setId(1L);
		preg.setKlinika(k);
		preg.setLekar(l);
		preg.setPacijent(p);
		Mockito.when(this.pacijentRepo.findOneByUserId(1L)).thenReturn(p);
		
		Pregled zak = preg;
		zak.setPacijent(p);
		Mockito.when(this.preglediService.zakazi(p, preg.getId())).thenReturn(zak);
		
		
	}
	
	
}
