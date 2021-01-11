package com.klinickiCentar.klinika.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klinickiCentar.klinika.models.AdministratorKlinike;

public interface AdminKlinikeRepository extends JpaRepository<AdministratorKlinike, Long> {

}
