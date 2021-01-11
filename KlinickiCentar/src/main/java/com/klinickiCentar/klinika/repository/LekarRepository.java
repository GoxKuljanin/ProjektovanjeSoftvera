package com.klinickiCentar.klinika.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klinickiCentar.klinika.models.Lekar;
import com.klinickiCentar.klinika.models.User;

public interface LekarRepository extends JpaRepository<Lekar, Long> {
}

