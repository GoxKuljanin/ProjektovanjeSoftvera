package com.klinickiCentar.klinika.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "termin")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Termin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "datum", nullable = false)
	private String datum;
	
	@Column(name = "vreme", nullable = false)
	private String vreme;
	
	/*@OneToMany(mappedBy = "termin", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	//@JoinColumn(name = "pregled_id", referencedColumnName = "id")
	private Set<Pregled> pregled = new HashSet<>();*/
	@JsonIgnore
	@OneToMany(mappedBy = "termin")
	private Collection<Pregled> pregledi = new ArrayList<Pregled>();
	
	

	public Termin() {
		super();
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}
	
	public String getVreme() {
		return vreme;
	}

	public void setVreme(String vreme) {
		this.vreme = vreme;
	}

//	@JsonIgnore
//	public Set<Pregled> getPregled() {
//		return pregled;
//	}
//
//
//	public void setPregled(Set<Pregled> pregled) {
//		this.pregled = pregled;
//	}
	
	public Collection<Pregled> getPregledi() {
		return pregledi;
	}

	public void addPregled(Pregled pregled) {
		if (this.pregledi.contains(pregled))
		      return ;
		pregledi.add(pregled);
		pregled.setTermin(this);
	}
	public void removePregled(Pregled pregled) {
	    if (!pregledi.contains(pregled))
	      return ;
	    pregledi.remove(pregled);
	    pregled.setTermin(null);
	  }
	
	
	
	
}
