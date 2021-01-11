package com.klinickiCentar.klinika.models;

import java.util.Collection;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.klinickiCentar.klinika.services.AuthorityService;

@Entity
@Table(name = "users")
public class User implements UserDetails {

	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "username", nullable = false, unique = true)
	private String username;								//E-mail
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "last_password_reset_date")
    private java.sql.Timestamp lastPasswordResetDate;
	
	@Column(name = "enabled")
    private boolean enabled;
	
	@Column(name = "lastname", nullable = false)
	private String lastname;
	
	@Column(name = "firstname", nullable = false)
	private String firstname;
	
	@Column(name = "adress", nullable = false)
	private String adress;
	
	@Column(name = "city", nullable = false)
	private String city;
	
	@Column(name = "country", nullable = false)
	private String country;
	
	@Column(name = "phonenumber", nullable = false)
	private String phoneNumber;
	
	@Column(name = "uloga", nullable = false)
	private String uloga;
	
	@Column(name = "aktiviran", nullable = false)
	private boolean nalogAktiviran;
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "user_authority", 
				joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
				inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
	private List<Authority> authorities;
	//POJMA NEMAM STA OVO ZNACI
//	@OneToOne//(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//	private Pacijent pacijent;
	
	
	public User() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}


	public String getAdress() {
		return adress;
	}

	public void setAdress(String adress) {
		this.adress = adress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getUloga() {
		return uloga;
	}

	public void setUloga(String uloga) {
		this.uloga = uloga;
	}
	
	public void setAuthorities(List<Authority> authorities) {
        this.authorities = authorities;
    }
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities(){
		return this.authorities;
	}
	
	public java.sql.Timestamp getLastPasswordResetDate() {
        return lastPasswordResetDate;
    }
	public void setLastPasswordResetDate(java.sql.Timestamp now) {
			this.lastPasswordResetDate = now;
    }
	
	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	@JsonIgnore
	@Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return this.enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public boolean isNalogAktiviran() {
		return nalogAktiviran;
	}

	public void setNalogAktiviran(boolean nalogAktiviran) {
		this.nalogAktiviran = nalogAktiviran;
	}
}
