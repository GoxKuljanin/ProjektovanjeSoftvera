package com.klinickiCentar.klinika;
/*
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

public class KlinickiCentarInitialTest extends KlinickiCentarApplicationTests{

	@Autowired
	private WebApplicationContext webApplicationContext;
	
	private MockMvc mockMvc;
	
	@Before(value = "")
	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}
	
	@Test
	public void testPacijent() throws Exception {
		mockMvc.perform(get("/klinika/2/cene")).andExpect(status().isOk())
			//.andExpect((ResultMatcher) content().contentType("application/json"))
			.andExpect(jsonPath("$.vrednost").value(250))
			.andExpect(jsonPath("$.opis").value("Klinika2"));
			
	}
}
*/
