package com.klinickiCentar.klinika.models;
import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tippregleda")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TipPregleda {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "naziv", nullable = false)
	private String naziv;
	
	@Column(name = "opis")
	private String opis;
	
	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "klinika_id")
	private Klinika klinika;
	
	@JsonIgnore
	@OneToMany(mappedBy = "tippregleda")
	private Collection<Pregled> pregledi = new ArrayList<Pregled>();
	
	/*@JsonIgnore
	@OneToMany(mappedBy = "tippregleda")
	private Collection<ZahtevZaZakazivanje> zahteviZakazivanja = new ArrayList<ZahtevZaZakazivanje>();*/


	public TipPregleda() {
		super();
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
	
	public Klinika getKlinika() {
		return klinika;
	}

	public void setKlinika(Klinika klinika) {
		if (sameAsOldKlinika(klinika))
		      return ;
		    //set new owner
			Klinika oldKlinika = this.klinika;
		    this.klinika = klinika;
		    //remove from the old owner
		    if (oldKlinika!=null)
		    	oldKlinika.removeTipPregleda(this);
		    //set myself into new owner
		    if (klinika!=null)
		    	klinika.addTipPregleda(this);
	}
	
	private boolean sameAsOldKlinika(Klinika klinika) {
	    return this.klinika==null? klinika == null : this.klinika.equals(klinika);
	  }
	
	public Collection<Pregled> getPregledi() {
		return pregledi;
	}

	public void addPregled(Pregled pregled) {
		if (this.pregledi.contains(pregled))
		      return ;
		pregledi.add(pregled);
		pregled.setTippregleda(this);
	}
	public void removePregled(Pregled pregled) {
	    if (!pregledi.contains(pregled))
	      return ;
	    pregledi.remove(pregled);
	    pregled.setTippregleda(null);
	  }
	
	/*public Collection<ZahtevZaZakazivanje> getZakazivanje() {
		return zahteviZakazivanja;
	}

	public void addZakazivanje(ZahtevZaZakazivanje zahtevZakazivanja) {
		if (this.zahteviZakazivanja.contains(zahtevZakazivanja))
		      return ;
		zahteviZakazivanja.add(zahtevZakazivanja);
		zahtevZakazivanja.setTippregleda(this);
	}
	public void removeZakazivanje(ZahtevZaZakazivanje zahtevZakazivanja) {
	    if (!zahteviZakazivanja.contains(zahtevZakazivanja))
	      return ;
	    zahteviZakazivanja.remove(zahtevZakazivanja);
	    zahtevZakazivanja.setTippregleda(null);
	  }*/

	
}
