package com.klinickiCentar.klinika;
/*
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.klinickiCentar.klinika.models.User;
import com.klinickiCentar.klinika.repository.UserRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class KlinickiCentarTestUser {

	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private UserRepository userRepository;
	
	@Test
	public void findByEmail() {
		User u = new User();
		u.setUsername("Goranr");
		u.setPassword("123");
		u.setLastname("Kuljanin");
		u.setEmail("goku@gmail.com");
		u.setAdress("DJ");
		u.setCity("Novi Sad");
		u.setCity("RS");
		u.setPhoneNumber("064");
		u.setUloga("ADMIN_K_C");
		
		entityManager.persist(u);
		entityManager.flush();
		
		User user = userRepository.findOneByEmail(u.getEmail());
		
		assertThat(user.getUsername()).isEqualTo(u.getUsername());
		
	}
}
*/
