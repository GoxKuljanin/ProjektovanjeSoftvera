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

@Entity
@Table(name = "pacijentzahtevpregled")
public class PacijentZahtevZaPregled {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "termin_id")
	private Termin termin;
	
	@ManyToOne( cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "pacijent_id")
	private Pacijent pacijent;
	
	@ManyToOne
	@JoinColumn(name = "lekar_id")
	private Lekar lekar;
	
	public PacijentZahtevZaPregled() {
		super();
	}
	
	public PacijentZahtevZaPregled(Pacijent p, Lekar l, Termin datum) {
		super();
		this.pacijent = p;
		this.lekar = l;
		this.termin = datum;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public Pacijent getPacijent() {
		return pacijent;
	}

	public void setPacijent(Pacijent pacijent) {
		this.pacijent = pacijent;
	}

	public Lekar getLekar() {
		return lekar;
	}

	public void setLekar(Lekar lekar) {
		this.lekar = lekar;
	}

	public Termin getTermin() {
		return termin;
	}

	public void setTermin(Termin termin) {
		this.termin = termin;
	}
}
