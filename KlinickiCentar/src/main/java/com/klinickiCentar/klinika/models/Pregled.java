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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "pregled")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Pregled {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "trajanje")
	private String trajanje;
	
	@OneToOne()
	private Sala sala;
	
	@Column(name = "cena")
	private double cena;
	
	@ManyToOne( cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "pacijent_id")
	private Pacijent pacijent;
	
	@OneToOne
	private Lekar lekar;
	
	@ManyToOne( cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "klinika_id")
	private Klinika klinika;
	
	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "termin_id")
	private Termin termin;
	
	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "tippregleda_id")
	private TipPregleda tippregleda;
	
	@OneToOne(mappedBy = "pregled", fetch = FetchType.LAZY)
	private Izvestaj izvestaj;

	public Pregled() {
		super();
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTrajanje() {
		return trajanje;
	}

	public void setTrajanje(String trajanje) {
		this.trajanje = trajanje;
	}

	public Sala getSala() {
		return sala;
	}

	public void setSala(Sala sala) {
		this.sala = sala;
	}

	public double getCena() {
		return cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}

	public Lekar getLekar() {
		return lekar;
	}

	public void setLekar(Lekar lekar) {
		this.lekar = lekar;
	}
	
	@JsonIgnore
	public Pacijent getPacijent() {
		return pacijent;
	}
	public void setPacijent(Pacijent pacijent) {
		this.pacijent = pacijent;
	}

	@JsonIgnore
	public Izvestaj getIzvestaj() {
		return izvestaj;
	}

	public void setIzvestaj(Izvestaj izvestaj) {
		this.izvestaj = izvestaj;
	}
	
	public Termin getTermin() {
		return termin;
	}

	public void setTermin(Termin termin) {
		if (sameAsOldTermin(termin))
		      return ;
		Termin oldTermin = this.termin;
		    this.termin = termin;
		    if (oldTermin!=null)
		    	oldTermin.removePregled(this);
		    if (termin!=null)
		    	termin.addPregled(this);
	}
	
	private boolean sameAsOldTermin(Termin termin) {
	    return this.termin==null? termin == null : this.termin.equals(termin);
	  }
	
	@JsonIgnore
	public Klinika getKlinika() {
		return klinika;
	}

	public void setKlinika(Klinika klinika) {
		if (sameAsOldKlinika(klinika))
		      return ;
		Klinika oldKlinika = this.klinika;
		    this.klinika = klinika;
		    if (oldKlinika!=null)
		    	oldKlinika.removePregled(this);
		    if (klinika!=null)
		    	klinika.addPregled(this);
	}
	
	private boolean sameAsOldKlinika(Klinika klinika) {
	    return this.klinika==null? klinika == null : this.klinika.equals(klinika);
	  }
	
	public TipPregleda getTippregleda() {
		return tippregleda;
	}

	public void setTippregleda(TipPregleda tippregleda) {
		if (sameAsOldTippregleda(tippregleda))
		      return ;
		TipPregleda oldTipPregleda = this.tippregleda;
		    this.tippregleda = tippregleda;
		    if (oldTipPregleda!=null)
		    	oldTipPregleda.removePregled(this);
		    if (tippregleda!=null)
		    	tippregleda.addPregled(this);
	}
	
	private boolean sameAsOldTippregleda(TipPregleda tippregleda) {
	    return this.tippregleda==null? tippregleda == null : this.tippregleda.equals(tippregleda);
	  }
	
}
