package com.klinickiCentar.klinika.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "lek")
public class Lek {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "sifra", nullable = false)
	private String sifra;
	
	@Column(name = "naziv", nullable = false)
	private String naziv;

	@Column(name = "opis", nullable = false)
	private String opis;
	
	@ManyToMany(mappedBy = "lek")
	private Set<Izvestaj> izvestaj = new HashSet<>();

	public String getSifra() {
		return sifra;
	}

	public void setSifra(String sifra) {
		this.sifra = sifra;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	@JsonIgnore
	public Set<Izvestaj> getIzvestaj() {
		return izvestaj;
	}

	public void setIzvestaj(Set<Izvestaj> izvestaj) {
		this.izvestaj = izvestaj;
	}
}
