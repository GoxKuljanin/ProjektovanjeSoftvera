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
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "pacijent")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Pacijent {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne//(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")	//, referencedColumnName = "user_id"
	private User user;
	
	@OneToOne
	@JoinColumn(name = "zdravstveni_karton_id")
	private ZdravstveniKarton zdravstveniKarton;
	
	@JsonIgnore
	@OneToMany(mappedBy = "pacijent", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Pregled> zakazaniPregledi = new HashSet<Pregled>();
	
	/*@JsonIgnore
	@OneToMany(mappedBy = "pacijent")
	private Collection<ZahtevZaZakazivanje> zahteviZakazivanja = new ArrayList<ZahtevZaZakazivanje>();*/

	
	public Pacijent() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	//@JsonIgnore		//Anotacija koja oznacava da se ne dobaljaju dalje Useri, da ne bi bilo ugnjezdavanja!
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public ZdravstveniKarton getZdravstveniKarton() {
		return zdravstveniKarton;
	}

	public void setZdravstveniKarton(ZdravstveniKarton zdravstveniKarton) {
		this.zdravstveniKarton = zdravstveniKarton;
	}
	
	public Set<Pregled> getZakazaniPregledi() {
		return zakazaniPregledi;
	}

	public void setZakazaniPregledi(Set<Pregled> zakazaniPregledi) {
		this.zakazaniPregledi = zakazaniPregledi;
	}
	
	/*@JsonIgnore
	public Collection<ZahtevZaZakazivanje> getZakazivanje() {
		return zahteviZakazivanja;
	}

	public void addZakazivanje(ZahtevZaZakazivanje zahtevZakazivanja) {
		if (this.zahteviZakazivanja.contains(zahtevZakazivanja))
		      return ;
		zahteviZakazivanja.add(zahtevZakazivanja);
		zahtevZakazivanja.setPacijent(this);
	}
	public void removeZakazivanje(ZahtevZaZakazivanje zahtevZakazivanja) {
	    if (!zahteviZakazivanja.contains(zahtevZakazivanja))
	      return ;
	    zahteviZakazivanja.remove(zahtevZakazivanja);
	    zahtevZakazivanja.setPacijent(null);
	  }*/
}
