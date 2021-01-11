package com.klinickiCentar.klinika.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "dijagnoza")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Dijagnoza {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "sifra", nullable = false)
	private String sifra;
	
	@Column(name = "naziv", nullable = false)
	private String naziv;
	
	@Column(name = "dijagnoza", nullable = false)
	private String opisDijagnoze;
	
	@OneToOne( mappedBy = "dijagnoza")
	private Izvestaj izvestaj;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOpisDijagnoze() {
		return opisDijagnoze;
	}

	public void setOpisDijagnoze(String opisDijagnoze) {
		this.opisDijagnoze = opisDijagnoze;
	}

	public String getSifra() {
		return sifra;
	}

	public void setSifra(String sifra) {
		this.sifra = sifra;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	@JsonIgnore
	public Izvestaj getIzvestaj() {
		return izvestaj;
	}

	public void setIzvestaj(Izvestaj izvestaj) {
		this.izvestaj = izvestaj;
	}
}
