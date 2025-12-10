package com.stream.app.repositeries;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stream.app.entities.Video;

public interface VideoRepositery extends JpaRepository<Video, String>{

	
	Optional<Video> findByTitle(String title);
	
	
}
