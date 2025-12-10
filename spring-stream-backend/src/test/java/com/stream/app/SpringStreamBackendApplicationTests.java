package com.stream.app;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.stream.app.services.VideoService;

@SpringBootTest
class SpringStreamBackendApplicationTests {
	
	@Autowired
	VideoService vs;

	@Test
	void contextLoads() {
		vs.processVideo("1eb19b08-2735-4032-b94c-5e9941768ecb");
	}

}
