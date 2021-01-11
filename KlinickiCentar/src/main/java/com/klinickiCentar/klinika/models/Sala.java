package com.klinickiCentar.klinika.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "sala")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Sala {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "brojsale")
	private String brojsale;
	
	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "klinika_id")
	private Klinika klinika;

	public Sala() {
		super();
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

	public String getBrojsale() {
		return brojsale;
	}

	public void setBrojsale(String brojsale) {
		this.brojsale = brojsale;
	}

	public Klinika getKlinika() {
		return klinika;
	}

	public void setKlinika(Klinika klinika) {
		if (sameAsOld(klinika))
		      return ;
		    //set new owner
			Klinika oldKlinika = this.klinika;
		    this.klinika = klinika;
		    //remove from the old owner
		    if (oldKlinika!=null)
		    	oldKlinika.removeSala(this);
		    //set myself into new owner
		    if (klinika!=null)
		    	klinika.addSala(this);
	}
	
	private boolean sameAsOld(Klinika klinika) {
	    return this.klinika==null? klinika == null : this.klinika.equals(klinika);
	  }
	
}
